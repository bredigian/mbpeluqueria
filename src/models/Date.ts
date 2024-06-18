import { Date } from '@/types/date.types';
import { Schema } from 'mongoose';

export const DateSchema: Schema<Date> = new Schema({
  day: {
    type: Number,
    required: true,
    trim: true,
  },
  month: {
    type: Number,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    trim: true,
  },
  dateString: {
    type: String,
    required: true,
    trim: true,
  },
  dayWeek: {
    type: Number,
    required: true,
    trim: true,
  },
});
