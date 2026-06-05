import { client } from './client'
import type { Servizio, CaseStudy } from './types'

export const SERVIZI_QUERY = `
  *[_type == "servizio"] | order(ordine asc) {
    _id,
    "slug": slug.current,
    titolo,
    descrizione_completa,
    punti_chiave,
    "immagine_url": immagine.asset->url,
    "immagine_alt": coalesce(immagine.alt, ""),
    ordine
  }
`

export const CASE_STUDY_QUERY = `
  *[_type == "caseStudy"] | order(in_evidenza desc, ordine asc) {
    _id,
    "slug": slug.current,
    titolo,
    settore,
    "immagine_url": immagine.asset->url,
    "immagine_alt": coalesce(immagine.alt, ""),
    metriche[] { _key, valore, label },
    descrizione_breve,
    descrizione_completa,
    in_evidenza,
    ordine
  }
`

export async function getServizi(): Promise<Servizio[]> {
  return client.fetch<Servizio[]>(SERVIZI_QUERY, {}, { next: { revalidate: 3600 } })
}

export async function getCaseStudy(): Promise<CaseStudy[]> {
  return client.fetch<CaseStudy[]>(CASE_STUDY_QUERY, {}, { next: { revalidate: 3600 } })
}
