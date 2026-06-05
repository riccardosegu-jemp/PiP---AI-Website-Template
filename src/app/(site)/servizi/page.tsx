import Image from "next/image"
import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section"

// ── SERVIZI (full) ────────────────────────
// n8n: PROMPT-10
const servizi = [
  {
    id: "lavorazioni-cnc",
    titolo: "Lavorazioni CNC",
    descrizione_completa:
      "I nostri centri di lavoro a 5 assi garantiscono una precisione di ±0,005 mm su ogni pezzo, indipendentemente dalla complessità geometrica. Lavoriamo acciaio inox, alluminio, titanio e leghe speciali per clienti nei settori automotive, aerospaziale e medicale.",
    punti_chiave: [
      "Fresatura e tornitura su 5 assi simultanei",
      "Tolleranze fino a ±0,005 mm",
      "Materiali: acciaio, alluminio, titanio, leghe speciali",
      "Lotti da pezzo singolo a 50.000 unità",
    ],
    immagine_src: "/images/servizi/cnc.jpg",
    immagine_alt: "Centro di lavoro CNC a 5 assi in produzione",
  },
  {
    id: "stampaggio",
    titolo: "Stampaggio a Freddo",
    descrizione_completa:
      "Lo stampaggio a freddo ci permette di produrre componenti ad alto volume con una riduzione degli scarti fino all'85% rispetto alla lavorazione dal pieno. Ideale per bulloneria speciale, connettori, staffe e componenti strutturali in serie.",
    punti_chiave: [
      "Produzioni da 10.000 a 5.000.000 pezzi/anno",
      "Riduzione scarti fino all'85%",
      "Spessori da 0,5 a 12 mm",
      "Acciai dolci, inox e leghe di alluminio",
    ],
    immagine_src: "/images/servizi/stampaggio.jpg",
    immagine_alt: "Presse per stampaggio a freddo di componenti metallici",
  },
  {
    id: "trattamenti",
    titolo: "Trattamenti Superficiali",
    descrizione_completa:
      "Offriamo un ciclo completo di trattamenti superficiali in house, eliminando tempi e costi di terziarizzazione. Ogni trattamento è documentato con certificato di conformità e tracciabilità di lotto, fondamentali per le forniture OEM.",
    punti_chiave: [
      "Nichelatura chimica ed elettrolitica",
      "Zincatura a caldo e a freddo",
      "Ossidazione anodica e dura per alluminio",
      "Verniciatura a polvere RAL/NCS",
    ],
    immagine_src: "/images/servizi/trattamenti.jpg",
    immagine_alt: "Vasca di trattamento superficiale nichelatura",
  },
  {
    id: "controllo-qualita",
    titolo: "Controllo Qualità",
    descrizione_completa:
      "Il nostro laboratorio metrologico è dotato di macchine CMM di ultima generazione e strumenti di misura calibrati con tracciabilità ACCREDIA. Ogni lotto è accompagnato da report dimensionale completo e, su richiesta, da analisi metallografica.",
    punti_chiave: [
      "CMM Zeiss Contura a braccio fisso",
      "Report di conformità per ogni lotto",
      "Certificazione ISO 9001:2015 attiva",
      "Prima parte, in processo e finale",
    ],
    immagine_src: "/images/servizi/qualita.jpg",
    immagine_alt: "Operatore al controllo qualità con macchina CMM",
  },
  {
    id: "prototipazione",
    titolo: "Prototipazione Rapida",
    descrizione_completa:
      "Dal file CAD al prototipo funzionale in 5 giorni lavorativi. Il nostro team di ingegneri analizza la fattibilità produttiva, suggerisce ottimizzazioni DFM e affianca il cliente fino alla validazione finale del pezzo.",
    punti_chiave: [
      "Consegna prototipo in 5 giorni lavorativi",
      "Analisi DFM inclusa",
      "Supporto ingegneristico dedicato",
      "Passaggio diretto alla produzione in serie",
    ],
    immagine_src: "/images/servizi/prototipazione.jpg",
    immagine_alt: "Tecnico che analizza prototipo su tavolo di lavoro",
  },
  {
    id: "logistica",
    titolo: "Logistica e Consegna",
    descrizione_completa:
      "Gestiamo il magazzino prodotti finiti con sistema WMS proprietario, garantendo consegne just-in-time con finestre di ±2 ore. Imballaggi personalizzati su specifica cliente, etichettatura VDA e consegna diretta in linea di montaggio.",
    punti_chiave: [
      "Consegne just-in-time con finestra ±2 ore",
      "Imballaggi su specifica cliente e VDA",
      "Copertura Italia ed Europa",
      "Tracciabilità spedizione in tempo reale",
    ],
    immagine_src: "/images/servizi/logistica.jpg",
    immagine_alt: "Magazzino prodotti finiti con scaffalature e muletti",
  },
]

export default function Servizi() {
  return (
    <>
      <Section variant="muted" size="lg">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Capacità produttiva</SectionTagline>
            <SectionTitle className="text-[40px] md:text-[52px]">
              Lavorazioni e servizi per l&apos;industria
            </SectionTitle>
            <SectionDescription>
              Una filiera produttiva completa — dalla prototipazione al trattamento
              superficiale — con qualità certificata ISO 9001 e consegne puntuali in
              tutta Europa.
            </SectionDescription>
          </SectionHeader>
        </SectionContainer>
      </Section>

      {servizi.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className="py-16 border-b border-[var(--brand-border)]"
          style={{ background: i % 2 === 0 ? "white" : "var(--brand-surface)" }}
        >
          <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--brand-border)]">
              <Image src={s.immagine_src} alt={s.immagine_alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--brand-navy)] leading-tight">{s.titolo}</h2>
              <p className="text-gray-600 leading-relaxed">{s.descrizione_completa}</p>
              <ul className="flex flex-col gap-2">
                {s.punti_chiave.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[var(--brand-teal)] font-bold shrink-0">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
