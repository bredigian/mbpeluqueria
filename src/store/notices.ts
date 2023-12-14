import { API_URL } from "@/constants/api"
import { Notice } from "@/types/notices.types"
import { create } from "zustand"

export const useNotices = create((set: any) => ({
  notices: null as Notice[] | null,
  isNotices: false,

  getNotices: async () => {
    const response = await fetch(`${API_URL}/notices`, {
      method: "GET",
      cache: "no-store",
    })
    const { notices, message, isNotices } = await response.json()
    if (!response.ok) throw new Error(message)

    set({ notices, isNotices })
  },
}))
