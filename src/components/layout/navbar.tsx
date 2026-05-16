import Link from "next/link"
import { Button } from "@/components/ui/button"

const links = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Case Study", href: "/case-study" },
  { label: "Contatti", href: "/contatti" },
]

export function Navbar() {
  return (
    <header className="w-full border-b border-[var(--brand-border)] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-[var(--brand-navy)] font-bold text-xl tracking-tight">
          BrandPMI
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--foreground)] hover:text-[var(--brand-navy)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm">Accedi</Button>
          <Button size="sm">Contattaci</Button>
        </div>

        {/* Mobile menu placeholder */}
        <button className="md:hidden p-2 text-[var(--brand-navy)]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

      </div>
    </header>
  )
}
