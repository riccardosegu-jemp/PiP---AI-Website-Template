"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type LinkItem = { label: string; href: string }
type Cta = { testo: string; href: string }

// Menu mobile: la hamburger apre/chiude un pannello a tendina con i link + CTA.
// È un Client Component (usa useState) perché la Navbar è un Server Component
// e non può gestire l'interattività; riceve link e CTA come props.
export function MobileMenu({ links, cta }: { links: LinkItem[]; cta: Cta }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((o) => !o)}
        className="md:hidden p-2 text-[var(--brand-navy)]"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu-panel"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--brand-border)] shadow-lg"
        >
          <nav className="flex flex-col max-w-7xl mx-auto px-6 py-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-gray-700 hover:text-[var(--brand-navy)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button
              size="sm"
              className="mt-3 self-start"
              onClick={() => setOpen(false)}
              render={<Link href={cta.href} />}
            >
              {cta.testo}
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}
