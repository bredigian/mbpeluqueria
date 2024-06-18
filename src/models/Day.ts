import { Schema, model, models } from 'mongoose';

import { Day } from '@/types/days.types';
import { WorkHourSchema } from './WorkHour';

const DaySchema = new Schema<Day>({
  value: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  weekday: {
    type: Number,
    required: true,
  },
  hours: {
    type: [WorkHourSchema],
    required: true,
  },
});

export default models.Day || model<Day>('Day', DaySchema, 'days');
