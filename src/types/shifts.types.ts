import { IUser } from './users.types';

export interface IShift {
  id?: string;
  timestamp: Date;
  user: IUser;
}
