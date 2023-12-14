"use client"

import { PiSealWarningDuotone, PiWarningCircle } from "react-icons/pi"
import { useEffect, useState } from "react"

import Image from "next/image"
import Menu from "@/components/Menu"
import { RiArrowRightSFill } from "react-icons/ri"
import ScreenLoader from "@/components/ScreenLoader"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useNotices } from "@/store/notices"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Dashboard = () => {
  const { user, clearData } = useShiftData()
  const { notices, isNotices, getNotices } = useNotices()
  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      await getNotices()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!user) push("/")
    else {
      clearData()
      fetchData()
      setLoading(false)
    }
  }, [])

  if (loading) return <ScreenLoader />

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-8 py-16 px-6"
    >
      <Image
        width={160}
        height={160}
        src={logo}
        alt="Logo de MB Peluqueria"
        style={{
          borderRadius: "100%",
        }}
      />
      <section className="flex flex-col items-start gap-2 ml-2">
        <Title>¡Hola, {user?.name.split(" ")[0]}!</Title>
        <Subtitle>
          En este menú podrás seleccionar la opción de lo que desees gestionar
        </Subtitle>
      </section>
      <Menu />
      {isNotices && (
        <section className="bg-yellow-600 flex flex-col items-start w-full gap-2 p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 w-full">
            <Title style="text-black">Avisos</Title>
            <PiWarningCircle className="w-6 h-6 text-black" />
          </div>
          <ul className="flex flex-col items-start gap-2 max-h-12 overflow-auto">
            {notices?.map((notice) => {
              return (
                <li key={notice._id} className="text-black text-sm">
                  {notice.title}
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </motion.main>
  )
}

export default Dashboard
