import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { connectDB } from "@/utils/mongoose"

export const GET = async () => {
  await connectDB()

  const shifts = await Shift.find() //Find obtiene todos los documentos de la coleccion Shift
  return NextResponse.json(
    {
      shifts,
    },
    {
      status: 200,
      statusText: "OK",
    }
  )
}

export const POST = async (req: any) => {
  await connectDB()

  const data = await req.json()
  console.log(data)

  return NextResponse.json({
    data,
  })
}
