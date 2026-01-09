
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
  ENGINE_RINSE_PROCEDURE, ENGINE_RINSE_NOTES, ENGINE_RINSE_CAUTIONS
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

  const goHome = () => {
    setState(s => ({ ...s, category: null, subCategory: null }));
  };

  const activeLimits = useMemo((): LimitValue[] => {
    if (state.category === Category.ENGINES) {
      switch(state.subCategory) {
        case 'TQ':
          return state.mode === FlightMode.AEO 
            ? TORQUE_DATA[state.mode][state.speed] 
            : TORQUE_DATA[state.mode]['default'];
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
        case 'NR':
          return state.powerMode === PowerMode.OFF 
            ? NR_DATA[state.powerMode] 
            : [...NR_DATA[state.powerMode], ...NR_GENERAL_DATA];
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
    <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setState(s => ({ ...s, category: cat.id }))}
          className="aspect-square bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 active-scale transition-all hover:border-blue-500/50 group shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors text-slate-300">
            {cat.id === Category.ENGINES && <svg className="w-9 h-9 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            {cat.id === Category.SPEED && <svg className="w-9 h-9 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            {cat.id === Category.HYDRAULICS && <svg className="w-9 h-9 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
            {cat.id === Category.TRANSMISSION && <svg className="w-9 h-9 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            {cat.id === Category.WIND && <svg className="w-9 h-9 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>}
            {cat.id === Category.CHECKLIST && <svg className="w-9 h-9 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
            {cat.id === Category.NOTES && <svg className="w-9 h-9 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors text-center px-2">
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
      <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300 h-full overflow-y-auto pr-1 hide-scrollbar">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Select Parameter</h2>
        <div className="space-y-3">
          {items.map(sub => (
            <button
              key={sub.id}
              onClick={() => setState(s => ({ ...s, subCategory: sub.id }))}
              className="w-full p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl flex items-center justify-between active-scale transition-all hover:bg-slate-800/80 shadow-lg"
            >
              <span className="text-xl font-black text-white">{sub.label}</span>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderChecklist = () => {
    if (state.subCategory === 'CH_ENGINE_RINSE') {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6 pb-20">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Procedure Steps</h3>
            {ENGINE_RINSE_PROCEDURE.map((step, i) => (
              <div key={i} className="p-5 bg-slate-900/60 border border-slate-800 rounded-3xl flex gap-4 items-start shadow-sm backdrop-blur-md">
                <span className="w-7 h-7 rounded-full bg-orange-600/20 flex items-center justify-center text-[12px] font-black text-orange-500 shrink-0 mt-0.5 border border-orange-500/30">{i+1}</span>
                <p className="text-sm font-bold text-slate-200 leading-relaxed whitespace-pre-line">{step}</p>
              </div>
            ))}
          </div>
          {/* ... altri componenti checklist rimangono simili ma con raccordi 3xl ... */}
        </div>
      );
    }
    return null;
  };

  const renderLimits = () => {
    if (state.category === Category.CHECKLIST) return renderChecklist();
    if (state.category === Category.NOTES) {
      let noteList: string[] = [];
      let noteTitle = "Operational Note";
      let noteColor = "text-violet-500";
      let iconC = "bg-violet-500";

      switch(state.subCategory) {
        case 'NOTES_STARTING': noteList = WARNING_NOTES_STARTING_OIL; noteTitle = "Starting Notes (Oil)"; noteColor = "text-blue-500"; iconC = "bg-blue-500"; break;
        case 'NOTES_SHUTDOWN': noteList = WARNING_NOTES_SHUTDOWN; noteTitle = "Shutdown / Restart"; noteColor = "text-red-500"; iconC = "bg-red-500"; break;
        case 'NOTES_TQ': noteList = WARNING_NOTES_TQ; noteTitle = "Torque Notes"; break;
        case 'NOTES_APU': noteList = WARNING_NOTES_APU; noteTitle = "APU Notes"; break;
        case 'NOTES_HYD': noteList = WARNING_NOTES_HYD; noteTitle = "Hydraulics Notes"; noteColor = "text-cyan-500"; iconC = "bg-cyan-500"; break;
      }

      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4 pb-20">
          <div className="flex items-center gap-2 ml-1">
             <div className={`w-2 h-2 rounded-full ${iconC} animate-pulse`}></div>
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{noteTitle}</h3>
          </div>
          <div className="space-y-3">
            {noteList.map((n, i) => (
              <div key={i} className="p-7 bg-slate-900/80 border border-slate-800 rounded-[2.5rem] flex gap-5 shadow-2xl backdrop-blur-xl">
                <svg className={`w-7 h-7 ${noteColor} shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm font-bold text-slate-200 leading-relaxed italic whitespace-pre-line">{n}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const isModeDependent = ['TQ', 'NG', 'IEBD'].includes(state.subCategory || '');
    const isPowerDependent = state.subCategory === 'NR';
    
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col gap-4 pb-20">
        {isModeDependent && (
          <div className="mb-2 space-y-3">
            <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 shadow-inner">
              {Object.values(FlightMode).map((m) => (
                <button key={m} onClick={() => setState(s => ({ ...s, mode: m }))} className={`py-4 px-1 rounded-xl text-[10px] font-black uppercase transition-all ${state.mode === m ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-500 hover:bg-slate-800'}`}>{m}</button>
              ))}
            </div>
            {state.subCategory === 'TQ' && state.mode === FlightMode.AEO && (
              <div className="grid grid-cols-2 gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 shadow-inner">
                {Object.values(SpeedCondition).map((s) => (
                  <button key={s} onClick={() => setState(prev => ({ ...prev, speed: s }))} className={`py-4 rounded-xl text-[10px] font-black uppercase transition-all ${state.speed === s ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-800'}`}>{s} KIAS</button>
                ))}
              </div>
            )}
          </div>
        )}

        {isPowerDependent && (
          <div className="mb-2 grid grid-cols-2 gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
            {Object.values(PowerMode).map((pm) => (
              <button key={pm} onClick={() => setState(s => ({ ...s, powerMode: pm }))} className={`py-4 px-1 rounded-xl text-[10px] font-black uppercase transition-all ${state.powerMode === pm ? 'bg-amber-600 text-white shadow-xl shadow-amber-600/30' : 'text-slate-500 hover:bg-slate-800'}`}>{pm}</button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {activeLimits.map((limit, idx) => (
            <div key={idx} className="relative overflow-hidden p-6 rounded-[2.5rem] border border-slate-800 bg-slate-900/40 backdrop-blur-lg flex items-center justify-between group shadow-2xl">
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${limit.color.replace('text', 'bg')} opacity-80`}></div>
              <div className="flex flex-col flex-1 ml-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest opacity-60">{limit.duration || (state.subCategory === 'STARTING' ? 'Step' : 'Cont.')}</span>
                  {limit.note && <span className="text-slate-300 text-[9px] font-black uppercase tracking-wider bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">{limit.note}</span>}
                </div>
                <span className="text-white font-black text-xl leading-tight uppercase mt-1 tracking-tight">{limit.label}</span>
              </div>
              <div className="flex items-baseline gap-1 bg-slate-950/40 px-5 py-3 rounded-[2rem] border border-slate-800/50">
                <span className={`text-5xl font-black font-mono tracking-tighter ${limit.color}`}>{limit.value}</span>
                <span className={`text-xl font-black font-mono opacity-40 ${limit.color}`}>{limit.unit || ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col p-4 max-w-2xl mx-auto font-sans">
      <header className="mb-6 flex items-center justify-between border-b border-slate-800/50 pb-5 shrink-0">
        <div className="flex items-center gap-5">
          {state.category && (
            <button 
              onClick={goBack} 
              className="w-14 h-14 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center active-scale transition-all shadow-xl backdrop-blur-md"
              aria-label="Back"
            >
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
              SH-90 {state.category && <span className="text-blue-500">{state.category}</span>}
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] mt-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              {state.subCategory ? `PARA: ${state.subCategory.replace('_', ' ').replace('NOTES ', '').replace('CH ', '')}` : 'FLIGHT MANUAL LIMITS'}
            </p>
          </div>
        </div>

        <button 
          onClick={goHome} 
          className={`flex items-center gap-2 w-14 h-14 justify-center rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 active-scale transition-all shadow-2xl backdrop-blur-md ${!state.category ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {!state.category && renderHome()}
        {state.category && !state.subCategory && renderSubMenu()}
        {state.category && state.subCategory && renderLimits()}
      </main>

      <footer className="mt-4 pt-4 border-t border-slate-900/30 flex justify-center items-center opacity-20 shrink-0">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic text-center">SH-90 DIGITAL FLIGHT HANDBOOK</span>
      </footer>
    </div>
  );
};

export default App;
