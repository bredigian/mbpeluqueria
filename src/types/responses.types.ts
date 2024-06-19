import { IAuthorization } from './auth.types';
import { IShift } from './shifts.types';
import { IUser } from './users.types';
import { IWeekday } from './weekdays.types';

export interface IErrorResponse {
  message: string;
  name: string;
  statusCode: number;
}

export type TResponse =
  | IUser
  | IUser[]
  | IShift
  | IShift[]
  | IAuthorization
  | IWeekday
  | IWeekday[]
  | IErrorResponse;
