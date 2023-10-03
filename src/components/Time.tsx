"use client"

import { Hour } from "@/types/hour.types"
import { useRouter } from "next-nprogress-bar"
import { useShiftData } from "@/store/shift-data"

const Time = ({ data }: { data: Hour }) => {
  const { push } = useRouter()
  const { setHour } = useShiftData()

  const handleSelect = () => {
    if (data.isAvailable) {
      setHour(data)
      push("/confirmation")
    }
  }

  return (
    <div
      onClick={handleSelect}
      className={`flex items-center justify-between w-full ${
        data.isAvailable ? "bg-dark-bold hover:cursor-pointer" : "bg-dark-light"
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
    </div>
  )
}

export default Time
