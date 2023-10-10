import Day from "@/models/Day"
import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import WorkHour from "@/models/WorkHour"
import { connectDB } from "@/utils/mongoose"
import { Hour, type WorkHour as WorkHourType } from "@/types/hour.types"
import { Summary } from "@/types/summary.types"

export const POST = async (req: Request) => {
  await connectDB()

  try {
    const { day, dayWeek, month, year } = await req.json()

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
