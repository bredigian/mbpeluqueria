"use client"

import { useEffect, useState } from "react"

import ButtonBack from "@/components/ButtonBack"
import Summary from "@/components/Summary"
import Title from "@/components/Title"
import { User } from "@/types/user.types"
import { connectToWebSocket } from "@/utils/io"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useRouter } from "next-nprogress-bar"
import { useShiftData } from "@/store/shift-data"

const Confirmation = () => {
  const { user, day, hour, confirm } = useShiftData()
  const { push } = useRouter()

  const [sending, setSending] = useState(false)
  const [isOk, setIsOk] = useState(false)

  const onConfirm = async () => {
    const socket = connectToWebSocket(user?.name as string)

    setSending(true)
    try {
      const result = await confirm()
      socket.emit("new-shift", result, () => {
        socket.disconnect()
      })

      setSending(false)
      setIsOk(true)
    } catch (error: any) {
      toast.error(error?.message)
      setSending(false)
    }
  }

  useEffect(() => {
    if (!user || !day || !hour) push("/")
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 py-10 px-8"
    >
      <ButtonBack isConfirmed={isOk} />
      <Title>Finalización</Title>
      <Summary
        data={{
          _id: user?._id as string,
          user: user as User,
          day,
          hour,
        }}
        onConfirm={onConfirm}
        sending={sending}
        isOk={isOk}
      />
    </motion.main>
  )
}

export default Confirmation
