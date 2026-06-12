// I campi non marcati come required() negli schema Sanity possono tornare null:
// i tipi lo riflettono per evitare crash su accessi non protetti.

export type Servizio = {
  _id: string
  slug: string | null
  titolo: string
  icona: string | null
  descrizione_breve: string | null
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

export type Certificazione = {
  _key: string
  titolo: string | null
  ente: string | null
  dal: string | null
}

export type SiteSettings = {
  nome_azienda: string
  logo_url: string | null
  logo_alt: string
  footer_descrizione: string | null
  telefono: string | null
  email: string | null
  email_commerciale: string | null
  reparto: string | null
  indirizzo: string | null
  citta: string | null
  orari: string | null
  ragione_sociale: string | null
  piva: string | null
  rea: string | null
  sede_legale: string | null
  email_pec: string | null
  copyright: string | null
  privacy_policy_url: string | null
  cookie_policy_url: string | null
  certificazioni: Certificazione[] | null
}

export type ProcessoStep = {
  _key: string
  numero: number | null
  icona: string | null
  titolo: string | null
  descrizione: string | null
}

export type Feature = {
  _key: string
  icona: string | null
  titolo: string | null
  descrizione: string | null
}

export type Stat = {
  _key: string
  valore: string | null
  label: string | null
  descrizione: string | null
}

export type Logo = {
  _key: string
  url: string | null
  alt: string
}

export type Homepage = {
  hero_headline: string | null
  hero_sottotitolo: string | null
  hero_cta_primaria_testo: string | null
  hero_cta_primaria_href: string | null
  hero_cta_secondaria_testo: string | null
  hero_cta_secondaria_href: string | null
  hero_immagine_url: string | null
  hero_immagine_alt: string
  trustbar_titolo: string | null
  loghi_clienti: Logo[] | null
  servizi_tagline: string | null
  servizi_titolo: string | null
  servizi_descrizione: string | null
  processo_tagline: string | null
  processo_titolo: string | null
  processo_descrizione: string | null
  processo: ProcessoStep[] | null
  casi_tagline: string | null
  casi_titolo: string | null
  casi_descrizione: string | null
  perche_tagline: string | null
  perche_titolo: string | null
  perche_descrizione: string | null
  features: Feature[] | null
  stats: Stat[] | null
  contatti_tagline: string | null
  contatti_titolo: string | null
  contatti_descrizione: string | null
}

export type TimelineItem = {
  _key: string
  anno: string | null
  testo: string | null
}

export type Valore = {
  _key: string
  titolo: string | null
  descrizione: string | null
}

export type TeamMember = {
  _key: string
  nome: string | null
  ruolo: string | null
  bio: string | null
  foto_url: string | null
  foto_alt: string
}

export type ChiSiamo = {
  hero_headline: string | null
  hero_immagine_url: string | null
  hero_immagine_alt: string
  storia_tagline: string | null
  storia_titolo: string | null
  storia_narrativa: string[] | null
  timeline: TimelineItem[] | null
  valori_tagline: string | null
  valori_titolo: string | null
  valori_descrizione: string | null
  valori: Valore[] | null
  cert_tagline: string | null
  cert_titolo: string | null
  team_tagline: string | null
  team_titolo: string | null
  team_descrizione: string | null
  team: TeamMember[] | null
  sede_tagline: string | null
  sede_titolo: string | null
  sede_descrizione: string | null
  sede_punti: string[] | null
  sede_immagine_url: string | null
  sede_immagine_alt: string
  contatti_tagline: string | null
  contatti_titolo: string | null
  contatti_descrizione: string | null
}

export type ContattiPage = {
  hero_tagline: string | null
  hero_titolo: string | null
  hero_descrizione: string | null
  servizi_opzioni: string[] | null
  urgenza_opzioni: string[] | null
}
