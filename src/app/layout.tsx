import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script"

// n8n: PROMPT-17 — aggiorna url_sito, coordinate_gps e logo_url con i dati reali del cliente
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BrandPMI",
  "url": "https://www.brandpmi.it",
  "telephone": "+39 030 123 4567",
  "email": "info@brandpmi.it",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via dell'Industria 12",
    "postalCode": "25030",
    "addressLocality": "Castel Mella",
    "addressRegion": "BS",
    "addressCountry": "IT",
  },
  "openingHours": ["Mo-Fr 08:00-18:00"],
  "image": "https://www.brandpmi.it/logo.svg",
}

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PIP Template",
  description: "AI Website Template — JEMP",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://embeds.iubenda.com/widgets/e164dbb6-76ee-471a-af39-765056ca77c6.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
