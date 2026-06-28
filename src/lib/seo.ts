import type { Metadata } from "next"

// Dominio del sito. Viene da Sanity (Impostazioni sito › URL del sito); se è vuoto
// usa il placeholder qui sotto. È l'UNICA fonte del dominio: robots, metadata e
// tutti gli schema JSON-LD passano da qui.
// n8n: PROMPT-SEO — il dominio reale si imposta in Sanity, non in questo file.
export const SITE_URL_FALLBACK = "https://www.brandpmi.it"

export function siteUrl(url?: string | null): string {
  return (url || SITE_URL_FALLBACK).replace(/\/$/, "")
}

/**
 * SEO — title e description di default per ogni pagina.
 *
 * n8n: PROMPT-SEO — questi sono i FALLBACK usati quando i campi SEO non sono
 * compilati in Sanity. Il cliente può sovrascriverli dal documento corrispondente
 * nello Studio (gruppo "SEO"). Regole seguite:
 *   • title ≤ 60 caratteri, incluso "– <azienda>" in fondo
 *   • description tra 140 e 160 caratteri
 *   • keyword primaria all'inizio del title, nome azienda in fondo dopo "–"
 *   • target geografico nazionale → nessuna città nel title (non limita la portata)
 */
export const SEO_DEFAULTS = {
  home: {
    title: "Lavorazioni meccaniche di precisione – BrandPMI",
    description:
      "Lavorazioni CNC, stampaggio a freddo e trattamenti superficiali con qualità certificata ISO 9001. Consegne puntuali per l'industria in tutta Europa.",
  },
  servizi: {
    title: "Lavorazioni CNC, stampaggio e trattamenti – BrandPMI",
    description:
      "Filiera produttiva completa: lavorazioni CNC 3/4/5 assi, stampaggio a freddo, trattamenti superficiali e controllo qualità ISO 9001 in un'unica sede.",
  },
  chiSiamo: {
    title: "Azienda meccanica di precisione dal 1989 – BrandPMI",
    description:
      "Dal 1989 produciamo componenti meccanici di precisione per l'industria. Scopri la nostra storia, il team e le certificazioni ISO 9001 e IATF 16949.",
  },
  contatti: {
    title: "Contatti e preventivo lavorazioni – BrandPMI",
    description:
      "Richiedi un preventivo per le tue lavorazioni meccaniche: rispondiamo entro 24 ore lavorative. Telefono, email e modulo di contatto diretto.",
  },
  caseStudy: {
    title: "Casi studio: risultati per i clienti – BrandPMI",
    description:
      "Casi studio reali di lavorazioni meccaniche: come abbiamo migliorato qualità, lead time e costi per aziende manifatturiere italiane ed europee.",
  },
  landing: {
    title: "Rapid5: prototipazione rapida CNC – BrandPMI",
    description:
      "Rapid5: prototipi e piccole serie in 5 giorni con lavorazione CNC a 5 assi. Preventivo in 24 ore e qualità certificata ISO 9001. Scopri il servizio.",
  },
} as const

type SeoFields = { meta_title?: string | null; meta_description?: string | null } | null | undefined

/**
 * Costruisce l'oggetto Metadata di Next.js dai campi SEO di Sanity, con fallback
 * ai default qui sopra. Include anche Open Graph per la condivisione social.
 */
export function buildMetadata(
  seo: SeoFields,
  fallback: { title: string; description: string },
): Metadata {
  const title = seo?.meta_title?.trim() || fallback.title
  const description = seo?.meta_description?.trim() || fallback.description
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  }
}
