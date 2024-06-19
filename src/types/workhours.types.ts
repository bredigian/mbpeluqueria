export interface IWorkhour {
  id: string;
  hours: number;
  minutes: number;
}

export interface IWorkhourByWeekday {
  id: string;
  workhour: IWorkhour;
}
