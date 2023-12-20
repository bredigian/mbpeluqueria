import { NextResponse } from "next/server"
import Notice from "@/models/Notice"
import User from "@/models/User"
import { connectDB } from "@/utils/mongoose"

export const POST = async (req: Request) => {
  try {
    const id = await req.json()
    if (!id) throw new Error("El ID es requerido")

    await connectDB()

    try {
      const user = await User.findById(id)
      if (!user) throw new Error("El usuario no existe")

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
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}
