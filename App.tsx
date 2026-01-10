import React, { useState, useMemo } from 'react';
import { Category, FlightMode, SpeedCondition, PowerMode, TorqueState, LimitValue } from './types.ts';
import { 
  TORQUE_DATA, NF_DATA, OIL_TEMP_DATA, OIL_PRESS_DATA, MAX_PA_DATA, APU_DATA,
  NG_DATA, IEBD_DATA, STARTING_DATA, SHUTDOWN_DATA,
  HYD_TEMP_DATA, HYD_PRESS_DATA,
  NR_DATA, NR_GENERAL_DATA,
  MGB_OIL_DATA, RAGB_DATA, TGB_DATA, IGB_DATA,
  VNE_MASS_DATA, DOORS_GEAR_DATA, SPECIAL_OPS_DATA, FAILURES_DATA, GROUNDSPEED_DATA,
  WIND_START_DATA, WIND_STOP_DATA, WIND_FOLD_DATA, WIND_ROPE_DATA,
  CATEGORIES, ENGINES_SUB, HYDRAULICS_SUB, MGB_SUB, SPEED_SUB, WIND_SUB, NOTES_SUB, CHECKLIST_SUB,
  WARNING_NOTES_TQ, WARNING_NOTES_APU, WARNING_NOTES_HYD,
  WARNING_NOTES_STARTING_OIL, WARNING_NOTES_SHUTDOWN,
  ENGINE_RINSE_PROCEDURE
} from './constants.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<TorqueState>({
    category: null,
    subCategory: null,
    mode: FlightMode.AEO,
    powerMode: PowerMode.ON,
    speed: SpeedCondition.HIGH
  });

  const goBack = () => {
    if (state.subCategory) setState(s => ({ ...s, subCategory: null }));
    else if (state.category) setState(s => ({ ...s, category: null }));
  };

  const goHome = () => setState(s => ({ ...s, category: null, subCategory: null }));

  const activeLimits = useMemo((): LimitValue[] => {
    if (state.category === Category.ENGINES) {
      switch(state.subCategory) {
        case 'TQ': return state.mode === FlightMode.AEO ? TORQUE_DATA[state.mode][state.speed] : TORQUE_DATA[state.mode]['default'];
        case 'NG': return NG_DATA[state.mode];
        case 'IEBD': return IEBD_DATA[state.mode];
        case 'NF': return NF_DATA;
        case 'OIL_TEMP': return OIL_TEMP_DATA;
        case 'OIL_PRESS': return OIL_PRESS_DATA;
        case 'MAX_PA': return MAX_PA_DATA;
        case 'APU': return APU_DATA;
        case 'STARTING': return STARTING_DATA;
        case 'SHUTDOWN': return SHUTDOWN_DATA;
        default: return [];
      }
    }
    if (state.category === Category.HYDRAULICS) {
      switch(state.subCategory) {
        case 'HYD_TEMP': return HYD_TEMP_DATA;
        case 'HYD_PRESS': return HYD_PRESS_DATA;
        default: return [];
      }
    }
    if (state.category === Category.TRANSMISSION) {
      switch(state.subCategory) {
        case 'NR': return state.powerMode === PowerMode.OFF ? NR_DATA[state.powerMode] : [...NR_DATA[state.powerMode], ...NR_GENERAL_DATA];
        case 'MGB_OIL': return MGB_OIL_DATA;
        case 'RAGB': return RAGB_DATA;
        case 'TGB': return TGB_DATA;
        case 'IGB': return IGB_DATA;
        default: return [];
      }
    }
    if (state.category === Category.SPEED) {
      switch(state.subCategory) {
        case 'VNE_MASS': return VNE_MASS_DATA;
        case 'DOORS_GEAR': return DOORS_GEAR_DATA;
        case 'SPECIAL_OPS': return SPECIAL_OPS_DATA;
        case 'FAILURES': return FAILURES_DATA;
        case 'GROUNDSPEED': return GROUNDSPEED_DATA;
        default: return [];
      }
    }
    if (state.category === Category.WIND) {
      switch(state.subCategory) {
        case 'WIND_START': return WIND_START_DATA;
        case 'WIND_STOP': return WIND_STOP_DATA;
        case 'WIND_FOLD': return WIND_FOLD_DATA;
        case 'WIND_ROPE': return WIND_ROPE_DATA;
        default: return [];
      }
    }
    return [];
  }, [state]);

  const renderHome = () => (
    <div className="grid grid-cols-2 gap-4 pb-10 animate-in fade-in zoom-in-95 duration-500">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setState(s => ({ ...s, category: cat.id }))}
          className="aspect-square bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 active-scale transition-all hover:bg-blue-600/10 hover:border-blue-500/50 group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="w-16 h-16 rounded-3xl bg-slate-800/80 flex items-center justify-center group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
            {cat.id === Category.ENGINES && <svg className="w-8 h-8 text-blue-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            {cat.id === Category.SPEED && <svg className="w-8 h-8 text-emerald-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            {cat.id === Category.HYDRAULICS && <svg className="w-8 h-8 text-cyan-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547" /></svg>}
            {cat.id === Category.TRANSMISSION && <svg className="w-8 h-8 text-amber-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065z" /></svg>}
            {cat.id === Category.WIND && <svg className="w-8 h-8 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2" /></svg>}
            {cat.id === Category.CHECKLIST && <svg className="w-8 h-8 text-orange-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></svg>}
            {cat.id === Category.NOTES && <svg className="w-8 h-8 text-violet-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          </div>
          <span className="text-sm font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-white transition-colors text-center px-4 leading-tight">
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );

  const renderSubMenu = () => {
    let items = [];
    if (state.category === Category.ENGINES) items = ENGINES_SUB;
    else if (state.category === Category.HYDRAULICS) items = HYDRAULICS_SUB;
    else if (state.category === Category.TRANSMISSION) items = MGB_SUB;
    else if (state.category === Category.SPEED) items = SPEED_SUB;
    else if (state.category === Category.WIND) items = WIND_SUB;
    else if (state.category === Category.CHECKLIST) items = CHECKLIST_SUB;
    else if (state.category === Category.NOTES) items = NOTES_SUB;

    return (
      <div className="space-y-3 animate-in fade-in slide-in-from-right-8 duration-500 h-full overflow-y-auto pr-1 hide-scrollbar">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 ml-1">System Parameters</h2>
        <div className="grid gap-3">
          {items.map(sub => (
            <button
              key={sub.id}
              onClick={() => setState(s => ({ ...s, subCategory: sub.id }))}
              className="w-full p-6 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl flex items-center justify-between active-scale transition-all hover:bg-slate-800 shadow-xl"
            >
              <span className="text-lg font-black text-white tracking-tight">{sub.label}</span>
              <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 shadow-inner">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderLimits = () => {
    if (state.category === Category.CHECKLIST && state.subCategory === 'CH_ENGINE_RINSE') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6 pb-20">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 ml-1">Rinsing Procedure</h3>
            {ENGINE_RINSE_PROCEDURE.map((step, i) => (
              <div key={i} className="p-6 bg-slate-900/60 border border-white/5 rounded-[2.5rem] flex gap-5 items-start shadow-2xl backdrop-blur-xl">
                <span className="w-8 h-8 rounded-2xl bg-orange-600/10 flex items-center justify-center text-[13px] font-black text-orange-500 shrink-0 mt-0.5 border border-orange-500/20 shadow-inner">{i+1}</span>
                <p className="text-[15px] font-bold text-slate-200 leading-relaxed whitespace-pre-line tracking-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (state.category === Category.NOTES) {
      let noteList: string[] = [];
      let noteTitle = "Operational Notes";
      let iconColor = "text-violet-500";
      switch(state.subCategory) {
        case 'NOTES_STARTING': noteList = WARNING_NOTES_STARTING_OIL; noteTitle = "Engine Oil Notes"; iconColor = "text-blue-500"; break;
        case 'NOTES_SHUTDOWN': noteList = WARNING_NOTES_SHUTDOWN; noteTitle = "Restart Notes"; iconColor = "text-red-500"; break;
        case 'NOTES_TQ': noteList = WARNING_NOTES_TQ; noteTitle = "TQ Usage Notes"; break;
        case 'NOTES_APU': noteList = WARNING_NOTES_APU; noteTitle = "APU Cycle Notes"; break;
        case 'NOTES_HYD': noteList = WARNING_NOTES_HYD; noteTitle = "Hydraulic Warnings"; iconColor = "text-cyan-500"; break;
      }
      return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-4 pb-20">
          <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${iconColor.replace('text', 'bg').replace('500', '500/10')} ${iconColor} px-4 py-2 rounded-full inline-block border border-current/20`}>{noteTitle}</h3>
          {noteList.map((n, i) => (
            <div key={i} className="p-8 bg-slate-900/80 border border-white/5 rounded-[3rem] flex gap-6 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
               <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${iconColor.replace('text', 'bg')}`}></div>
               <svg className={`w-8 h-8 ${iconColor} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
               <p className="text-[16px] font-bold text-slate-100 leading-relaxed italic">{n}</p>
            </div>
          ))}
        </div>
      );
    }

    const isModeDependent = ['TQ', 'NG', 'IEBD'].includes(state.subCategory || '');
    const isPowerDependent = state.subCategory === 'NR';
    
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 flex flex-col gap-4 pb-24">
        {isModeDependent && (
          <div className="space-y-3 mb-4">
            <div className="flex bg-slate-900/80 p-1.5 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-md">
              {Object.values(FlightMode).map((m) => (
                <button key={m} onClick={() => setState(s => ({ ...s, mode: m }))} className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase transition-all duration-300 ${state.mode === m ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}>{m}</button>
              ))}
            </div>
            {state.subCategory === 'TQ' && state.mode === FlightMode.AEO && (
              <div className="flex bg-slate-900/80 p-1.5 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-md">
                {Object.values(SpeedCondition).map((s) => (
                  <button key={s} onClick={() => setState(prev => ({ ...prev, speed: s }))} className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase transition-all duration-300 ${state.speed === s ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{s} KIAS</button>
                ))}
              </div>
            )}
          </div>
        )}

        {isPowerDependent && (
          <div className="flex bg-slate-900/80 p-1.5 rounded-[2rem] border border-white/5 shadow-2xl mb-4">
            {Object.values(PowerMode).map((pm) => (
              <button key={pm} onClick={() => setState(s => ({ ...s, powerMode: pm }))} className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase transition-all duration-300 ${state.powerMode === pm ? 'bg-amber-600 text-white shadow-[0_10px_20px_rgba(217,119,6,0.4)]' : 'text-slate-500'}`}>{pm}</button>
            ))}
          </div>
        )}

        <div className="grid gap-3">
          {activeLimits.map((limit, idx) => (
            <div key={idx} className="relative overflow-hidden p-5 rounded-[2.5rem] border border-white/5 bg-slate-900/30 backdrop-blur-2xl flex items-center justify-between group shadow-2xl">
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${limit.color.replace('text', 'bg')} opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}></div>
              <div className="flex flex-col flex-1 pl-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{limit.duration || 'LIMIT'}</span>
                  {limit.note && <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/10 text-slate-300">{limit.note}</span>}
                </div>
                <span className="text-white font-bold text-sm leading-tight mt-2 tracking-tight uppercase">{limit.label}</span>
              </div>
              <div className="flex items-baseline gap-1 bg-black/40 px-4 py-3 rounded-[2rem] border border-white/5 shadow-inner">
                <span className={`text-2xl font-black font-mono tracking-tight ${limit.color}`}>{limit.value}</span>
                <span className={`text-sm font-bold font-mono opacity-50 ${limit.color}`}>{limit.unit || ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col p-6 max-w-2xl mx-auto font-sans selection:bg-blue-500/30">
      <header className="mb-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          {state.category && (
            <button onClick={goBack} className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center active-scale transition-all shadow-2xl backdrop-blur-md">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none flex items-center gap-2">
              SH-90 <span className="text-blue-500 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            </h1>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-2">
              {state.category ? `${state.category} / ${state.subCategory || 'Select'}` : 'Flight Manual Reference'}
            </p>
          </div>
        </div>
        <button onClick={goHome} className={`w-14 h-14 rounded-2xl border border-white/5 bg-slate-900 flex items-center justify-center active-scale transition-all shadow-2xl ${!state.category ? 'opacity-0' : 'opacity-100'}`}>
          <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {!state.category && renderHome()}
        {state.category && !state.subCategory && renderSubMenu()}
        {state.category && state.subCategory && renderLimits()}
      </main>

      <footer className="mt-4 py-6 border-t border-white/5 flex flex-col items-center gap-1 opacity-40 shrink-0">
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] italic">Digital Flight Handbook</span>
        <span className="text-[7px] font-bold text-slate-600 uppercase">Version 2.0.1 - Restricted Access</span>
      </footer>
    </div>
  );
};

export default App;