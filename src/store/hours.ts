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

  getWorkHours: async () => {
    try {
      const response = await axios.get(`${API_URL}/hours`)
      if (response.status === 200) {
        const { workHours } = response.data
        set({ workHours })
      }
    } catch (error) {
      throw new Error("Ocurrío un error al obtener los horarios de trabajo")
    }
  },

  getHours: async (day: DateType) => {
    try {
      const response = await axios.get(`${API_URL}/shifts`, {
        params: {
          day: day.day,
          dayWeek: day.dayWeek,
          month: day.month,
          year: day.year,
        },
      })
      const { shifts, dayData } = response.data
      if (shifts.length === 0) {
        const availableHours: Hour[] = get().workHours?.map(
          (hour: WorkHour) => {
            const isPast =
              new Date(
                day.year,
                day.month,
                day.day,
                parseInt(hour.value.split(":")[0]),
                parseInt(hour.value.split(":")[1])
              ) < new Date()
            const isEnabled = dayData.hours.find(
              (workHour: WorkHour) => workHour.value === hour.value
            )

            return {
              hour: hour.value,
              isAvailable: isPast || isEnabled === undefined ? false : true,
            }
          }
        )
        set({ hours: availableHours })
      } else {
        const hoursNotAvailables = shifts.map(
          (shift: Summary) => shift.hour.hour
        )
        const availableHours: Hour[] = get().workHours?.map(
          (hour: WorkHour) => {
            const isPast =
              new Date(
                day.year,
                day.month,
                day.day,
                parseInt(hour.value.split(":")[0]),
                parseInt(hour.value.split(":")[1])
              ) < new Date()

            const isEnabled = dayData.hours.find(
              (workHour: WorkHour) => workHour.value === hour.value
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
          }
        )
        set({ hours: availableHours })
      }
    } catch (error) {
      set({ error })
    }
  },
}))
