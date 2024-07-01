import { IShift } from './shifts.types';
import { IWorkhourByWeekday } from './workhours.types';

export interface IWeekday {
  id?: string;
  name: string;
  number: number;
  WorkhoursByWeekday: IWorkhourByWeekday[];
  assignedWorkhours?: IShift[];
}
