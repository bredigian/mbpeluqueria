import { API_URL } from "@/constants/api"
import { type Date as DateType } from "@/types/date.types"
import { Hour } from "@/types/hour.types"
import { Summary } from "@/types/summary.types"
import axios from "axios"
import { create } from "zustand"
import { workHours } from "@/constants/work-hours"

export const useHours = create((set: any, get: any) => ({
  workHours: workHours,
  hours: null as unknown as Hour[],
  error: null as unknown as string,

  getHours: async (day: DateType) => {
    try {
      const response = await axios.get(`${API_URL}/shifts`, {
        params: {
          day: day.day,
          month: day.month,
          year: day.year,
        },
      })
      const { shifts } = response.data

      if (shifts.length === 0) {
        const availableHours: Hour[] = get().workHours.map((hour: string) => {
          const isPast =
            new Date(
              day.year,
              day.month,
              day.day,
              parseInt(hour.split(":")[0]),
              parseInt(hour.split(":")[1])
            ) < new Date()
          return {
            hour,
            isAvailable: isPast ? false : true,
          }
        })
        set({ hours: availableHours })
      } else {
        const hoursNotAvailables = shifts.map(
          (shift: Summary) => shift.hour.hour
        )
        const availableHours: Hour[] = get().workHours.map((hour: string) => {
          const isPast =
            new Date(
              day.year,
              day.month,
              day.day,
              parseInt(hour.split(":")[0]),
              parseInt(hour.split(":")[1])
            ) < new Date()

          return {
            hour,
            isAvailable:
              hoursNotAvailables.includes(hour) || isPast ? false : true,
          }
        })
        set({ hours: availableHours })
      }
    } catch (error) {
      set({ error })
    }
  },
}))
