import { Schema, model, models } from "mongoose"

import { WorkHour } from "@/types/hour.types"

export const WorkHourSchema = new Schema<WorkHour>({
  value: {
    type: String,
    required: true,
  },
})

export default models.WorkHour ||
  model<WorkHour>("WorkHour", WorkHourSchema, "work-hours")
