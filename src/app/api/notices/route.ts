import { NextResponse } from "next/server"
import Notice from "@/models/Notice"
import { connectDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  await connectDB()

  try {
    const notices = await Notice.find()
    return NextResponse.json(
      {
        notices: notices.length > 0 ? notices : null,
        isNotices: notices.length > 0 ?? false,
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    )
  }
}
