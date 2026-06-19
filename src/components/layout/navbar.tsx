import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/layout/mobile-menu"
import { getSiteSettings } from "@/sanity/queries"
import { logo_src, logo_alt as logoAltDefault, nome_azienda as nomeDefault } from "@/lib/brand"

const links = [
  { label: "Servizi", href: "/servizi" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Case Study", href: "/case-study" },
  { label: "Contatti", href: "/contatti" },
]

const cta = {
  testo: "Richiedi Preventivo",
  href: "/contatti#form",
}

export async function Navbar() {
  const settings = await getSiteSettings()
  const logo = settings?.logo_url ?? logo_src
  const logoAlt = settings?.logo_alt || logoAltDefault
  const nome = settings?.nome_azienda ?? nomeDefault

  return (
    <header className="w-full border-b border-[var(--brand-border)] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo: icona + nome affiancati */}
        <Link href="/" className="flex items-center gap-2">
          {logo && (
            <Image
              src={logo}
              alt={logoAlt}
              width={32}
              height={32}
              className="shrink-0"
            />
          )}
          <span className="font-bold text-[var(--brand-navy)] text-lg leading-none">
            {nome}
          </span>
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-[var(--brand-navy)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex">
          <Button size="sm" render={<Link href={cta.href} />}>
            {cta.testo}
          </Button>
        </div>

        {/* Menu mobile (hamburger + pannello a tendina) */}
        <MobileMenu links={links} cta={cta} />

      </div>
    </header>
  )
}
