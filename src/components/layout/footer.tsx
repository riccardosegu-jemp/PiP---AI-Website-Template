import Link from "next/link"

const links = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Case Study", href: "/case-study" },
  { label: "Contatti", href: "/contatti" },
]

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie" },
]

export function Footer() {
  return (
    <footer className="w-full bg-[var(--brand-navy)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <p className="font-bold text-xl mb-3">BrandPMI</p>
            <p className="text-sm text-white/70 max-w-xs">
              Azienda specializzata in soluzioni B2B per il settore manifatturiero e dei servizi.
            </p>
          </div>

          {/* Navigazione */}
          <div>
            <p className="font-semibold text-sm mb-4 text-white/50 uppercase tracking-wider">Navigazione</p>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <p className="font-semibold text-sm mb-4 text-white/50 uppercase tracking-wider">Contatti</p>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>info@brandpmi.it</li>
              <li>+39 02 0000000</li>
              <li>Via Example 1, Milano</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} BrandPMI. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4">
            {legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
