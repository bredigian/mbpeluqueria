import { Schema, model, models } from "mongoose"

import { WorkHour } from "@/types/hour.types"

export const WorkHourSchema = new Schema<WorkHour>({
  value: {
    type: String,
    required: true,
  },
  __v: {
    type: Number,
    select: false,
  },
})

export default models.WorkHour ||
  model<WorkHour>("WorkHour", WorkHourSchema, "work-hours")
