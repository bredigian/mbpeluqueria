import { API_URL } from "@/constants/api"
import { type Date as DateType } from "@/types/date.types"
import { Hour, WorkHour } from "@/types/hour.types"
import { Summary } from "@/types/summary.types"
import axios from "axios"
import { create } from "zustand"

export const useHours = create((set: any, get: any) => ({
  workHours: [] as WorkHour[],
  hours: null as unknown as Hour[],
  error: null as unknown as string,

  getHours: async (day: DateType) => {
    try {
      const data = {
        day: day.day,
        dayWeek: day.dayWeek,
        month: day.month,
        year: day.year,
      }
      const response = await fetch(`${API_URL}/hours`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        cache: "no-store",
      })

      const { hours, message } = await response.json()

      const sortedHours = hours.sort((a: Hour, b: Hour) => {
        const [hourA, minutesA] = a.hour.split(":")
        const [hourB, minutesB] = b.hour.split(":")
        if (hourA < hourB) return -1
        if (hourA > hourB) return 1
        if (minutesA < minutesB) return -1
        if (minutesA > minutesB) return 1
        return 0
      })
      set({ hours: sortedHours })
    } catch (error) {
      set({ error })
    }
  },
}))
