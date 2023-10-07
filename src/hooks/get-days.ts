import { Day, Month } from "@/types/enums.types"

export const useGetDays = () => {
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

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const days = getDaysInMonth(currentMonth, currentYear)

  return days.map((day) => {
    if (day === null) {
      return {
        day: null,
        month: currentMonth,
        year: currentYear,
        dayWeek: null,
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
