import Day from "@/models/Day"
import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import WorkHour from "@/models/WorkHour"
import { connectDB } from "@/utils/mongoose"
import { Hour, type WorkHour as WorkHourType } from "@/types/hour.types"
import { Summary } from "@/types/summary.types"
import { type Day as DayType } from "@/types/days.types"

interface DayExtended extends DayType {
  isComplete: boolean
}

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

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const month = url.searchParams.get("month")
  const year = url.searchParams.get("year")

  await connectDB()

  try {
    const shifts = await Shift.find({
      "day.month": month,
      "day.year": year,
    })

    const sortedShifts = shifts.sort((a, b) => a.day.day - b.day.day)

    let days = [] // Dias que tienen aunque sea un turno asignado, con horarios no disponibles
    let j = 0

    while (j < sortedShifts.length) {
      const day = sortedShifts[j].day
      const shiftsByDay = sortedShifts.filter(
        (shift) =>
          shift.day.day === day.day &&
          shift.day.month === day.month &&
          shift.day.year === day.year
      )
      const hours = shiftsByDay.map((shift) => shift.hour.hour)

      days.push({
        date: day,
        notAvailablesHours: hours,
      })

      j += shiftsByDay.length
    }

    const dayData = await Day.find() // Obtengo los dias de trabajo disponibles. Ej: Lunes, 1, [10hs, 12hs]

    const dayDataParsed: DayExtended[] = dayData.map((day: DayExtended) => {
      return {
        _id: day._id,
        hours: day.hours,
        weekday: day.weekday,
        path: day.path,
        value: day.value,
        isComplete: day.hours.length === 0 ? true : false,
      }
    })

    const daysWithoutHoursEnabled = dayDataParsed.filter(
      (day: DayExtended) => day.isComplete
    ) // Dias que no tienen horarios disponibles

    const daysWithShiftsAssigned = days.map((day) => {
      const dayInfo = dayDataParsed.find(
        (dayBd: DayExtended) => dayBd.weekday === day.date.dayWeek
      )

      if (dayInfo) {
        const isComplete = dayInfo.isComplete
          ? true
          : dayInfo.hours.length === day.notAvailablesHours.length

        return {
          day: day.date.day,
          month: day.date.month,
          year: day.date.year,
          isComplete,
        }
      }
    }) // Dias que tienen turnos asignados

    return NextResponse.json(
      {
        daysWithShiftsAssigned,
        daysWithoutHoursEnabled,
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ocurrió un error al obtener los datos del calendario",
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}
