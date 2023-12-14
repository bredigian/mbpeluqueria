import { Schema, model, models } from "mongoose"

import { Notice } from "@/types/notices.types"

const NoticeSchema = new Schema<Notice>({
  title: {
    type: String,
    required: true,
  },
})

export default models.Notice || model("Notice", NoticeSchema, "notices")
