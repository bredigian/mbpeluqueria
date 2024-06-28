import { IShift } from './shifts.types';
import { IUser } from './users.types';

export interface INotification {
  id?: string;
  timestamp?: Date;
  shift_id: string;
  shift: IShift;
  description: string;
  userId: string;
  User?: IUser;
  readed: boolean;
}
