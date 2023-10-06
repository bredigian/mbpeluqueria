import { create } from "zustand"
import { type User } from "@/types/user.types"
import { Date } from "@/types/date.types"
import { Hour } from "@/types/hour.types"
import axios from "axios"
import { API_URL } from "@/constants/api"
import Cookies from "js-cookie"

export const useShiftData = create((set: any, get: any) => ({
  user: null as unknown as User,
  day: null as unknown as Date,
  hour: null as unknown as Hour,

  assigned: false as boolean,

  setUser: (user: User) => {
    set({ user })
  },

  setDay: (day: Date) => {
    set({ day })
  },

  setHour: (hour: Hour) => {
    set({ hour })
  },

  verifyShift: async (_id: string) => {
    try {
      const response = await axios.get(`${API_URL}/shifts/verify`, {
        params: {
          _id,
        },
      })
      if (response.status === 200) {
        const { shiftAssigned } = response.data
        set({
          user: shiftAssigned.user,
          day: shiftAssigned.day,
          hour: shiftAssigned.hour,
          assigned: true,
        })
      }
    } catch (error) {
      throw new Error("Ocurrío un error al verificar el turno")
    }
  },

  confirm: async () => {
    const data = {
      user: get().user,
      day: get().day,
      hour: get().hour,
    }
    try {
      const availableResponse = await axios.get(`${API_URL}/shifts/available`, {
        params: {
          data: JSON.stringify(data),
        },
      })
      if (availableResponse.status !== 200) {
        throw new Error("El turno ya no está disponible")
      }
      const response = await axios.post(
        `${API_URL}/shifts`,
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      if (response.status === 201) {
        const { _id } = response.data
        Cookies.set("shift-assigned", _id)
        set({ assigned: true })
      }
    } catch (error) {
      throw new Error(
        "Ocurrío un error al confirmar el turno o el turno ya no está disponible"
      )
    }
  },
}))
