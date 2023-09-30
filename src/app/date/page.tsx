"use client"

import ButtonBack from "@/components/ButtonBack"
import ButtonNext from "@/components/ButtonNext"
import Calendar from "@/components/Calendar"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { useGetDays } from "@/hooks/get-days"
import { useEffect, useState } from "react"
import { Date } from "@/types/date.types"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Date = () => {
  const calendar = useGetDays()
  const { push } = useRouter()
  const { user, setDay } = useShiftData()

  const [selectedDay, setSelectedDay] = useState<Date>()

  const handleSelectedDay = (day: Date) => {
    setSelectedDay(day)
  }

  const onContinue = () => {
    if (selectedDay) {
      setDay(selectedDay)
      push("/hour")
    }
  }

  useEffect(() => {
    if (!user) push("/")
  }, [])

  return (
    <main className="flex flex-col gap-8 py-10 px-8">
      <ButtonBack />
      <div className="flex flex-col items-start gap-2">
        <Title>Fecha</Title>
        <Subtitle>
          Seleccioná la fecha en la que desees reservar el turno
        </Subtitle>
      </div>
      <Calendar
        data={calendar}
        selectedDay={selectedDay}
        handleSelectedDay={handleSelectedDay}
      />
      {selectedDay && (
        <ButtonNext onClick={onContinue} style="self-end mt-16" type="button">
          Continuar
        </ButtonNext>
      )}
    </main>
  )
}

export default Date
