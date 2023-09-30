"use client"

import { useEffect, useState } from "react"

import { API_URL } from "@/constants/api"
import ButtonBack from "@/components/ButtonBack"
import Summary from "@/components/Summary"
import Title from "@/components/Title"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Confirmation = () => {
  const { user, day, hour } = useShiftData()
  const { push } = useRouter()

  const [sending, setSending] = useState(false)
  const [isOk, setIsOk] = useState(false)

  const onConfirm = async () => {
    setSending(true)
    const data = { user, day, hour }
    try {
      const response = await axios.post(
        `${API_URL}/shifts`,
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      if (response.status === 201) {
        setSending(false)
        setIsOk(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!user || !day || !hour) push("/")
  }, [])

  return (
    <main className="flex flex-col gap-8 py-10 px-8">
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
    </main>
  )
}

export default Confirmation
