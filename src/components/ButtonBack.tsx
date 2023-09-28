"use client"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"

const ButtonBack = () => {
  const { back } = useRouter()
  return (
    <ArrowLeftIcon onClick={back} className="w-6 h-6 text-yellow-regular" />
  )
}

export default ButtonBack
