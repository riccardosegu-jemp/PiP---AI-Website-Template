import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PIP Template",
  description: "AI Website Template — JEMP",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <Script
        src="https://embeds.iubenda.com/widgets/e164dbb6-76ee-471a-af39-765056ca77c6.js"
        strategy="beforeInteractive"
      />
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  )
}
