"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import Menu from "@/components/Menu"
import Notices from "@/components/Notices"
import ScreenLoader from "@/components/ScreenLoader"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Dashboard = () => {
  const { user, clearData } = useShiftData()
  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) push("/")
    else {
      clearData()
      setLoading(false)
    }
  }, [])

  if (loading) return <ScreenLoader />

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-8 py-12 px-6"
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
      <Notices />
    </motion.main>
  )
}

export default Dashboard
