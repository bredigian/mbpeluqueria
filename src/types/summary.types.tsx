import { Date } from "./date.types"
import { Hour } from "./hour.types"
import { User } from "./shift.types"

export interface SummaryItem {
  item: string
  value: string
}

export interface Summary {
  user: User
  day: Date
  hour: Hour
}
