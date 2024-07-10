import { IShift } from './shifts.types';
import { IUser } from './users.types';

export interface INotification {
  id?: string;
  timestamp?: Date | string;
  shift_id: string;
  shift: IShift;
  shiftTimestamp: Date | string;
  description: string;
  userId: string;
  User?: IUser;
  readed: boolean;
}
