"use client"

import { useEffect, useState } from "react"

import Button from "@/components/Button"
import Image from "next/image"
import Menu from "@/components/Menu"
import Modal from "@/components/Modal"
import Notices from "@/components/Notices"
import ScreenLoader from "@/components/ScreenLoader"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Dashboard = () => {
  const { user, clearData, clearUser } = useShiftData()
  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleLogout = async () => {
    try {
      await clearUser()
      push("/")
    } catch (error) {
      toast.error("Ocurrió un error al cerrar la sesión")
    }
  }

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
      className="relative flex flex-col items-center gap-8 py-12 px-6"
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
      <Button onClick={handleModal}>Cerrar sesión</Button>
      {showModal && (
        <Modal>
          <div className="bg-dark-bold flex flex-col items-center gap-4 p-8 w-[300px] rounded-[55px]">
            <Title style="text-yellow-regular">¿Estás seguro?</Title>
            <button
              onClick={handleLogout}
              type="button"
              className="text-dark-bold bg-yellow-regular rounded-full py-2 w-[140px] mt-2"
            >
              Confirmar
            </button>
            <button
              onClick={handleModal}
              type="button"
              className="text-yellow-regular border-2 border-yellow-regular rounded-full py-2 w-[140px]"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </motion.main>
  )
}

export default Dashboard
