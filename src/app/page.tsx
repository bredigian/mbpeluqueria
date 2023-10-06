"use client"

import ButtonNext from "@/components/ButtonNext"
import Form from "@/components/Form"
import Image from "next/image"
import Link from "next/link"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"
import { motion } from "framer-motion"
const Home = () => {
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
      <div className="flex flex-col items-start gap-2 ml-2">
        <Title>¡Bienvenido!</Title>
        <Subtitle>
          Reservá tu turno acá mismo completando el siguiente formulario
        </Subtitle>
      </div>
      <Form />
    </motion.main>
  )
}

export default Home
