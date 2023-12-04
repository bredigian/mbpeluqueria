"use client"

import { useEffect, useState } from "react"

import ButtonBack from "@/components/ButtonBack"
import { Pulsar } from "@uiball/loaders"
import Shift from "@/components/Shift"
import Subtitle from "@/components/Subtitle"
import { Summary } from "@/types/summary.types"
import Title from "@/components/Title"
import { User } from "@/types/user.types"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"
import { useShifts } from "@/store/shifts"

const MyShifts = () => {
  const { shifts, getShifts } = useShifts()
  const { user } = useShiftData()
  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      await getShifts(user as User)
    } catch (error: any) {
      toast.error(error.message)
    }

    setLoading(false)
  }

  const [active, setActive] = useState<string>("")

  const handleActive = (id: string) => {
    if (active === id) {
      setActive("")
    } else {
      setActive(id)
    }
  }

  useEffect(() => {
    if (!user) push("/")
    else fetchData()
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 py-10 px-6"
    >
      <ButtonBack path="/dashboard" />
      <section className="flex flex-col items-start gap-2 ml-2">
        <Title>Mis turnos</Title>
        <Subtitle>Acá se visualizarán los turnos que ya reservaste.</Subtitle>
      </section>
      {loading ? (
        <div className="grid place-items-center h-24">
          <Pulsar size={52} color="#D2BF9D" />
        </div>
      ) : (
        <ul className="flex flex-col gap-6 px-3">
          {shifts?.length === 0 ? (
            <span className="text-white-light text-sm self-center">
              No se encontraron turnos en el historial
            </span>
          ) : (
            shifts?.map((shift: Summary) => {
              return (
                <Shift
                  key={shift?._id}
                  data={shift}
                  active={active}
                  handleActive={() => handleActive(shift?._id)}
                />
              )
            })
          )}
        </ul>
      )}
    </motion.main>
  )
}

export default MyShifts
