"use client"

import { useEffect, useState } from "react"

import ProviderProgressBar from "./ProviderProgressBar"
import ScreenLoader from "./ScreenLoader"
import Summary from "./Summary"
import Title from "./Title"
import { motion } from "framer-motion"
import { useShiftData } from "@/store/shift-data"

const AppNavigator = ({ children }: { children: React.ReactNode }) => {
  const { verifyShift, assigned, day, hour, user } = useShiftData()
  const [loading, setLoading] = useState(true)

  const verify = async () => {
    try {
      const _id = localStorage.getItem("shift-assigned")
      if (_id) await verifyShift(_id)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    verify()
  }, [])

  if (loading) return <ScreenLoader />

  return (
    <>
      {assigned ? (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-8 py-10 px-8 w-full"
        >
          <Title style="self-center">¡Ya tenés un turno asignado!</Title>
          <Summary
            data={{
              day,
              hour,
              user,
            }}
            isOk
          />
        </motion.main>
      ) : (
        <ProviderProgressBar>{children}</ProviderProgressBar>
      )}
    </>
  )
}

export default AppNavigator
