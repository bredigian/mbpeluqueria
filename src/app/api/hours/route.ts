import { NextResponse } from "next/server"
import WorkHour from "@/models/WorkHour"
import { connectDB } from "@/utils/mongoose"

export const GET = async () => {
  await connectDB()

  try {
    const workHours = await WorkHour.find()
    return NextResponse.json(
      {
        workHours,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ocurrió un error al obtener los horarios",
        ok: false,
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}
