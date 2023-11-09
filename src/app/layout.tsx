import "./globals.css"

import { Inter } from "next/font/google"
import type { Metadata } from "next"
import ProviderProgressBar from "@/components/ProviderProgressBar"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_rounded.png",
    icon: "/icon512_maskable.png",
  },
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-sm mx-auto`}>
        <ProviderProgressBar>{children}</ProviderProgressBar>
        <Toaster />
      </body>
    </html>
  )
}
