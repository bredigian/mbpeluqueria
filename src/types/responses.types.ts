import { IAuthorization } from './auth.types';
import { IShift } from './shifts.types';
import { IUser } from './users.types';

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
  | IErrorResponse;
