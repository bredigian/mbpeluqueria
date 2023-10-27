import { Day, Month } from "@/types/enums.types"

import { type Date } from "@/types/date.types"
import { useState } from "react"

export const useGetDays = () => {
  const [calendar, setCalendar] = useState<Date[]>([])

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1)
    const days = []

    while (date.getMonth() === month) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }

    const firstDayOfMonth = days[0].getDay()

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.unshift(null)
    }

    return days
  }

  const setData = (month: number, year: number) => {
    const days = getDaysInMonth(month, year)

    const parsedDays = () => {
      return days.map((day) => {
        if (day === null) {
          return {
            day: null as unknown as number,
            month: month,
            year: year,
            dayWeek: null as unknown as number,
            dateString: "",
          }
        }
        return {
          day: day.getDate(),
          month: day.getMonth(),
          year: day.getFullYear(),
          dayWeek: day.getDay(),
          dateString: `${Day[day.getDay()]}. ${day.getDate()} de ${
            Month[day.getMonth()]
          }`,
        }
      })
    }

    setCalendar(parsedDays())
  }

  return {
    calendar,
    setData,
  }
}
