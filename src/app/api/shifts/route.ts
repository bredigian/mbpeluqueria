import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { connectDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  await connectDB()

  try {
    const url = new URL(req.url)
    const day = url.searchParams.get("day")
    const month = url.searchParams.get("month")
    const year = url.searchParams.get("year")

    const shifts = await Shift.find({
      "day.day": day,
      "day.month": month,
      "day.year": year,
    }) //Find obtiene todos los documentos de la coleccion Shift

    return NextResponse.json(
      {
        shifts,
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
      statusText: "Bad Request",
    })
  }
}

export const POST = async (req: any) => {
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
