import { ConnectionStates, connect, connection } from "mongoose"

import { MONGODB_URI } from "@/constants/api"

const connectionState = {
  isConnected: ConnectionStates.uninitialized,
}

export const connectDB = async () => {
  if (connectionState.isConnected === ConnectionStates.connected) return

  const db = await connect(MONGODB_URI, {
    dbName: "mbpeluqueria",
  })
  connectionState.isConnected = db.connection.readyState
}

connection.on("connected", () => {
  console.log("Mongoose is connected")
})

connection.on("error", () => {
  console.log("Mongoose connection error")
})
