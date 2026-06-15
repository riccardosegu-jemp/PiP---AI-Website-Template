// Layout standalone per le landing page — non include Navbar e Footer del sito principale.
// Necessario per evitare che le pagine in /lp/* ereditino il layout di (site)/.
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
