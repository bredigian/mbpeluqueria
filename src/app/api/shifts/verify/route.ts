import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { connectDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  await connectDB()

  const url = new URL(req.url)
  const _id = url.searchParams.get("_id")

  try {
    const shiftAssigned = await Shift.findById(_id)

    const { day, hour } = shiftAssigned
    const hourTime = parseInt(hour.hour.split(":")[0])
    const minutesTime = parseInt(hour.hour.split(":")[1])

    const isPast =
      Date.now() >
      new Date(day?.year, day?.month, day?.day, hourTime, minutesTime).getTime()

    if (!isPast) {
      return NextResponse.json(
        {
          message: "Turno asignado verificado correctamente",
          ok: true,
          shiftAssigned,
        },
        {
          status: 200,
          statusText: "Verify OK",
        }
      )
    }
    return NextResponse.json(
      {
        message: "El turno asignado ya ha pasado",
        ok: true,
      },
      {
        status: 200,
        statusText: "Shift already passed",
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "El turno asignado es inválido o no existe",
        ok: false,
      },
      {
        status: 404,
        statusText: "Shift not found",
      }
    )
  }
}
