"use client"

import { Hour } from "@/types/hour.types"
import { motion } from "framer-motion"
import { useRouter } from "next-nprogress-bar"
import { useShiftData } from "@/store/shift-data"

const Time = ({ data, delay }: { data: Hour; delay: number }) => {
  const { push } = useRouter()
  const { setHour } = useShiftData()

  const handleSelect = () => {
    if (data.isAvailable) {
      setHour(data)
      push("/confirmation")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay }}
      onClick={handleSelect}
      className={`flex items-center justify-between w-full ${
        data.isAvailable
          ? "bg-dark-regular hover:cursor-pointer"
          : "bg-dark-light"
      } py-4 px-6 rounded-full`}
    >
      <span
        className={`${
          data.isAvailable ? "text-yellow-regular" : "text-yellow-light"
        } font-medium text-xl`}
      >
        {data.hour}
      </span>
      <span
        className={`${
          data.isAvailable ? "text-yellow-regular" : "text-yellow-light"
        } font-medium text-sm`}
      >
        {data.isAvailable ? "Disponible" : "No disponible"}
      </span>
    </motion.div>
  )
}

export default Time
