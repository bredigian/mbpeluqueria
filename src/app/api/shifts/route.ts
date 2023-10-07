import Day from "@/models/Day"
import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import WorkHour from "@/models/WorkHour"
import { connectDB } from "@/utils/mongoose"
import { Hour, type WorkHour as WorkHourType } from "@/types/hour.types"
import { Summary } from "@/types/summary.types"

export const GET = async (req: Request) => {
  await connectDB()

  try {
    const url = new URL(req.url)
    const day = url.searchParams.get("day") as unknown as number
    const dayWeek = url.searchParams.get("dayWeek") as unknown as number
    const month = url.searchParams.get("month") as unknown as number
    const year = url.searchParams.get("year") as unknown as number

    const shifts = await Shift.find({
      "day.day": day,
      "day.month": month,
      "day.year": year,
    }) //Find obtiene todos los documentos de la coleccion Shift

    const workHours = await WorkHour.find()

    const dayData = await Day.findOne({
      weekday: dayWeek,
    })

    if (shifts.length === 0) {
      const availableHours: Hour[] = workHours?.map((hour: WorkHourType) => {
        const isPast =
          new Date(
            year,
            month,
            day,
            parseInt(hour.value.split(":")[0]),
            parseInt(hour.value.split(":")[1])
          ) < new Date()
        const isEnabled = dayData.hours.find(
          (workHour: WorkHourType) => workHour.value === hour.value
        )

        return {
          hour: hour.value,
          isAvailable: isPast || isEnabled === undefined ? false : true,
        }
      })
      return NextResponse.json(
        {
          hours: availableHours,
          message: "Todos los horarios estan disponibles",
        },
        {
          status: 200,
          statusText: "OK",
        }
      )
    } else {
      const hoursNotAvailables = shifts.map((shift: Summary) => shift.hour.hour)
      const availableHours: Hour[] = workHours?.map((hour: WorkHourType) => {
        const isPast =
          new Date(
            year,
            month,
            day,
            parseInt(hour.value.split(":")[0]),
            parseInt(hour.value.split(":")[1])
          ) < new Date()

        const isEnabled = dayData.hours.find(
          (workHour: WorkHourType) => workHour.value === hour.value
        )
        return {
          hour: hour.value,
          isAvailable:
            isEnabled === undefined ||
            isPast ||
            hoursNotAvailables.includes(hour.value)
              ? false
              : true,
        }
      })

      return NextResponse.json(
        {
          hours: availableHours,
          message: "Algunos horarios estan disponibles",
        },
        {
          status: 200,
          statusText: "OK",
        }
      )
    }
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
