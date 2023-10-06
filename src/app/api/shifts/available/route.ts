import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { connectDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  await connectDB()
  try {
    const url = new URL(req.url)
    const day = url.searchParams.get("data") as any

    const dayParsed = JSON.parse(day)

    const shiftExists = await Shift.findOne({
      "day.day": dayParsed.day.day,
      "day.month": dayParsed.day.month,
      "day.year": dayParsed.day.year,
      "hour.hour": dayParsed.hour.hour,
    })

    if (!shiftExists) {
      return NextResponse.json(
        {
          message: "Turno disponible",
          ok: true,
        },
        {
          status: 200,
          statusText: "OK",
        }
      )
    }
    return NextResponse.json(
      {
        message: "El turno ya no está disponible",
        ok: false,
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ocurrío un error al verificar el turno",
        ok: false,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    )
  }
}
