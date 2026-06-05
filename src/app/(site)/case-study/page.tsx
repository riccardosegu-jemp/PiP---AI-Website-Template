import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
  SectionGrid,
} from "@/components/ui/section"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// ── CASE STUDY (full) ─────────────────────
// n8n: PROMPT-08
const casi = [
  {
    id: "automotive-leadtime",
    titolo: "–38% sui tempi di consegna per componente sospensioni",
    settore: "Tier-1 automotive, Torino",
    immagine_src: "/images/cs/automotive.jpg",
    immagine_alt: "Componenti meccanici per sospensioni automotive",
    metriche: [{ valore: "-38%", label: "Riduzione lead time" }, { valore: "-62%", label: "Riduzione scarti" }],
    descrizione_breve: "Un fornitore Tier-1 del settore automotive ci ha affidato la produzione di una famiglia di componenti per sospensioni, riducendo drasticamente i tempi di fornitura e il tasso di non conformità.",
    descrizione_completa: "Il cliente produceva internamente i componenti con tempi di ciclo elevati e un tasso di scarto del 4,2%. Dopo l'analisi DFM e la riprogettazione del setup di bloccaggio, abbiamo portato il lead time da 18 a 11 giorni e abbattuto gli scarti all'1,6%. Il progetto ha incluso la qualificazione PPAP livello 3 e il supporto all'auditor del cliente.",
  },
  {
    id: "medicale-tolleranze",
    titolo: "Tolleranze ±0,003 mm su strumentario chirurgico in titanio",
    settore: "Dispositivi medici, Milano",
    immagine_src: "/images/cs/medicale.jpg",
    immagine_alt: "Strumentario chirurgico in titanio lavorato CNC",
    metriche: [{ valore: "±0,003", label: "mm tolleranza media" }, { valore: "100%", label: "Conformità lotti" }],
    descrizione_breve: "Per un produttore di dispositivi medici abbiamo sviluppato un processo di lavorazione CNC dedicato in titanio grado 5, con certificazione di processo validata FDA.",
    descrizione_completa: "La sfida principale era garantire la ripetibilità della lavorazione su lotti da 50 pezzi con geometrie complesse. Abbiamo dedicato un centro a 5 assi con fixtures validate, integrato la misura in processo ogni 10 pezzi e fornito report SPC per ogni lotto. Il cliente ha ottenuto la 510(k) FDA con zero osservazioni sulle tolleranze dimensionali.",
  },
  {
    id: "energia-serie",
    titolo: "Fornitura just-in-time per 12 mesi su 80.000 pezzi/anno",
    settore: "Energie rinnovabili, Brescia",
    immagine_src: "/images/cs/energia.jpg",
    immagine_alt: "Componenti per impianti energia rinnovabile",
    metriche: [{ valore: "80k", label: "Pezzi/anno" }, { valore: "99,2%", label: "On-time delivery" }],
    descrizione_breve: "Gestione completa della fornitura annuale per un produttore di inverter industriali: programmazione, stoccaggio e consegna just-in-time con finestra di ±4 ore.",
    descrizione_completa: "Il cliente aveva difficoltà con il precedente fornitore: ritardi ricorrenti e qualità incostante. Abbiamo strutturato un programma di fornitura con kanban elettronico, buffer di sicurezza gestito da noi e consegne settimanali con finestra fissa. In 12 mesi: 99,2% OTD, zero blocchi linea, riduzione del magazzino cliente del 40%.",
  },
]

export default function CaseStudy() {
  const [primo, ...restanti] = casi

  return (
    <>
      <Section variant="muted" size="lg">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Risultati concreti</SectionTagline>
            <SectionTitle className="text-[40px] md:text-[52px]">Casi studio dai nostri clienti</SectionTitle>
            <SectionDescription>Sfide reali, numeri reali. Come abbiamo aiutato aziende manifatturiere italiane ed europee a migliorare qualità, lead time e costi di fornitura.</SectionDescription>
          </SectionHeader>
        </SectionContainer>
      </Section>

      <Section variant="default">
        <SectionContainer>
          <Card id={primo.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px] bg-[var(--brand-surface)]">
                <Image src={primo.immagine_src} alt={primo.immagine_alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              </div>
              <CardContent className="p-8 flex flex-col gap-6 justify-center">
                <p className="text-xs font-medium text-[var(--brand-teal)] uppercase tracking-widest">{primo.settore}</p>
                <h2 className="text-2xl font-bold text-[var(--brand-navy)] leading-tight">{primo.titolo}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {primo.metriche.map((m) => (
                    <div key={m.label} className="border border-[var(--brand-border)] rounded p-3 text-center">
                      <p className="text-2xl font-bold text-[var(--brand-navy)]">{m.valore}</p>
                      <p className="text-xs text-gray-500">{m.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{primo.descrizione_completa}</p>
                <div>
                  <Button render={<Link href={`/case-study#${primo.id}`} />}>Leggi il caso completo →</Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </SectionContainer>
      </Section>

      <Section variant="muted">
        <SectionContainer>
          <SectionGrid cols={2}>
            {restanti.map((c) => (
              <Card key={c.id} id={c.id} className="flex flex-col overflow-hidden">
                <div className="relative h-56 bg-[var(--brand-surface)]">
                  <Image src={c.immagine_src} alt={c.immagine_alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <CardContent className="p-6 flex flex-col gap-4 flex-1">
                  <p className="text-xs font-medium text-[var(--brand-teal)] uppercase tracking-widest">{c.settore}</p>
                  <h2 className="text-lg font-bold text-[var(--brand-navy)] leading-snug">{c.titolo}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {c.metriche.map((m) => (
                      <div key={m.label} className="border border-[var(--brand-border)] rounded p-3 text-center">
                        <p className="text-2xl font-bold text-[var(--brand-navy)]">{m.valore}</p>
                        <p className="text-xs text-gray-500">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.descrizione_completa}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" render={<Link href={`/case-study#${c.id}`} />}>Leggi il caso →</Button>
                </CardFooter>
              </Card>
            ))}
          </SectionGrid>
        </SectionContainer>
      </Section>
    </>
  )
}
