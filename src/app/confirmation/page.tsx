"use client"

import { useEffect, useState } from "react"

import ButtonBack from "@/components/ButtonBack"
import Summary from "@/components/Summary"
import Title from "@/components/Title"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Confirmation = () => {
  const { user, day, hour } = useShiftData()
  const { push } = useRouter()

  const [sending, setSending] = useState(false)
  const [isOk, setIsOk] = useState(false)

  const onConfirm = async () => {
    setSending(true)
    const prom = new Promise((resolve, reject) => {
      setTimeout(() => resolve(""), 4000)
    })
    await prom.then(() => {
      setIsOk(true)
      setSending(false)
    })
  }

  useEffect(() => {
    if (!user || !day || !hour) push("/")
  }, [])

  return (
    <main className="flex flex-col gap-8 py-12 px-10">
      <ButtonBack />
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
    </main>
  )
}

export default Confirmation
