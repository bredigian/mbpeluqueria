"use client"

import { useEffect, useState } from "react"

import ButtonBack from "@/components/ButtonBack"
import DayTime from "@/components/DayTime"
import { Pulsar } from "@uiball/loaders"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { useHours } from "@/store/hours"
import { useRouter } from "next-nprogress-bar"
import { useShiftData } from "@/store/shift-data"

const Hour = () => {
  const { day } = useShiftData()
  const { hours, getHours, getWorkHours } = useHours()
  const { push } = useRouter()

  const [loading, setLoading] = useState(false)

  const fetchHours = async () => {
    setLoading(true)
    await getWorkHours()
    await getHours(day)
    setLoading(false)
  }

  useEffect(() => {
    if (!day) {
      push("/date")
    } else fetchHours()
  }, [])

  return (
    <main className="flex flex-col gap-8 py-10 px-8">
      <ButtonBack />
      <div className="flex flex-col gap-2">
        <Title>Horario</Title>
        <Subtitle>Seleccioná uno de los horarios disponibles</Subtitle>
      </div>
      {loading ? (
        <div className="grid place-items-center w-full h-44">
          <Pulsar size={52} color="#D2BF9D" />
        </div>
      ) : (
        <DayTime hours={hours} />
      )}
    </main>
  )
}

export default Hour
