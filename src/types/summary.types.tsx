import { Date } from './date.types';
import { Hour } from './hour.types';
import { User } from './user.types';

export interface SummaryItem {
  item: string;
  value: string;
}

export interface Summary {
  _id: string;
  user: User;
  day: Date;
  hour: Hour;
}
