import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { connectDB } from "@/utils/mongoose"

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
