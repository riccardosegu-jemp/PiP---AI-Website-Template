import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logo_src, logo_alt, nome_azienda } from "@/lib/brand"

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

export function Navbar() {
  return (
    <header className="w-full border-b border-[var(--brand-border)] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo: icona + nome affiancati */}
        <Link href="/" className="flex items-center gap-2">
          {logo_src && (
            <Image
              src={logo_src}
              alt={logo_alt}
              width={32}
              height={32}
              className="shrink-0"
            />
          )}
          <span className="font-bold text-[var(--brand-navy)] text-lg leading-none">
            {nome_azienda}
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

        {/* Hamburger mobile */}
        <button
          type="button"
          aria-label="Apri menu"
          className="md:hidden p-2 text-[var(--brand-navy)]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M3 5h14M3 10h14M3 15h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

      </div>
    </header>
  )
}
