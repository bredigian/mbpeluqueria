import { WorkHour } from './hour.types';

export interface Day {
  _id: string;
  value: string;
  path: string;
  weekday: number;
  hours: WorkHour[];
}
