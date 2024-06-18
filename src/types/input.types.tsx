import { type FormValues } from './form.types';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { User } from './user.types';

export enum InputType {
  Text = 'text',
  Phone = 'number',
}

export interface ErrorMessageType {
  required: string;
  minLength: string;
  maxLength?: string;
}

export interface InputProps {
  register: UseFormRegister<User>;
  name: keyof FormValues;
  children: React.ReactNode;
  type: InputType;
  minLength: number;
  maxLength?: number;
  error: FieldError | undefined;
  errorMessage: ErrorMessageType;
  placeholder: string;
}
