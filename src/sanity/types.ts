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
  url_sito: string | null
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
  colore_primario: string | null
  colore_secondario: string | null
  colore_accent: string | null
  font_principale: string | null
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

// SEO: campi opzionali per title/description. Se null, le pagine usano i default
// di src/lib/seo.ts. SeoDoc è il wrapper per i singleton serviziPage/caseStudyPage.
export type Seo = {
  meta_title: string | null
  meta_description: string | null
}

export type SeoDoc = {
  seo: Seo | null
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
  seo: Seo | null
}

export type TimelineItem = {
  _key: string
  anno: string | null
  testo: string | null
}

export type Valore = {
  _key: string
  numero: number | null
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
  seo: Seo | null
}

export type ContattiPage = {
  hero_tagline: string | null
  hero_titolo: string | null
  hero_descrizione: string | null
  servizi_opzioni: string[] | null
  urgenza_opzioni: string[] | null
  seo: Seo | null
}

export type LinkItem = {
  _key: string
  label: string | null
  href: string | null
}

export type HeroMetrica = {
  _key: string
  valore: string | null
  label: string | null
}

export type Beneficio = {
  _key: string
  numero: number | null
  titolo: string | null
  descrizione: string | null
}

export type SpecVoce = {
  _key: string
  nome: string | null
  valore: string | null
}

export type FaqItem = {
  _key: string
  domanda: string | null
  risposta: string | null
  keyword_target: string | null
}

export type LpVideo = {
  url: string | null
  titolo: string | null
  descrizione: string | null
  data_caricamento: string | null
  thumbnail_url: string | null
}

export type LandingProdotto = {
  nome_prodotto: string | null
  logo_url: string | null
  logo_alt: string
  navbar_links: LinkItem[] | null
  navbar_cta_testo: string | null
  navbar_cta_href: string | null
  hero_tagline: string | null
  hero_immagine_url: string | null
  hero_immagine_alt: string
  hero_metriche: HeroMetrica[] | null
  hero_cta_primaria_testo: string | null
  hero_cta_primaria_href: string | null
  hero_cta_secondaria_testo: string | null
  hero_cta_secondaria_href: string | null
  claim_label: string | null
  claim_testo_prima: string | null
  claim_parola_evidenziata: string | null
  claim_attribuzione: string | null
  benefici_tagline: string | null
  benefici_titolo: string | null
  benefici_descrizione: string | null
  benefici: Beneficio[] | null
  specifiche_tagline: string | null
  specifiche_titolo: string | null
  specifiche_descrizione: string | null
  specifiche_immagine_url: string | null
  specifiche_immagine_alt: string
  specifiche_voci: SpecVoce[] | null
  specifiche_cta_pdf_testo: string | null
  specifiche_cta_pdf_url: string | null
  faq_tagline: string | null
  faq_titolo: string | null
  faq_descrizione: string | null
  faq: FaqItem[] | null
  social_label_loghi: string | null
  social_loghi: Logo[] | null
  recensione_stelle: number | null
  recensione_testo: string | null
  recensione_nome: string | null
  recensione_ruolo: string | null
  recensione_foto_url: string | null
  recensione_foto_alt: string
  cta_label: string | null
  cta_headline: string | null
  cta_sottotitolo: string | null
  cta_prezzo: string | null
  cta_testo: string | null
  cta_href: string | null
  sticky_secondario_testo: string | null
  sticky_secondario_href: string | null
  sticky_primario_testo: string | null
  sticky_primario_href: string | null
  footer_nome_azienda: string | null
  footer_piva: string | null
  footer_copyright: string | null
  footer_links: LinkItem[] | null
  video: LpVideo | null
  seo: Seo | null
}
