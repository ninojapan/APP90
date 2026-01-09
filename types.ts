
export enum Category {
  ENGINES = 'Engines',
  HYDRAULICS = 'Hydraulics',
  SPEED = 'Speed',
  TRANSMISSION = 'MGB/TGB',
  WIND = 'Wind',
  CHECKLIST = 'Checklist',
  NOTES = 'Notes'
}

export enum FlightMode {
  AEO = 'AEO',
  OEI_TRAINING = 'OEI Training',
  OEI_REAL = 'OEI Real'
}

export enum PowerMode {
  ON = 'Power ON',
  OFF = 'Power OFF'
}

export enum SpeedCondition {
  LOW = 'Vi < 40',
  HIGH = 'Vi > 80'
}

export interface LimitValue {
  label: string;
  value: string | number;
  unit?: string;
  duration?: string;
  color: string;
  note?: string;
}

export interface TorqueState {
  category: Category | null;
  subCategory: string | null;
  mode: FlightMode;
  powerMode: PowerMode;
  speed: SpeedCondition;
}
