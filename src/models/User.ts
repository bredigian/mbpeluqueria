import { Schema, model, models } from 'mongoose';

import { User } from '@/types/user.types';

export const UserSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
});

export default models.User || model<User>('User', UserSchema, 'clients');
