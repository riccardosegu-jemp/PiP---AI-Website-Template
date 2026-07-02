import { client } from './client'
import type {
  Servizio,
  CaseStudy,
  SiteSettings,
  Homepage,
  ChiSiamo,
  ContattiPage,
  LandingProdotto,
  ServiziPageDoc,
  CaseStudyPageDoc,
} from './types'

/**
 * queries.ts — punto unico di accesso ai dati Sanity.
 * Per ogni contenuto c'è una coppia: una query GROQ (es. SERVIZI_QUERY) che
 * definisce quali campi leggere, e una funzione async tipizzata (es. getServizi)
 * che la esegue. Le pagine importano solo le funzioni get*, mai il client diretto.
 *
 * Convenzioni GROQ usate qui:
 *   "campo_url": immagine.asset->url   → dereferenzia l'asset e ne estrae l'URL
 *   coalesce(campo, "")                → fallback se il campo è vuoto/null
 */

// ISR: i dati vengono ri-letti da Sanity al massimo ogni 3600s (1h).
// L'aggiornamento immediato avviene via webhook (vedi api/revalidate).
const opts = { next: { revalidate: 3600 } }

export const SERVIZI_QUERY = `
  *[_type == "servizio"] | order(ordine asc) {
    _id,
    "slug": slug.current,
    titolo,
    icona,
    descrizione_breve,
    descrizione_completa,
    punti_chiave,
    "immagine_url": immagine.asset->url,
    "immagine_alt": coalesce(immagine.alt, ""),
    ordine,
    seo { meta_title, meta_description }
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
    ordine,
    seo { meta_title, meta_description }
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    nome_azienda,
    url_sito,
    "logo_url": logo.asset->url,
    "logo_alt": coalesce(logo.alt, ""),
    footer_descrizione,
    telefono,
    email,
    email_commerciale,
    reparto,
    indirizzo,
    citta,
    orari,
    ragione_sociale,
    piva,
    rea,
    sede_legale,
    email_pec,
    copyright,
    privacy_policy_url,
    cookie_policy_url,
    certificazioni[] { _key, titolo, ente, dal },
    colore_primario,
    colore_secondario,
    colore_accent,
    font_principale
  }
`

export const HOMEPAGE_QUERY = `
  *[_type == "homepage"][0] {
    hero_headline,
    hero_sottotitolo,
    hero_cta_primaria_testo,
    hero_cta_primaria_href,
    hero_cta_secondaria_testo,
    hero_cta_secondaria_href,
    "hero_immagine_url": hero_immagine.asset->url,
    "hero_immagine_alt": coalesce(hero_immagine.alt, ""),
    trustbar_titolo,
    "loghi_clienti": loghi_clienti[] { _key, "url": asset->url, "alt": coalesce(alt, "") },
    servizi_tagline,
    servizi_titolo,
    servizi_descrizione,
    processo_tagline,
    processo_titolo,
    processo_descrizione,
    processo[] { _key, numero, icona, titolo, descrizione },
    casi_tagline,
    casi_titolo,
    casi_descrizione,
    perche_tagline,
    perche_titolo,
    perche_descrizione,
    features[] { _key, icona, titolo, descrizione },
    stats[] { _key, valore, label, descrizione },
    contatti_tagline,
    contatti_titolo,
    contatti_descrizione,
    seo { meta_title, meta_description }
  }
`

export const CHI_SIAMO_QUERY = `
  *[_type == "chiSiamo"][0] {
    hero_headline,
    "hero_immagine_url": hero_immagine.asset->url,
    "hero_immagine_alt": coalesce(hero_immagine.alt, ""),
    storia_tagline,
    storia_titolo,
    storia_narrativa,
    timeline[] { _key, anno, testo },
    valori_tagline,
    valori_titolo,
    valori_descrizione,
    valori[] { _key, numero, titolo, descrizione },
    cert_tagline,
    cert_titolo,
    team_tagline,
    team_titolo,
    team_descrizione,
    team[] { _key, nome, ruolo, bio, "foto_url": foto.asset->url, "foto_alt": coalesce(foto.alt, "") },
    sede_tagline,
    sede_titolo,
    sede_descrizione,
    sede_punti,
    "sede_immagine_url": sede_immagine.asset->url,
    "sede_immagine_alt": coalesce(sede_immagine.alt, ""),
    contatti_tagline,
    contatti_titolo,
    contatti_descrizione,
    seo { meta_title, meta_description }
  }
`

export const CONTATTI_PAGE_QUERY = `
  *[_type == "contattiPage"][0] {
    hero_tagline,
    hero_titolo,
    hero_descrizione,
    servizi_opzioni,
    urgenza_opzioni,
    seo { meta_title, meta_description }
  }
`

export async function getServizi(): Promise<Servizio[]> {
  return client.fetch<Servizio[]>(SERVIZI_QUERY, {}, opts)
}

export async function getCaseStudy(): Promise<CaseStudy[]> {
  return client.fetch<CaseStudy[]>(CASE_STUDY_QUERY, {}, opts)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, opts)
}

export async function getHomepage(): Promise<Homepage | null> {
  return client.fetch<Homepage | null>(HOMEPAGE_QUERY, {}, opts)
}

export async function getChiSiamo(): Promise<ChiSiamo | null> {
  return client.fetch<ChiSiamo | null>(CHI_SIAMO_QUERY, {}, opts)
}

export async function getContattiPage(): Promise<ContattiPage | null> {
  return client.fetch<ContattiPage | null>(CONTATTI_PAGE_QUERY, {}, opts)
}

// Pagine /servizi e /case-study: singleton con hero (tagline/titolo/descrizione)
// e metadati SEO (le card vengono dai documenti servizio/caseStudy, vedi query sopra).
export const SERVIZI_PAGE_QUERY = `
  *[_type == "serviziPage"][0] {
    hero_tagline,
    hero_titolo,
    hero_descrizione,
    seo { meta_title, meta_description }
  }
`

export const CASE_STUDY_PAGE_QUERY = `
  *[_type == "caseStudyPage"][0] {
    hero_tagline,
    hero_titolo,
    hero_descrizione,
    seo { meta_title, meta_description }
  }
`

export async function getServiziPage(): Promise<ServiziPageDoc | null> {
  return client.fetch<ServiziPageDoc | null>(SERVIZI_PAGE_QUERY, {}, opts)
}

export async function getCaseStudyPage(): Promise<CaseStudyPageDoc | null> {
  return client.fetch<CaseStudyPageDoc | null>(CASE_STUDY_PAGE_QUERY, {}, opts)
}

export const LANDING_PRODOTTO_QUERY = `
  *[_type == "landingProdotto"][0] {
    nome_prodotto,
    "logo_url": logo.asset->url,
    "logo_alt": coalesce(logo.alt, ""),
    navbar_links[] { _key, label, href },
    navbar_cta_testo,
    navbar_cta_href,
    hero_tagline,
    "hero_immagine_url": hero_immagine.asset->url,
    "hero_immagine_alt": coalesce(hero_immagine.alt, ""),
    hero_metriche[] { _key, valore, label },
    hero_cta_primaria_testo,
    hero_cta_primaria_href,
    hero_cta_secondaria_testo,
    hero_cta_secondaria_href,
    claim_label,
    claim_testo_prima,
    claim_parola_evidenziata,
    claim_attribuzione,
    benefici_tagline,
    benefici_titolo,
    benefici_descrizione,
    benefici[] { _key, numero, titolo, descrizione },
    specifiche_tagline,
    specifiche_titolo,
    specifiche_descrizione,
    "specifiche_immagine_url": specifiche_immagine.asset->url,
    "specifiche_immagine_alt": coalesce(specifiche_immagine.alt, ""),
    specifiche_voci[] { _key, nome, valore },
    specifiche_cta_pdf_testo,
    "specifiche_cta_pdf_url": specifiche_cta_pdf_file.asset->url,
    faq_tagline,
    faq_titolo,
    faq_descrizione,
    faq[] { _key, domanda, risposta, keyword_target },
    social_label_loghi,
    "social_loghi": social_loghi[] { _key, "url": asset->url, "alt": coalesce(alt, "") },
    recensione_stelle,
    recensione_testo,
    recensione_nome,
    recensione_ruolo,
    "recensione_foto_url": recensione_foto.asset->url,
    "recensione_foto_alt": coalesce(recensione_foto.alt, ""),
    cta_label,
    cta_headline,
    cta_sottotitolo,
    cta_prezzo,
    cta_testo,
    cta_href,
    sticky_secondario_testo,
    sticky_secondario_href,
    sticky_primario_testo,
    sticky_primario_href,
    footer_nome_azienda,
    footer_piva,
    footer_copyright,
    footer_links[] { _key, label, href },
    video {
      url, titolo, descrizione, data_caricamento,
      "thumbnail_url": thumbnail.asset->url
    },
    seo { meta_title, meta_description }
  }
`

export async function getLandingProdotto(): Promise<LandingProdotto | null> {
  return client.fetch<LandingProdotto | null>(LANDING_PRODOTTO_QUERY, {}, opts)
}
