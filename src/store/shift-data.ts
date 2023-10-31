import { create } from "zustand"
import { type User } from "@/types/user.types"
import { Date } from "@/types/date.types"
import { Hour } from "@/types/hour.types"
import { API_URL } from "@/constants/api"

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
      const response = await fetch(`${API_URL}/shifts/verify?_id=${_id}`, {
        method: "GET",
        cache: "no-store",
      })
      if (response.status === 200) {
        const { shiftAssigned } = await response.json()
        set({
          user: shiftAssigned.user,
          day: shiftAssigned.day,
          hour: shiftAssigned.hour,
          assigned: true,
        })
      } else {
        localStorage.removeItem("shift-assigned")
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
      const availableResponse = await fetch(
        `${API_URL}/shifts/available?data=${JSON.stringify(data)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      )
      if (availableResponse.status !== 200) {
        throw new Error("El turno ya no está disponible")
      }
      const response = await fetch(`${API_URL}/shifts`, {
        method: "POST",
        body: JSON.stringify(data),
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 201) {
        const { _id } = await response.json()
        localStorage.setItem("shift-assigned", _id)
        set({ assigned: true })
      }
    } catch (error) {
      throw new Error(
        "Ocurrío un error al confirmar el turno.\nEl turno ya no está disponible"
      )
    }
  },
}))
