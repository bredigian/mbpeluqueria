export interface IWorkhour {
  id: string;
  hours: number;
  minutes: number;
}

export interface IWorkhourByWeekday {
  id: string;
  workhour: IWorkhour;
}

export interface IWorkhourByWeekdayToCreate {
  id?: string;
  weekday_id: string;
  workhour_id: string;
}
