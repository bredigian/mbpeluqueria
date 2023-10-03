import "./globals.css"

import AppNavigator from "@/components/AppNavigator"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MB Peluqueria",
  description: "Reservá tu turno para cortarte el pelo acá mismo en instantes.",
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
