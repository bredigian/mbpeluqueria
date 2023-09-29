import { API_URL } from "@/constants/api"
import { Date } from "@/types/date.types"
import { Hour } from "@/types/hour.types"
import { Summary } from "@/types/summary.types"
import axios from "axios"
import { create } from "zustand"
import { workHours } from "@/constants/work-hours"

export const useHours = create((set: any, get: any) => ({
  workHours: workHours,
  hours: null as unknown as Hour[],
  error: null as unknown as string,

  getHours: async (day: Date) => {
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
        console.log("Todos los turnos estan disponibles")
        const availableHours: Hour[] = get().workHours.map((hour: string) => {
          return {
            hour,
            isAvailable: true,
          }
        })
        set({ hours: availableHours })
      } else {
        const hoursNotAvailables = shifts.map(
          (shift: Summary) => shift.hour.hour
        )
        const availableHours: Hour[] = get().workHours.map((hour: string) => {
          return {
            hour,
            isAvailable: hoursNotAvailables.includes(hour) ? false : true,
          }
        })
        set({ hours: availableHours })
      }
    } catch (error) {
      set({ error })
    }
  },
}))
