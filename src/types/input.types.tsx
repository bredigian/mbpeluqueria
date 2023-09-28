export enum InputType {
  Text = "text",
  Phone = "tel",
}

export interface InputProps {
  children: React.ReactNode
  id: string
  type: InputType
}
