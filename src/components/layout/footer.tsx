import Image from "next/image"
import Link from "next/link"

// n8n: aggiorna con i dati del cliente
const logo_src = "/logo.svg"
const logo_alt = "Logo"
const nome_azienda = "BrandPMI"
const descrizione =
  "Lavorazioni meccaniche di precisione dal 1989. CNC, stampaggio, trattamenti superficiali e controllo qualità per l'industria italiana ed europea."

const contatti = {
  telefono: "+39 030 123 4567",
  email: "info@brandpmi.it",
  indirizzo: "Via dell'Industria 12, 25030 Castel Mella (BS)",
}

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

const sede = {
  orari: "Lun–Ven 8:00–18:00",
  reparto: "Ufficio commerciale",
  indirizzo: "Via dell'Industria 12",
  citta: "25030 Castel Mella (BS)",
  email_commerciale: "commerciale@brandpmi.it",
}

const legale = {
  piva: "P.IVA 01234567890",
  rea: "REA BS-123456",
  copyright: "© BrandPMI S.p.A. Tutti i diritti riservati.",
}

export function Footer() {
  return (
    <footer className="w-full bg-[var(--brand-navy)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* 4 colonne */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Colonna 1 — Logo + descrizione + icone contatto */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              {logo_src && (
                <Image
                  src={logo_src}
                  alt={logo_alt}
                  width={32}
                  height={32}
                  className="brightness-0 invert shrink-0"
                />
              )}
              <span className="font-bold text-white text-lg leading-none">{nome_azienda}</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">{descrizione}</p>
            {/* Icone contatto */}
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={`tel:${contatti.telefono.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {contatti.telefono}
              </a>
              <a
                href={`mailto:${contatti.email}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {contatti.email}
              </a>
              <span className="flex items-start gap-2 text-white/60 text-sm">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {contatti.indirizzo}
              </span>
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
              <div>
                <p className="font-semibold text-white">{sede.orari}</p>
                <p className="text-white/60 text-xs mt-0.5">Orario di apertura</p>
              </div>
              <div>
                <p className="text-white/70">{sede.indirizzo}</p>
                <p className="text-white/70">{sede.citta}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">{sede.reparto}</p>
                <a
                  href={`mailto:${sede.email_commerciale}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {sede.email_commerciale}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            {legale.copyright} &nbsp;·&nbsp; {legale.piva} &nbsp;·&nbsp; {legale.rea}
          </p>
          <div className="flex gap-6">
            <a href="https://www.iubenda.com/privacy-policy/98533713" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="https://www.iubenda.com/privacy-policy/98533713/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
