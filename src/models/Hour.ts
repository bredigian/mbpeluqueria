import { Hour } from '@/types/hour.types';
import { Schema } from 'mongoose';

export const HourSchema: Schema<Hour> = new Schema({
  hour: {
    type: String,
    required: true,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});
