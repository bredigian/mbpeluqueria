"use client"

import { useEffect, useState } from "react"

import { API_URL } from "@/constants/api"
import ButtonBack from "@/components/ButtonBack"
import Summary from "@/components/Summary"
import Title from "@/components/Title"
import axios from "axios"
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
    setSending(true)
    try {
      await confirm()
      setSending(false)
      setIsOk(true)
    } catch (error) {
      toast.error(error as string)
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
          user,
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
