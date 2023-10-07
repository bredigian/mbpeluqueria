"use client"

import ButtonBack from "@/components/ButtonBack"
import ButtonNext from "@/components/ButtonNext"
import Calendar from "@/components/Calendar"
import Link from "next/link"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useGetDays } from "@/hooks/get-days"
import { useRouter } from "next-nprogress-bar"
import { useShiftData } from "@/store/shift-data"

const Date = () => {
  const calendar = useGetDays()
  const { push } = useRouter()
  const { user, day, setDay } = useShiftData()

  useEffect(() => {
    if (!user) push("/")
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
      <Calendar data={calendar} selectedDay={day} handleSelectedDay={setDay} />
      {day && (
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

export default Date
