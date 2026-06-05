import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageSquare, Paperclip, Wrench, CheckCircle2, Truck, Settings2, Layers, Shield, ClipboardCheck, Drill, PackageCheck, Target, User, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactFormPreview } from "@/components/contact-form-preview"
import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
  SectionGrid,
} from "@/components/ui/section"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

// ── HERO ─────────────────────────────────
// n8n: PROMPT-06
const hero = {
  headline: "Precisione industriale. Consegne puntuali. Zero compromessi.",
  sottotitolo:
    "Produciamo componenti meccanici di precisione per l'industria italiana ed europea. Dalla prototipazione alla serie, con standard qualità ISO 9001.",
  cta_primaria_testo: "Richiedi un preventivo",
  cta_primaria_href: "/contatti",
  cta_secondaria_testo: "Scopri la produzione",
  cta_secondaria_href: "/servizi",
  immagine_src: "/hero.jpg",
  immagine_alt: "Impianto di produzione industriale con macchinari CNC",
}

// ── TRUST BAR ────────────────────────────
// n8n: PROMPT-08
const loghi_clienti = [
  { id: "cliente-1", src: "/loghi/cliente-1.svg", alt: "Cliente 1" },
  { id: "cliente-2", src: "/loghi/cliente-2.svg", alt: "Cliente 2" },
  { id: "cliente-3", src: "/loghi/cliente-3.svg", alt: "Cliente 3" },
  { id: "cliente-4", src: "/loghi/cliente-4.svg", alt: "Cliente 4" },
  { id: "cliente-5", src: "/loghi/cliente-5.svg", alt: "Cliente 5" },
]

// ── SERVIZI (preview) ─────────────────────
// n8n: PROMPT-10
const servizi = [
  {
    id: "lavorazioni-cnc",
    icona_id: "settings2",
    titolo: "Lavorazioni CNC",
    descrizione_breve:
      "Fresatura e tornitura su 5 assi per componenti di alta precisione in acciaio, alluminio e leghe speciali.",
    href: "/servizi#lavorazioni-cnc",
  },
  {
    id: "stampaggio",
    icona_id: "layers",
    titolo: "Stampaggio a Freddo",
    descrizione_breve:
      "Produzioni in serie ad alto volume con tolleranze strette e costi per pezzo ottimizzati.",
    href: "/servizi#stampaggio",
  },
  {
    id: "trattamenti",
    icona_id: "shield",
    titolo: "Trattamenti Superficiali",
    descrizione_breve:
      "Nichelatura, zincatura, ossidazione e verniciatura a polvere per massima resistenza alla corrosione.",
    href: "/servizi#trattamenti",
  },
  {
    id: "controllo-qualita",
    icona_id: "clipboard-check",
    titolo: "Controllo Qualità",
    descrizione_breve:
      "Misurazione CMM, report di conformità e certificazione ISO 9001 per ogni lotto di produzione.",
    href: "/servizi#controllo-qualita",
  },
  {
    id: "prototipazione",
    icona_id: "drill",
    titolo: "Prototipazione Rapida",
    descrizione_breve:
      "Dal disegno CAD al prototipo funzionale in 5 giorni lavorativi, con supporto tecnico dedicato.",
    href: "/servizi#prototipazione",
  },
  {
    id: "logistica",
    icona_id: "package-check",
    titolo: "Logistica e Consegna",
    descrizione_breve:
      "Gestione magazzino, imballaggio su specifica e consegna just-in-time in tutta Europa.",
    href: "/servizi#logistica",
  },
]

const serviziIcone: Record<string, React.ReactNode> = {
  "settings2":       <Settings2 className="w-6 h-6" />,
  "layers":          <Layers className="w-6 h-6" />,
  "shield":          <Shield className="w-6 h-6" />,
  "clipboard-check": <ClipboardCheck className="w-6 h-6" />,
  "drill":           <Drill className="w-6 h-6" />,
  "package-check":   <PackageCheck className="w-6 h-6" />,
}

// ── PROCESSO ─────────────────────────────
// n8n: PROMPT-07
const processo = [
  {
    id: "richiesta",
    numero: 1,
    icona_id: "message-square",
    titolo: "Richiesta e analisi",
    descrizione:
      "Ci invii il disegno tecnico o descrivi il progetto. Rispondiamo entro 24 ore lavorative con una prima valutazione di fattibilità.",
  },
  {
    id: "preventivo",
    numero: 2,
    icona_id: "paperclip",
    titolo: "Preventivo dettagliato",
    descrizione:
      "Ricevi un preventivo trasparente con tempi, quantità minima, costi unitari e note tecniche. Nessuna sorpresa in fattura.",
  },
  {
    id: "produzione",
    numero: 3,
    icona_id: "wrench",
    titolo: "Messa in produzione",
    descrizione:
      "Confermato l'ordine, il tuo referente apre la commessa e ti tiene aggiornato su avanzamento e milestone.",
  },
  {
    id: "controllo",
    numero: 4,
    icona_id: "check-circle-2",
    titolo: "Controllo qualità",
    descrizione:
      "Ogni lotto supera il controllo dimensionale CMM e il collaudo visivo prima di essere rilasciato con report di conformità.",
  },
  {
    id: "consegna",
    numero: 5,
    icona_id: "truck",
    titolo: "Consegna puntuale",
    descrizione:
      "Spedizione nella data concordata, con tracciatura in tempo reale e documentazione di trasporto completa.",
  },
]

const processoIcone: Record<string, React.ReactNode> = {
  "message-square": <MessageSquare className="w-7 h-7" />,
  "paperclip":      <Paperclip className="w-7 h-7" />,
  "wrench":         <Wrench className="w-7 h-7" />,
  "check-circle-2": <CheckCircle2 className="w-7 h-7" />,
  "truck":          <Truck className="w-7 h-7" />,
}

// ── CASE STUDY (preview) ─────────────────
// n8n: PROMPT-08
const casi = [
  {
    id: "automotive-leadtime",
    titolo: "–38% sui tempi di consegna per componente sospensioni",
    settore: "Tier-1 automotive, Torino",
    immagine_src: "/images/cs/automotive.jpg",
    immagine_alt: "Componenti meccanici per sospensioni automotive",
    metriche: [
      { valore: "-38%", label: "Riduzione lead time" },
      { valore: "-62%", label: "Riduzione scarti" },
    ],
    descrizione_breve:
      "Un fornitore Tier-1 del settore automotive ci ha affidato la produzione di una famiglia di componenti per sospensioni, riducendo drasticamente i tempi di fornitura e il tasso di non conformità.",
  },
  {
    id: "medicale-tolleranze",
    titolo: "Tolleranze ±0,003 mm su strumentario chirurgico in titanio",
    settore: "Dispositivi medici, Milano",
    immagine_src: "/images/cs/medicale.jpg",
    immagine_alt: "Strumentario chirurgico in titanio lavorato CNC",
    metriche: [
      { valore: "±0,003", label: "mm tolleranza media" },
      { valore: "100%", label: "Conformità lotti" },
    ],
    descrizione_breve:
      "Per un produttore di dispositivi medici abbiamo sviluppato un processo di lavorazione CNC dedicato in titanio grado 5, con certificazione di processo validata FDA.",
  },
  {
    id: "energia-serie",
    titolo: "Fornitura just-in-time per 12 mesi su 80.000 pezzi/anno",
    settore: "Energie rinnovabili, Brescia",
    immagine_src: "/images/cs/energia.jpg",
    immagine_alt: "Componenti per impianti energia rinnovabile",
    metriche: [
      { valore: "80k", label: "Pezzi/anno" },
      { valore: "99,2%", label: "On-time delivery" },
    ],
    descrizione_breve:
      "Gestione completa della fornitura annuale per un produttore di inverter industriali: programmazione, stoccaggio e consegna just-in-time con finestra di ±4 ore.",
  },
]

// ── PERCHÉ SCEGLIERCI ────────────────────
// n8n: PROMPT-07
const features = [
  {
    id: "consegne",
    icona_id: "target",
    titolo: "Consegne rispettate al 94%",
    descrizione:
      "Monitoriamo ogni commessa con OTD settimanale. In caso di rischio ritardo, avvisiamo proattivamente con piano di recupero.",
  },
  {
    id: "referente",
    icona_id: "user",
    titolo: "Referente unico dedicato",
    descrizione:
      "Niente call center. Ogni cliente ha un nome e un numero diretto: il tuo project manager risponde entro 2 ore lavorative.",
  },
  {
    id: "qualita",
    icona_id: "check-circle-2",
    titolo: "Qualità certificata ISO 9001",
    descrizione:
      "Sistema qualità attivo dal 2009, con audit annuale Bureau Veritas. Ogni lotto ha report CMM allegato alla bolla.",
  },
  {
    id: "flessibilita",
    icona_id: "refresh-cw",
    titolo: "Flessibilità lotti e urgenze",
    descrizione:
      "Gestiamo commesse da 1 a 500.000 pezzi. Canale prioritario per urgenze con risposta in 4 ore e produzione entro 5 giorni.",
  },
]

const featuresIcone: Record<string, React.ReactNode> = {
  "target":         <Target className="w-5 h-5" />,
  "user":           <User className="w-5 h-5" />,
  "check-circle-2": <CheckCircle2 className="w-5 h-5" />,
  "refresh-cw":     <RefreshCw className="w-5 h-5" />,
}

const stats = [
  { id: "anni", valore: "35", label: "anni di attività", descrizione: "In attività dal 1989" },
  { id: "clienti", valore: "320+", label: "clienti attivi", descrizione: "In tutta Europa" },
  { id: "pezzi", valore: "2M+", label: "pezzi/anno", descrizione: "Produzione annua" },
  { id: "otd", valore: "94%", label: "on-time delivery", descrizione: "Media ultimi 12 mesi" },
]

// ── CONTATTI (preview) ───────────────────
// n8n: PROMPT-14
const contatti = {
  telefono: "+39 030 123 4567",
  email: "info@brandpmi.it",
  indirizzo: "Via dell'Industria 12, 25030 Castel Mella (BS)",
  orari: "Lun–Ven 8:00–18:00",
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[75vh] flex items-end">
        <Image src={hero.immagine_src} alt={hero.immagine_alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[var(--brand-navy)]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 text-white w-full">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-6 leading-tight">{hero.headline}</h1>
          <p className="text-white/80 text-xl max-w-2xl mb-10 leading-relaxed">{hero.sottotitolo}</p>
          <div className="flex flex-wrap gap-4">
            <Button render={<Link href={hero.cta_primaria_href} />}>{hero.cta_primaria_testo}</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--brand-navy)]" render={<Link href={hero.cta_secondaria_href} />}>{hero.cta_secondaria_testo}</Button>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-8 border-y border-[var(--brand-border)] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-center text-gray-400 uppercase tracking-widest mb-6">Di fiducia per i nostri clienti</p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {loghi_clienti.map((l) => (
              <div key={l.id} className="relative w-[120px] h-[40px]">
                <Image src={l.src} alt={l.alt} fill className="object-contain grayscale opacity-50 hover:opacity-80 transition-opacity" sizes="120px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIZI PREVIEW ── */}
      <Section variant="default">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Cosa facciamo</SectionTagline>
            <SectionTitle>Lavorazioni e servizi per l&apos;industria</SectionTitle>
            <SectionDescription>Dalla fresatura CNC alla consegna finale: una filiera completa sotto un unico tetto, con qualità certificata e tempi garantiti.</SectionDescription>
          </SectionHeader>
          <SectionGrid cols={3}>
            {servizi.map((s) => (
              <Card key={s.id} className="flex flex-col">
                <CardHeader>
                  <div className="text-[var(--brand-navy)] mb-2">
                    {serviziIcone[s.icona_id]}
                  </div>
                  <CardTitle>{s.titolo}</CardTitle>
                  <CardDescription>{s.descrizione_breve}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button variant="link" render={<Link href={s.href} />}>Scopri →</Button>
                </CardFooter>
              </Card>
            ))}
          </SectionGrid>
          <div className="flex justify-center mt-12">
            <Button variant="outline" render={<Link href="/servizi" />}>Vedi tutti i servizi →</Button>
          </div>
        </SectionContainer>
      </Section>

      {/* ── PROCESSO ── */}
      <Section variant="muted">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Come lavoriamo</SectionTagline>
            <SectionTitle>Un processo chiaro, nessuna sorpresa</SectionTitle>
            <SectionDescription>Dalla richiesta alla consegna: cinque passaggi definiti, tracciati e comunicati in tempo reale al cliente.</SectionDescription>
          </SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {processo.map((step) => (
              <Card key={step.id}>
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="text-[var(--brand-navy)] mb-1">
                    {processoIcone[step.icona_id]}
                  </div>
                  <h3 className="font-bold text-[var(--brand-navy)]">
                    {step.numero}. {step.titolo}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.descrizione}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </Section>

      {/* ── CASE STUDY PREVIEW ── */}
      <Section variant="default">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Risultati concreti</SectionTagline>
            <SectionTitle>Casi studio dai nostri clienti</SectionTitle>
            <SectionDescription>Numeri reali, sfide reali. Scopri come abbiamo aiutato aziende come la tua a migliorare qualità, tempi e costi di produzione.</SectionDescription>
          </SectionHeader>
          <SectionGrid cols={3}>
            {casi.map((c) => (
              <Card key={c.id} className="flex flex-col overflow-hidden">
                <div className="relative h-48 w-full bg-[var(--brand-surface)] shrink-0">
                  <Image src={c.immagine_src} alt={c.immagine_alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <CardHeader>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {c.metriche.map((m) => (
                      <div key={m.label} className="border border-[var(--brand-border)] rounded p-2 text-center">
                        <p className="text-lg font-bold text-[var(--brand-navy)]">{m.valore}</p>
                        <p className="text-xs text-gray-500">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--brand-teal)] font-medium">{c.settore}</p>
                  <CardTitle className="text-sm leading-snug">{c.titolo}</CardTitle>
                  <CardDescription>{c.descrizione_breve}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button variant="link" render={<Link href={`/case-study#${c.id}`} />}>Leggi il caso →</Button>
                </CardFooter>
              </Card>
            ))}
          </SectionGrid>
          <div className="flex justify-center mt-12">
            <Button variant="outline" render={<Link href="/case-study" />}>Vedi tutti i casi studio →</Button>
          </div>
        </SectionContainer>
      </Section>

      {/* ── PERCHÉ SCEGLIERCI ── */}
      <Section variant="muted">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader>
                <SectionTagline>Perché sceglierci</SectionTagline>
                <SectionTitle>Quattro impegni che manteniamo ogni giorno</SectionTitle>
                <SectionDescription>Non chiediamo fiducia a parole. La costruiamo con dati, processi e persone che rispondono davvero.</SectionDescription>
              </SectionHeader>
              <div className="flex flex-col gap-6 mt-2">
                {features.map((f) => (
                  <div key={f.id} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--brand-navy)] border border-[var(--brand-border)]">
                      {featuresIcone[f.icona_id]}
                    </span>
                    <div>
                      <h3 className="font-semibold text-[var(--brand-navy)] mb-1">{f.titolo}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{f.descrizione}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <Card key={s.id}>
                  <CardContent className="p-6 text-center">
                    <p className="text-5xl font-bold text-[var(--brand-navy)]">{s.valore}</p>
                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                    {s.descrizione && <p className="text-xs text-gray-400 mt-1">{s.descrizione}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* ── CONTATTI PREVIEW ── */}
      <Section variant="default">
        <SectionContainer>
          <div id="form" className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <SectionHeader>
                <SectionTagline>Contattaci</SectionTagline>
                <SectionTitle>Parliamo del tuo progetto</SectionTitle>
                <SectionDescription>Inviaci il disegno tecnico o descrivici la necessità: riceverai una risposta entro 24 ore lavorative.</SectionDescription>
              </SectionHeader>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  {contatti.telefono}
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  {contatti.email}
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  {contatti.indirizzo}
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {contatti.orari}
                </li>
              </ul>
            </div>
            <ContactFormPreview />
          </div>
        </SectionContainer>
      </Section>
    </>
  )
}
