"use client"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"

const ButtonBack = ({ isConfirmed }: { isConfirmed?: boolean }) => {
  const { back, push } = useRouter()
  return (
    <ArrowLeftIcon
      onClick={() => {
        isConfirmed ? push("/") : back()
      }}
      className="w-6 h-6 text-yellow-regular hover:cursor-pointer"
    />
  )
}

export default ButtonBack
