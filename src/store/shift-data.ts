import { create } from "zustand"
import { type User } from "@/types/user.types"
import { Date } from "@/types/date.types"
import { Hour } from "@/types/hour.types"
import { API_URL } from "@/constants/api"
import { toast } from "sonner"

export const useShiftData = create((set: any, get: any) => ({
  user: null as unknown as User | null,
  day: null as unknown as Date,
  hour: null as unknown as Hour,

  assigned: false as boolean,

  setUser: async (userData: User) => {
    // Esto va a simular un signup, en caso de que el usuario exista, se realiza un signin
    const response = await fetch(`${API_URL}/auth`, {
      method: "POST",
      body: JSON.stringify(userData),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const { message, user } = await response.json()
    if (!response.ok) throw new Error(message)
    localStorage.setItem("user", JSON.stringify(user))
    toast.success(message)

    set({ user })
  },

  getUser: async () => {
    const localUser = localStorage.getItem("user")
    if (!localUser) throw new Error("No se encontró el usuario almacenado")
    else {
      const userParsed: User = JSON.parse(localUser)
      const response = await fetch(`${API_URL}/auth?_id=${userParsed?._id}`, {
        method: "GET",
        cache: "no-store",
      })
      const { user, message } = await response.json()
      if (!response.ok) throw new Error(message)
      else set({ user })
    }
  },

  clearUser: async () => {
    localStorage.removeItem("user")
    set({ user: null })
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
        const shift = await response.json()
        localStorage.setItem("shift-assigned", shift._id)
        set({ assigned: true })

        return {
          day: shift.day.dateString,
          time: shift.hour.hour,
          user: shift.user.name,
          id: shift._id,
          type: "reserve",
        } // Estos datos son enviados como notificación al Administrador
      }
    } catch (error) {
      throw new Error(
        "Ocurrío un error al confirmar el turno.\nEl turno ya no está disponible"
      )
    }
  },

  clearData: () => {
    set({ day: null, hour: null })
  },
}))
