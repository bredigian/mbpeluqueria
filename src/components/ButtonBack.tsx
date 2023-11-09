"use client"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next-nprogress-bar"

const ButtonBack = ({
  isConfirmed,
  path,
  style,
}: {
  isConfirmed?: boolean
  path?: string
  style?: string
}) => {
  const { back, push } = useRouter()
  return (
    <ArrowLeftIcon
      onClick={() => {
        isConfirmed ? push("/") : path ? push(path) : back()
      }}
      className={`w-6 h-6 text-yellow-regular hover:cursor-pointer ${style}`}
    />
  )
}

export default ButtonBack
