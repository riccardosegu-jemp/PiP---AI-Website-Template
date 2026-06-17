import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

// Layout del Route Group (site): aggiunge Navbar + Footer a TUTTE le pagine
// dentro src/app/(site)/ (home, servizi, chi-siamo, contatti, case-study).
// Le landing in src/app/lp/ usano un layout separato e NON ereditano questo.
// `children` è la pagina corrente, iniettata automaticamente da Next.js.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
