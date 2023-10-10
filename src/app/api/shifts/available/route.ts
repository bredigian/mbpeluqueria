import Day from "@/models/Day"
import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { connectDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  await connectDB()
  try {
    const url = new URL(req.url)
    const data = url.searchParams.get("data") as string
    const dataParsed = JSON.parse(data)

    const dayData = await Day.findOne({
      weekday: dataParsed.day.dayWeek,
    })

    const hourEnabled = dayData.hours.find(
      (hour: any) => hour.value === dataParsed.hour.hour
    )

    if (!hourEnabled) {
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
    }

    const shiftExists = await Shift.findOne({
      "day.day": dataParsed.day.day,
      "day.month": dataParsed.day.month,
      "day.year": dataParsed.day.year,
      "hour.hour": dataParsed.hour.hour,
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
