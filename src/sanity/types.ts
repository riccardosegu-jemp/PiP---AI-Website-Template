// I campi non marcati come required() negli schema Sanity possono tornare null
// dalla GROQ: i tipi lo riflettono per evitare crash su accessi non protetti.
export type Servizio = {
  _id: string
  slug: string | null
  titolo: string
  descrizione_completa: string | null
  punti_chiave: string[] | null
  immagine_url: string | null
  immagine_alt: string
  ordine: number | null
}

export type Metrica = {
  _key: string
  valore: string
  label: string
}

export type CaseStudy = {
  _id: string
  slug: string | null
  titolo: string
  settore: string | null
  immagine_url: string | null
  immagine_alt: string
  metriche: Metrica[] | null
  descrizione_breve: string | null
  descrizione_completa: string | null
  in_evidenza: boolean
  ordine: number | null
}
