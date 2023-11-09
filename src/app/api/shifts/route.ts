import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { Summary } from "@/types/summary.types"
import { connectDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const name = url.searchParams.get("name")
  const phone = url.searchParams.get("phone")

  if (!name || !phone) throw new Error("No se encontraron los parámetros")

  await connectDB()

  try {
    const shifts: Summary[] = await Shift.find({
      "user.name": name,
      "user.phone": phone,
    })

    const sortedShifts = shifts
      .sort((a, b) => {
        const dateA: any = new Date(
          a.day.year,
          a.day.month,
          a.day.day,
          parseInt(a.hour.hour.split(":")[0]),
          parseInt(a.hour.hour.split(":")[1])
        )
        const dateB: any = new Date(
          b.day.year,
          b.day.month,
          b.day.day,
          parseInt(b.hour.hour.split(":")[0]),
          parseInt(b.hour.hour.split(":")[1])
        )
        return dateA - dateB
      })
      .toReversed()

    return NextResponse.json(
      {
        shifts: sortedShifts,
      },
      {
        status: 200,
        statusText: "Ok",
      }
    )
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

export const POST = async (req: Request) => {
  await connectDB()
  try {
    const data = await req.json()
    const newShift = new Shift(data)
    const savedShift = await newShift.save()
    return NextResponse.json(savedShift, {
      status: 201,
      statusText: "Created",
    })
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
      statusText: "Bad Request",
    })
  }
}

export const DELETE = async (req: Request) => {
  const _id = new URL(req.url).searchParams.get("_id")

  await connectDB()

  try {
    const shift = await Shift.findByIdAndDelete(_id)
    if (!shift) throw new Error("No se encontró el turno")

    return NextResponse.json(
      {
        message: "Turno cancelado con éxito",
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
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}
