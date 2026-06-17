import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { getSiteSettings } from "@/sanity/queries"
import { SEO_DEFAULTS } from "@/lib/seo"

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

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

// Font Google Fonts supportati (mappa nome → slug URL)
const GFONTS_SLUG: Record<string, string> = {
  "Inter": "Inter:wght@400;500;600;700",
  "Montserrat": "Montserrat:wght@400;500;600;700",
  "Lato": "Lato:wght@400;700",
  "Roboto": "Roboto:wght@400;500;700",
  "Open Sans": "Open+Sans:wght@400;500;600;700",
  "Raleway": "Raleway:wght@400;500;600;700",
  "Poppins": "Poppins:wght@400;500;600;700",
  "Nunito": "Nunito:wght@400;500;600;700",
  "Source Sans 3": "Source+Sans+3:wght@400;600;700",
}

// Metadata di base (default per le rotte senza generateMetadata, es. /studio).
// Le singole pagine sovrascrivono title/description via generateMetadata().
// metadataBase serve a Next.js per costruire gli URL assoluti di Open Graph.
export const metadata: Metadata = {
  // n8n: PROMPT-SEO — sostituire con il dominio reale del cliente
  metadataBase: new URL("https://www.brandpmi.it"),
  title: { default: SEO_DEFAULTS.home.title, template: "%s" },
  description: SEO_DEFAULTS.home.description,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  const navy   = settings?.colore_primario   || "#1b3a5c"
  const teal   = settings?.colore_secondario || "#2a7f6f"
  const accent = settings?.colore_accent     || null
  const font   = settings?.font_principale   || "Inter"

  // CSS vars da iniettare: solo quelle con valore da Sanity
  const cssVars = [
    `--brand-navy: ${navy};`,
    `--brand-navy-dark: color-mix(in srgb, ${navy} 80%, black);`,
    `--brand-navy-light: color-mix(in srgb, ${navy} 70%, white);`,
    `--brand-teal: ${teal};`,
    `--brand-teal-light: color-mix(in srgb, ${teal} 70%, white);`,
    ...(accent ? [`--brand-accent: ${accent};`] : []),
    `--font-brand: '${font}', system-ui, sans-serif;`,
  ].join(" ")

  const fontSlug = GFONTS_SLUG[font] ?? GFONTS_SLUG["Inter"]
  const gFontsUrl = `https://fonts.googleapis.com/css2?family=${fontSlug}&display=swap`

  return (
    <html lang="it" className={`${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={gFontsUrl} rel="stylesheet" />
        <style>{`:root { ${cssVars} } body { font-family: var(--font-brand); }`}</style>
      </head>
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
