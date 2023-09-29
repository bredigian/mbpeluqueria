import { create } from "zustand"
import { type User } from "@/types/user.types"
import { Date } from "@/types/date.types"
import { Hour } from "@/types/hour.types"

export const useShiftData = create((set: any) => ({
  user: null as unknown as User,
  day: null as unknown as Date,
  hour: null as unknown as Hour,

  setUser: (user: User) => {
    set({ user })
  },

  setDay: (day: Date) => {
    set({ day })
  },

  setHour: (hour: Hour) => {
    set({ hour })
  },
}))
