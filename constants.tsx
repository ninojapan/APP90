import { Category, FlightMode, SpeedCondition, PowerMode, LimitValue } from './types';

export const CATEGORIES = [
  { id: Category.ENGINES, icon: 'engine', label: 'Engines' },
  { id: Category.SPEED, icon: 'speed', label: 'Speed/VNE' },
  { id: Category.HYDRAULICS, icon: 'hyd', label: 'Hydraulics' },
  { id: Category.TRANSMISSION, icon: 'mgb', label: 'MGB / TGB' },
  { id: Category.WIND, icon: 'wind', label: 'Wind' },
  { id: Category.CHECKLIST, icon: 'list', label: 'Checklist' },
  { id: Category.NOTES, icon: 'notes', label: 'Notes' },
];

export const ENGINES_SUB = [
  { id: 'TQ', label: 'Torque (TQ)' },
  { id: 'NG', label: 'Gas Gen. (Ng)' },
  { id: 'IEBD', label: 'IEBD Temp' },
  { id: 'NF', label: 'Free Turbine (NF)' },
  { id: 'OIL_TEMP', label: 'Oil Temp' },
  { id: 'OIL_PRESS', label: 'Oil Press' },
  { id: 'STARTING', label: 'Starting Sequence' },
  { id: 'SHUTDOWN', label: 'Shutdown / Restart' },
  { id: 'APU', label: 'APU' },
  { id: 'MAX_PA', label: 'Max PA' },
];

export const HYDRAULICS_SUB = [
  { id: 'HYD_TEMP', label: 'Hydraulic Temp' },
  { id: 'HYD_PRESS', label: 'Hydraulic Press' },
];

export const MGB_SUB = [
  { id: 'NR', label: 'Rotor Speed (Nr)' },
  { id: 'MGB_OIL', label: 'MGB Oil / Bearings' },
  { id: 'RAGB', label: 'RAGB' },
  { id: 'TGB', label: 'TGB' },
  { id: 'IGB', label: 'IGB' },
];

export const SPEED_SUB = [
  { id: 'VNE_MASS', label: 'VNE / Mass / Power' },
  { id: 'DOORS_GEAR', label: 'Doors & Landing Gear' },
  { id: 'SPECIAL_OPS', label: 'Special Operations' },
  { id: 'FAILURES', label: 'System Failures' },
  { id: 'GROUNDSPEED', label: 'Groundspeed Limitation' },
];

export const WIND_SUB = [
  { id: 'WIND_START', label: 'Starting' },
  { id: 'WIND_STOP', label: 'Stopping' },
  { id: 'WIND_FOLD', label: 'Fold / Unfold' },
  { id: 'WIND_ROPE', label: 'Fast Rope' },
];

export const CHECKLIST_SUB = [
  { id: 'CH_ENGINE_RINSE', label: 'Engine Rinse' },
];

export const NOTES_SUB = [
  { id: 'NOTES_STARTING', label: 'Starting Notes (Oil)' },
  { id: 'NOTES_SHUTDOWN', label: 'Shutdown / Restart' },
  { id: 'NOTES_TQ', label: 'Torque Notes' },
  { id: 'NOTES_APU', label: 'APU Notes' },
  { id: 'NOTES_HYD', label: 'Hydraulics Notes' },
];

// ENGINE RINSE DATA
export const ENGINE_RINSE_PROCEDURE = [
  "Connect the rinsing solution supply system.",
  "Sif switch is set to stop and the fuel shut-off valve is set to close.",
  "If the engine rinsing procedure occurs after 5 minutes and within 4 hours following the engine normal shutdown, perform an engine ventilation as follows:\n• Press Crank pushbutton and hold till 18% – 22% Ng, without Ng stabilization.\n• Release Crank pushbutton when Ng reaches 18% – 22% to stop rollover.\n• Wait until Ng reaches 0%.",
  "Press and hold the Crank pushbutton without exceeding the starter operating limits.",
  "Once Ng exceeds 18% (8046 RPM), turn on the rinsing solution supply system and permit the rinsing solution to flow through the engine until at least 3.2 gallons (12 liters) of rinse solution have been ingested into engine. Regulate pressure to avoid speed drop. Do not permit Ng to drop below 18% (8046 RPM).",
  "Turn supply system off and disengage engine starter.",
  "Disconnect the rinse solution supply system.",
  "Allow the residual water to drain from the wash manifold. Replace the cap on the aircraft or engine compressor cleaning fitting and prepare for an engine-run.",
  "Remove all the tools, the materials and the equipment from your work area.",
  "Engage the starter and do a normal engine start.",
  "Run the engine at ground idle for at least 2 minutes to dry the engine and to dry out the ducting.",
  "Shut the engine down"
];

export const ENGINE_RINSE_NOTES = [
  "Make sure that the engine anti-ice remains in the off position during the engine cleaning and rinse procedures.",
  "An emergency shutdown occurs when the engine is shut-down from high power rating without proper cooling. Do not clean or rinse the engine in the 5 minutes – 4 hours timeframe following an emergency shutdown. Postpone after 4 hours.",
  "Do not allow the solution to soak in the engine for more than 30 minutes.",
  "Wash and rinse at 125°C (257°F) is permitted. However, water can evaporate making it less effective.",
  "Multiple application of crank runs are permitted without exceeding the starter operating limits.",
  "Time-to-lightoff will probably be several seconds longer than with a fully dried engine.",
  "For multi-engine installations, all engines can be rinsed and recapped before starting and all engines can be dried out simultaneously"
];

export const ENGINE_RINSE_CAUTIONS = [
  "While compressor ingests water, do not allow Ng speed to drop below 18% (8046 rpm). Damage to compressor blades can occur.",
  "Do not exceed starter operating limits.",
  "Close appropriate air bleed ducts to cockpit/cabin to prevent entrance of solution or gases.",
  "Make sure compressor is rinsed and dried for the periods specified so that solution is not trapped.",
  "Do not let the temperature of solution decrease below +4°C in the supply system.",
  "Do not clean or rinse the engine if the air temperature is below -15°C.",
  "Let the T4.5 temperature decrease to 125°C or less before supplying cleaning/rinsing solution."
];

// LIMIT DATA
export const WIND_START_DATA: LimitValue[] = [
  { label: 'Normal Start (All Dir)', value: 30, unit: 'kt', color: 'text-emerald-400' },
  { label: 'Quick Start (Headwind ±30°)', value: 60, unit: 'kt', color: 'text-emerald-400' },
  { label: 'Quick Start (Other Cond)', value: 48.5, unit: 'kt', color: 'text-amber-400' },
];

export const WIND_STOP_DATA: LimitValue[] = [
  { label: 'Headwind (±30°)', value: 60, unit: 'kt', color: 'text-emerald-400' },
  { label: 'All Directions', value: 48.5, unit: 'kt', color: 'text-amber-400' },
];

export const WIND_FOLD_DATA: LimitValue[] = [
  { label: 'Head', value: 60, unit: 'kt', color: 'text-emerald-400' },
  { label: 'Cross', value: 35, unit: 'kt', color: 'text-amber-400' },
  { label: 'Tail', value: 30, unit: 'kt', color: 'text-amber-500' },
];

export const WIND_ROPE_DATA: LimitValue[] = [
  { label: 'Head', value: 45, unit: 'kt', color: 'text-emerald-400' },
  { label: 'Tail ±45°', value: 35, unit: 'kt', color: 'text-amber-400' },
];

export const GROUNDSPEED_DATA: LimitValue[] = [
  { label: 'Run Takeoff / Landing', value: 50, unit: 'kt', color: 'text-emerald-400', note: 'Max GS' },
  { label: 'Max Braking Speed', value: 35, unit: 'kt', color: 'text-amber-500' },
  { label: 'Max Taxi in Steering', value: 10, unit: 'kt', color: 'text-cyan-400' },
];

export const VNE_MASS_DATA: LimitValue[] = [
  { label: 'Mass < 10.000 kg', value: 175, unit: 'kt', color: 'text-red-500' },
  { label: '10.000 kg < Mass < 10.600 kg', value: 165, unit: 'kt', color: 'text-red-500' },
  { label: '10.600 kg < Mass < 11.000 kg', value: 160, unit: 'kt', color: 'text-red-500' },
  { label: 'Vne Power Off', value: 'Vne - 40', unit: 'kt', color: 'text-amber-500' },
  { label: 'Vne OEI', value: 'Vne - 40', unit: 'kt', color: 'text-amber-500' },
];

export const DOORS_GEAR_DATA: LimitValue[] = [
  { label: 'Sliding Door Open', value: 140, unit: 'kt', color: 'text-emerald-400' },
  { label: 'Sliding Door Operation', value: 80, unit: 'kt', color: 'text-cyan-400' },
  { label: 'LG Extended (Vle)', value: 145, unit: 'kt', color: 'text-emerald-400' },
  { label: 'LG Operation (Vlo)', value: 145, unit: 'kt', color: 'text-cyan-400' },
  { label: 'Windshield Operation', value: 120, unit: 'kt', color: 'text-cyan-400' },
  { label: 'PMG Ext. / Retr.', value: 80, unit: 'kt', color: 'text-cyan-400' },
];

export const SPECIAL_OPS_DATA: LimitValue[] = [
  { label: 'HSC with Load', value: 150, unit: 'kt', color: 'text-emerald-400' },
  { label: 'MK2 / MU90 Installed', value: 150, unit: 'kt', color: 'text-amber-400' },
  { label: 'EFS Armed', value: 145, unit: 'kt', color: 'text-amber-400' },
  { label: 'Fast Rope Beam Ext/Retr', value: 140, unit: 'kt', color: 'text-cyan-400' },
  { label: 'EFS Inflation (Level)', value: 120, unit: 'kt', color: 'text-amber-500' },
  { label: 'Cargo Hook (< 2 tons)', value: 110, unit: 'kt', color: 'text-emerald-400' },
  { label: 'Cargo Hook (> 2 tons)', value: 90, unit: 'kt', color: 'text-amber-500' },
  { label: 'EFS Inflated (Pwr On)', value: 100, unit: 'kt', color: 'text-red-500' },
  { label: 'Hoist Boom (No Load)', value: 100, unit: 'kt', color: 'text-cyan-400' },
  { label: 'Boom Fully Ext (Cable Up)', value: 100, unit: 'kt', color: 'text-cyan-400' },
  { label: 'Wet End In Trail', value: 65, unit: 'kt', color: 'text-cyan-400' },
  { label: 'Hoist Boom (With Load)', value: 60, unit: 'kt', color: 'text-cyan-500' },
  { label: 'Hoist Operation', value: 60, unit: 'kt', color: 'text-cyan-500' },
  { label: 'To Seat Wet End', value: 60, unit: 'kt', color: 'text-cyan-600' },
  { label: 'EFS Inflated (Pwr Off)', value: 'Vy', unit: '', color: 'text-red-500', note: 'Best rate of climb' },
];

export const FAILURES_DATA: LimitValue[] = [
  { label: '2 IRS Fail (App. Speed)', value: 100, unit: 'kt', color: 'text-red-400' },
  { label: 'IMC 2 ADC Fail', value: '60 - 120', unit: 'kt', color: 'text-red-500' },
  { label: 'IMC 1 ADC Fail', value: 'min 60', unit: 'kt', color: 'text-red-600' },
];

export const TORQUE_DATA: Record<FlightMode, Record<string, LimitValue[]>> = {
  [FlightMode.AEO]: {
    [SpeedCondition.HIGH]: [
      { label: 'Max Cont. Vi>80', value: 91, unit: '%', color: 'text-emerald-400' },
      { label: 'Max Trans. Vi>80', value: 104, unit: '%', duration: '20 sec', color: 'text-amber-400' }
    ],
    [SpeedCondition.LOW]: [
      { label: 'Max Cont. Vi<40', value: 104, unit: '%', color: 'text-emerald-400' },
      { label: 'Max Trans. Vi<40', value: 113, unit: '%', duration: '20 sec', color: 'text-amber-400' }
    ]
  },
  [FlightMode.OEI_TRAINING]: {
    'default': [
      { label: 'Max Cont.', value: 93, unit: '%', color: 'text-emerald-400' },
      { label: 'Max (2 Min)', value: 107, unit: '%', duration: '2 min', color: 'text-amber-400' },
      { label: 'Max emergency', value: 130, unit: '%', duration: '30 sec', color: 'text-red-500' }
    ]
  },
  [FlightMode.OEI_REAL]: {
    'default': [
      { label: 'Max Cont.', value: 113, unit: '%', color: 'text-emerald-400' },
      { label: 'Max (2 Min)', value: 130, unit: '%', duration: '2 min', color: 'text-amber-400' },
      { label: 'Max emergency', value: 158, unit: '%', duration: '30 sec', color: 'text-red-500' }
    ]
  }
};

export const NG_DATA: Record<FlightMode, LimitValue[]> = {
  [FlightMode.AEO]: [
    { label: 'Transient', value: '99 - 103', unit: '%', duration: '30 min', color: 'text-amber-400' },
    { label: 'TOP max', value: 103, unit: '%', duration: '30 min', color: 'text-red-500' },
    { label: 'Transient', value: 105, unit: '%', duration: '30 sec', color: 'text-red-600' }
  ],
  [FlightMode.OEI_TRAINING]: [
    { label: 'OEI 1 h', value: 'Limited', color: 'text-emerald-400' },
    { label: 'OEI 2 min', value: 'Limited', color: 'text-amber-400' },
    { label: 'OEI 30 s', value: 103, unit: '%', color: 'text-red-500' },
    { label: 'Ng overspeed protection', value: 108.5, unit: '%', color: 'text-red-600' }
  ],
  [FlightMode.OEI_REAL]: [
    { label: 'OEI 1 h', value: 'Limited', color: 'text-emerald-400' },
    { label: 'OEI 2 min', value: 'Limited', color: 'text-amber-400' },
    { label: 'OEI 30 s', value: 105, unit: '%', color: 'text-red-500' },
    { label: 'Ng overspeed protection', value: 108.5, unit: '%', color: 'text-red-600' }
  ]
};

export const IEBD_DATA: Record<FlightMode, LimitValue[]> = {
  [FlightMode.AEO]: [
    { label: 'Amber Range (MCP to TOP)', value: '947 - 968', unit: '°C', color: 'text-amber-400' },
    { label: 'Red Continuous (TOP Max)', value: 968, unit: '°C', duration: '30 min', color: 'text-red-500' },
    { label: 'Red Triangle (Trans Max)', value: 978, unit: '°C', duration: '7 sec', color: 'text-red-600', note: 'Triangle' }
  ],
  [FlightMode.OEI_TRAINING]: [
    { label: 'No data', value: '---', color: 'text-slate-600' }
  ],
  [FlightMode.OEI_REAL]: [
    { label: 'Amber dashed line (1h)', value: 968, unit: '°C', color: 'text-amber-400' },
    { label: 'Red dashed line (2min)', value: 1004, unit: '°C', color: 'text-red-400' },
    { label: 'Red Continuous (30s)', value: 1067, unit: '°C', color: 'text-red-600' }
  ]
};

export const STARTING_DATA: LimitValue[] = [
  { label: 'Attempt 1: Aborted / Rest', value: 90, unit: 'sec', color: 'text-slate-400' },
  { label: 'Crank (max)', value: 20, unit: 'sec', color: 'text-emerald-400' },
  { label: 'Rest time', value: 30, unit: 'sec', color: 'text-slate-400' },
  { label: 'Attempt 2: Aborted / Rest', value: 180, unit: 'sec', color: 'text-slate-400' },
  { label: 'Crank (max)', value: 20, unit: 'sec', color: 'text-emerald-400' },
  { label: 'Rest time', value: 30, unit: 'sec', color: 'text-slate-400' },
  { label: 'Attempt 3: Aborted / Rest', value: 1, unit: 'hr', color: 'text-red-500' },
];

export const SHUTDOWN_DATA: LimitValue[] = [
  { label: 'Restart Possible (T45)', value: '≤ 300', unit: '°C', color: 'text-emerald-400', note: 'If NG ≤ 10%' },
  { label: 'Ground (Quick)', value: '≤ 5', unit: 'min', color: 'text-emerald-400' },
  { label: 'Ground (Cool)', value: '≥ 4', unit: 'h', color: 'text-slate-400' },
  { label: 'In Flight', value: 'No limit', color: 'text-emerald-400' },
];

export const NF_DATA: LimitValue[] = [
  { label: 'Single engine IDLE', value: '23.8 - 54', unit: '%', color: 'text-emerald-400', note: '50-53% slow idle' },
  { label: 'Start/Shut-down Trans.', value: '54 - 73', unit: '%', duration: '20 sec', color: 'text-amber-400' },
  { label: 'Dual engine IDLE', value: '73 - 77', unit: '%', color: 'text-emerald-400', note: 'Fast IDLE' },
  { label: 'Normal range', value: '73 - 105', unit: '%', color: 'text-emerald-400' },
  { label: 'Max Cont.', value: '105', unit: '%', color: 'text-amber-400' },
  { label: 'Transient (12s)', value: '105 - 116.8', unit: '%', duration: '12 sec', color: 'text-amber-400' },
  { label: 'Max', value: '116.8', unit: '%', color: 'text-red-500' },
  { label: 'Forbidden range', value: '54 - 72', unit: '%', duration: '20 sec', color: 'text-red-600', note: 'Avoid dwelling' },
];

export const OIL_TEMP_DATA: LimitValue[] = [
  { label: 'Engine start', value: '-40', unit: '°C', color: 'text-blue-400' },
  { label: 'Max Cont.', value: '132', unit: '°C', color: 'text-emerald-400' },
  { label: 'Max trans.', value: '149', unit: '°C', duration: '15 min', color: 'text-amber-400' },
];

export const OIL_PRESS_DATA: LimitValue[] = [
  { label: 'Min', value: '1.4', unit: 'Bar', color: 'text-red-500' },
  { label: 'Caution (No > Idle)', value: '1.4 - 2.1', unit: 'Bar', color: 'text-amber-400' },
  { label: 'Normal range', value: '2.1 - 6.9', unit: 'Bar', color: 'text-emerald-400' },
  { label: 'Caution (Cold)', value: '6.9 - 8.3', unit: 'Bar', color: 'text-amber-400' },
  { label: 'Cold Start (5m)', value: '8.3 - 13.8', unit: 'Bar', duration: '5 min', color: 'text-red-500' },
];

export const APU_DATA: LimitValue[] = [
  { label: 'Maximum', value: '140', unit: '°C', color: 'text-emerald-400' },
  { label: 'Limit (30m)', value: '150', unit: '°C', duration: '30 min', color: 'text-amber-400' },
];

export const MAX_PA_DATA: LimitValue[] = [
  { label: 'Max PA', value: '13120', unit: 'ft', color: 'text-white' },
];

export const HYD_TEMP_DATA: LimitValue[] = [
  { label: 'Normal range', value: 'NA - 120', unit: '°C', color: 'text-emerald-400' },
  { label: 'Max', value: '135', unit: '°C', color: 'text-red-500' },
  { label: 'Min for Start', value: '-30', unit: '°C', color: 'text-blue-400' },
  { label: 'Min for TO', value: '10', unit: '°C', color: 'text-amber-400' },
];

export const HYD_PRESS_DATA: LimitValue[] = [
  { label: 'Min', value: '162', unit: 'Bar', color: 'text-red-500' },
  { label: 'Normal range', value: '180 – 225', unit: 'Bar', color: 'text-emerald-400' },
  { label: 'Max', value: '235', unit: 'Bar', color: 'text-red-600' },
  { label: 'Min for TO', value: '207', unit: 'Bar', color: 'text-amber-400' },
];

export const NR_DATA: Record<PowerMode, LimitValue[]> = {
  [PowerMode.ON]: [
    { label: 'Steady state idle (1 Eng)', value: '50 - 53', unit: '%', color: 'text-emerald-400' },
    { label: 'Steady state idle (2 Eng)', value: '73 - 77', unit: '%', color: 'text-emerald-400' },
    { label: 'Min transient', value: 83, unit: '%', duration: '20 sec', color: 'text-amber-400' },
    { label: 'Min stabilised', value: 95, unit: '%', color: 'text-emerald-400' },
    { label: 'Max w/o NR↑', value: 100.7, unit: '%', color: 'text-emerald-400' },
  ],
  [PowerMode.OFF]: [
    { label: 'Min Transient (20s)', value: 83, unit: '%', color: 'text-red-400' },
    { label: 'Min Stabilised', value: 88, unit: '%', color: 'text-amber-400' },
    { label: 'Max Stabilised', value: 110, unit: '%', color: 'text-emerald-400' },
    { label: 'Max Transient (20s)', value: 115, unit: '%', color: 'text-red-500' },
  ]
};

export const NR_GENERAL_DATA: LimitValue[] = [
  { label: 'Tail Drive Avoid', value: '53 - 63', unit: '%', color: 'text-red-600' },
  { label: 'Audio Warning', value: '<95 or >110', unit: '%', color: 'text-red-500' },
];

export const MGB_OIL_DATA: LimitValue[] = [
  { label: 'Oil Temp Normal', value: '-10 – 116', unit: '°C', color: 'text-emerald-400' },
  { label: 'Oil Temp Max', value: '116', unit: '°C', color: 'text-red-500' },
  { label: 'MGB Bearings Max', value: '150', unit: '°C', color: 'text-red-600' },
  { label: 'Oil Press Normal', value: '4.5 - 7.5', unit: 'Bar', color: 'text-emerald-400' },
  { label: 'Oil Press Min', value: '2.4', unit: 'Bar', color: 'text-red-500' },
];

export const RAGB_DATA: LimitValue[] = [
  { label: 'Temp Normal', value: '-15 – 120', unit: '°C', color: 'text-emerald-400' },
  { label: 'Temp Maximum', value: '120', unit: '°C', color: 'text-red-500' },
  { label: 'Press Normal', value: 'N/A – 8', unit: 'Bar', color: 'text-emerald-400' },
  { label: 'Press Minimum', value: '0.9', unit: 'Bar', color: 'text-red-500' },
];

export const TGB_DATA: LimitValue[] = [
  { label: 'Temp Normal', value: '-15 – 120', unit: '°C', color: 'text-emerald-400' },
  { label: 'Temp Maximum', value: '120', unit: '°C', color: 'text-red-500' },
];

export const IGB_DATA: LimitValue[] = [
  { label: 'Temp Normal', value: '-15 – 120', unit: '°C', color: 'text-emerald-400' },
  { label: 'Temp Maximum', value: '120', unit: '°C', color: 'text-red-500' },
];

export const WARNING_NOTES_TQ = [
  "Use of 2 x 104% torque rating for more than 30 minutes per flight requires an entry in the H/C logbook.",
  "30 s power rating may be entered up to 3 times on one flight."
];

export const WARNING_NOTES_APU = [
  "A 30 s cool down period must be observed between any two consecutive start attempts.",
  "A 20 min cool down must be observed following any 3 consecutive start attempts.",
  "After shutdown wait 2 min and cycle APU sw."
];

export const WARNING_NOTES_HYD = [
  "If HYD 2 temp >102°C RECV SNR"
];

export const WARNING_NOTES_STARTING_OIL = [
  "Oil pressure may exceed 13,8 bar during the engine start, in cold weather. Max time above 13,8 bar is 2,5 min. Wait for oil to drop below 6,9 bar before applying power."
];

export const WARNING_NOTES_SHUTDOWN = [
  "After emergency shutdown, restart is possible if reason is known and T45 ≤ 300°C with NG ≤ 10%. Cooling: Ground within 5m or after 4h."
];