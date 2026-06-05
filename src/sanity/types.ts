export type Servizio = {
  _id: string
  slug: string
  titolo: string
  descrizione_completa: string
  punti_chiave: string[]
  immagine_url: string | null
  immagine_alt: string
  ordine: number
}

export type Metrica = {
  _key: string
  valore: string
  label: string
}

export type CaseStudy = {
  _id: string
  slug: string
  titolo: string
  settore: string
  immagine_url: string | null
  immagine_alt: string
  metriche: Metrica[]
  descrizione_breve: string
  descrizione_completa: string
  in_evidenza: boolean
  ordine: number
}
