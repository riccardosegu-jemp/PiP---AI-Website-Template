import {
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section"
import { Button } from "@/components/ui/button"

export function SectionsDemo() {
  return (
    <div className="flex flex-col gap-8">

      {/* Header — light, left aligned */}
      <div className="rounded-[var(--radius-200)] border border-[var(--brand-border)] p-8 bg-white">
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider">Variante: default · align left</p>
        <SectionHeader align="left">
          <SectionTagline>I nostri servizi</SectionTagline>
          <SectionTitle>Soluzioni su misura per la tua PMI</SectionTitle>
          <SectionDescription>
            Progettiamo e implementiamo sistemi industriali personalizzati. Dal audit iniziale all&apos;ottimizzazione continua, ti accompagniamo in ogni fase.
          </SectionDescription>
          <div className="flex gap-3 mt-2">
            <Button size="sm">Scopri i servizi</Button>
            <Button size="sm" variant="outline">Contattaci</Button>
          </div>
        </SectionHeader>
      </div>

      {/* Header — muted, center aligned */}
      <div className="rounded-[var(--radius-200)] border border-[var(--brand-border)] p-8 bg-[var(--brand-surface)]">
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider">Variante: muted · align center</p>
        <SectionHeader align="center">
          <SectionTagline>Case Study</SectionTagline>
          <SectionTitle>Risultati concreti, clienti soddisfatti</SectionTitle>
          <SectionDescription>
            Oltre 50 aziende manifatturiere hanno già ottimizzato i propri processi grazie alle nostre soluzioni.
          </SectionDescription>
        </SectionHeader>
      </div>

      {/* Header — navy, center aligned */}
      <div className="rounded-[var(--radius-200)] p-8 bg-[var(--brand-navy)]">
        <p className="text-xs text-[var(--brand-teal-light)] mb-4 uppercase tracking-wider">Variante: navy · align center</p>
        <SectionHeader align="center">
          <SectionTagline dark>Inizia oggi</SectionTagline>
          <SectionTitle dark>Pronto a ottimizzare la tua produzione?</SectionTitle>
          <SectionDescription dark>
            Prenota una consulenza gratuita con il nostro team. Risponderemo entro 24 ore lavorative.
          </SectionDescription>
          <div className="flex gap-3 mt-2 justify-center">
            <Button variant="accent" size="sm">Prenota una call</Button>
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-[var(--brand-navy)]">
              Scopri di più
            </Button>
          </div>
        </SectionHeader>
      </div>

    </div>
  )
}
