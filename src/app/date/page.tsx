"use client"

import ButtonBack from "@/components/ButtonBack"
import ButtonNext from "@/components/ButtonNext"
import Calendar from "@/components/Calendar"
import Link from "next/link"
import { Pulsar } from "@uiball/loaders"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useGetDays } from "@/hooks/get-days"
import { useRouter } from "next-nprogress-bar"
import { useShiftData } from "@/store/shift-data"

const DateScreen = () => {
  const { calendar, loading, setData } = useGetDays()
  const { push } = useRouter()
  const { user, day, setDay } = useShiftData()

  const handleNextMonth = () => {
    setData(
      calendar[0].month !== 11 ? calendar[0].month + 1 : 0,
      calendar[0].year
    )
  }

  const handlePrevMonth = () => {
    setData(calendar[0].month - 1, calendar[0].year)
  }

  useEffect(() => {
    if (!user) push("/")

    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    setData(currentMonth, currentYear)
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col gap-8 py-10 px-8"
    >
      <ButtonBack />
      <div className="flex flex-col items-start gap-2">
        <Title>Fecha</Title>
        <Subtitle>
          Seleccioná la fecha en la que desees reservar el turno
        </Subtitle>
      </div>
      {!loading ? (
        <Calendar
          data={calendar}
          selectedDay={day}
          handleSelectedDay={setDay}
          handleNextMonth={handleNextMonth}
          handlePrevMonth={handlePrevMonth}
        />
      ) : (
        <div className="grid place-items-center h-24">
          <Pulsar size={52} color="#D2BF9D" />
        </div>
      )}
      {day && !loading && (
        <Link
          href={"/hour"}
          prefetch={false}
          className="absolute self-end bottom-0"
        >
          <ButtonNext type="button">Continuar</ButtonNext>
        </Link>
      )}
    </motion.main>
  )
}

export default DateScreen
