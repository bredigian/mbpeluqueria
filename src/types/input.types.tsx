import { type FormValues } from "./form.types"
import { FieldError, UseFormRegister } from "react-hook-form"

export enum InputType {
  Text = "text",
  Phone = "number",
}

export interface ErrorMessageType {
  required: string
  minLength: string
}

export interface InputProps {
  register: UseFormRegister<FormValues>
  name: keyof FormValues
  children: React.ReactNode
  type: InputType
  minLength: number
  error: FieldError | undefined
  errorMessage: ErrorMessageType
}
