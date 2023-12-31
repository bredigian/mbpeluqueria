"use client"

import { useEffect, useState } from "react"

import Form from "@/components/Form"
import Image from "next/image"
import ScreenLoader from "@/components/ScreenLoader"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Home = () => {
  const { getUser } = useShiftData()
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  const fetchUser = async () => {
    try {
      await getUser()
      push("/dashboard")
    } catch (error: any) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
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
        <Title>¡Bienvenido!</Title>
        <Subtitle>
          En este sistema podrás gestionar los turnos que reserves. Pero
          primero, necesitamos que completes los siguientes datos:
        </Subtitle>
      </section>
      <Form />
    </motion.main>
  )
}

export default Home
