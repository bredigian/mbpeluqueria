import { SECONDARY_API_URL } from "@/constants/api"
import io from "socket.io-client"

export const connectToWebSocket = (user: string) => {
  return io(SECONDARY_API_URL, {
    query: {
      user: user,
    },
  })
}
