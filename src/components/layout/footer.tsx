import Image from "next/image"
import Link from "next/link"
import { getSiteSettings } from "@/sanity/queries"
import { logo_src, logo_alt as logoAltDefault, nome_azienda as nomeDefault } from "@/lib/brand"

const nav_links = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Case Study", href: "/case-study" },
  { label: "Contatti", href: "/contatti" },
]

const servizi_links = [
  { label: "Lavorazioni CNC", href: "/servizi#lavorazioni-cnc" },
  { label: "Stampaggio a Freddo", href: "/servizi#stampaggio" },
  { label: "Trattamenti Superficiali", href: "/servizi#trattamenti" },
  { label: "Controllo Qualità", href: "/servizi#controllo-qualita" },
  { label: "Prototipazione Rapida", href: "/servizi#prototipazione" },
]

const PRIVACY_FALLBACK = "https://www.iubenda.com/privacy-policy/98533713"
const COOKIE_FALLBACK = "https://www.iubenda.com/privacy-policy/98533713/cookie-policy"

export async function Footer() {
  const s = await getSiteSettings()

  const logo = s?.logo_url ?? logo_src
  const logoAlt = s?.logo_alt || logoAltDefault
  const nome = s?.nome_azienda ?? nomeDefault
  const descrizione = s?.footer_descrizione ?? ""
  const telefono = s?.telefono ?? ""
  const email = s?.email ?? ""
  const indirizzo = s?.indirizzo ?? ""
  const citta = s?.citta ?? ""
  const indirizzoCompleto = [indirizzo, citta].filter(Boolean).join(", ")
  const orari = s?.orari ?? ""
  const reparto = s?.reparto ?? ""
  const emailCommerciale = s?.email_commerciale ?? ""
  const copyright = s?.copyright ?? ""
  const piva = s?.piva ?? ""
  const rea = s?.rea ?? ""
  const privacyUrl = s?.privacy_policy_url || PRIVACY_FALLBACK
  const cookieUrl = s?.cookie_policy_url || COOKIE_FALLBACK

  return (
    <footer className="w-full bg-[var(--brand-navy)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* 4 colonne */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Colonna 1 — Logo + descrizione + icone contatto */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              {logo && (
                <Image
                  src={logo}
                  alt={logoAlt}
                  width={32}
                  height={32}
                  className="brightness-0 invert shrink-0"
                />
              )}
              <span className="font-bold text-white text-lg leading-none">{nome}</span>
            </Link>
            {descrizione && <p className="text-sm text-white/70 leading-relaxed">{descrizione}</p>}
            {/* Icone contatto */}
            <div className="flex flex-col gap-2 mt-2">
              {telefono && (
                <a
                  href={`tel:${telefono.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {telefono}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {email}
                </a>
              )}
              {indirizzoCompleto && (
                <span className="flex items-start gap-2 text-white/60 text-sm">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {indirizzoCompleto}
                </span>
              )}
            </div>
          </div>

          {/* Colonna 2 — Navigazione */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">
              Navigazione
            </p>
            <ul className="flex flex-col gap-2">
              {nav_links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-white/40">›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3 — Servizi */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">
              Servizi
            </p>
            <ul className="flex flex-col gap-2">
              {servizi_links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-white/40">›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 4 — Orari e Sede */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">
              Orari e Sede
            </p>
            <div className="flex flex-col gap-3 text-sm">
              {orari && (
                <div>
                  <p className="font-semibold text-white">{orari}</p>
                  <p className="text-white/60 text-xs mt-0.5">Orario di apertura</p>
                </div>
              )}
              {(indirizzo || citta) && (
                <div>
                  {indirizzo && <p className="text-white/70">{indirizzo}</p>}
                  {citta && <p className="text-white/70">{citta}</p>}
                </div>
              )}
              {emailCommerciale && (
                <div>
                  {reparto && <p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">{reparto}</p>}
                  <a
                    href={`mailto:${emailCommerciale}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {emailCommerciale}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            {copyright} &nbsp;·&nbsp; {piva} &nbsp;·&nbsp; {rea}
          </p>
          <div className="flex gap-6">
            <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href={cookieUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
