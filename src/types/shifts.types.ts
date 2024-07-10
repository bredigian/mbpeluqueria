import { DateTime } from 'luxon';
import { IUser } from './users.types';

export interface IShiftToCreate {}

export interface IShift {
  id?: string;
  timestamp: Date | DateTime | string;
  user_id?: string;
  user?: IUser;
}
