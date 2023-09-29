import { Schema, model, models } from "mongoose"

import { DateSchema } from "./Date"
import { HourSchema } from "./Hour"
import { Summary } from "@/types/summary.types"
import { UserSchema } from "./User"

const ShiftSchema: Schema<Summary> = new Schema({
  user: {
    type: UserSchema,
  },
  day: {
    type: DateSchema,
  },
  hour: {
    type: HourSchema,
  },
})

export default models.Shift || model<Summary>("Shift", ShiftSchema)
