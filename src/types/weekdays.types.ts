import { IWorkhourByWeekday } from './workhours.types';

export interface IWeekday {
  id?: string;
  name: string;
  number: number;
  WorkhoursByWeekday: IWorkhourByWeekday[];
}
