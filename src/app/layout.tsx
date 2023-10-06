import "./globals.css"

import AppNavigator from "@/components/AppNavigator"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

const metadata: Metadata = {
  title: "MB Peluquería",
  description: "Reservá tu turno para cortarte el pelo acá mismo en instantes.",
  keywords:
    "peluquería, peluquero, pelo, cortar, cortes, cortes de pelo, masculino, niños, barba, barberia, barbero",
  authors: [
    {
      name: "Gianluca Bredice Developer",
      url: "https://devbredicegian.site",
    },
  ],
  robots: "index",
  applicationName: "MB Peluquería",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-sm mx-auto`}>
        <AppNavigator>{children}</AppNavigator>
        <Toaster />
      </body>
    </html>
  )
}
