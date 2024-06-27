import { IAuthorization } from './auth.types';
import { INotice } from './notices.types';
import { IShift } from './shifts.types';
import { IUser } from './users.types';
import { IWeekday } from './weekdays.types';
import { IWorkhour } from './workhours.types';

export interface IErrorResponse {
  message: string;
  name: string;
  statusCode: number;
}

export type TOnlyResponseMessage = {
  message: string;
};

export type TResponse =
  | IUser
  | IUser[]
  | IShift
  | IShift[]
  | IAuthorization
  | IWeekday
  | IWeekday[]
  | IWorkhour
  | IWorkhour[]
  | INotice
  | INotice[]
  | TOnlyResponseMessage
  | IErrorResponse;
