"use client"

import { useEffect, useState } from "react"
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

// ── NAVBAR LP ────────────────────────────
// n8n: aggiorna con dati prodotto
const navbar_lp = {
  logo_src: "/logo.svg",
  logo_alt: "Logo BrandPMI",
  nome_prodotto: "Rapid5",
  links: [
    { label: "Vantaggi", href: "#benefici" },
    { label: "Capacità", href: "#specifiche" },
    { label: "FAQ", href: "#faq" },
    { label: "Clienti", href: "#recensioni" },
  ],
  cta: { testo: "Richiedi il preventivo", href: "#cta" },
}

// ── HERO LP ──────────────────────────────
// n8n: PROMPT-06
const hero_lp = {
  nome_prodotto: "Rapid5",
  tagline: "Il tuo prototipo funzionale in 5 giorni lavorativi. Certificato, documentato, pronto per la validazione.",
  immagine_src: "/images/lp/rapid5-componente.jpg",
  immagine_alt: "Componente meccanico di precisione lavorato CNC su piano di misura",
  metriche: [
    { valore: "5 gg", label: "Consegna garantita" },
    { valore: "±0,005", label: "mm tolleranza" },
    { valore: "ISO 9001", label: "Qualità certificata" },
  ],
  cta_primaria: { testo: "Richiedi il preventivo →", href: "#cta" },
  cta_secondaria: { testo: "Scopri le capacità", href: "#benefici" },
}

// ── CLAIM ────────────────────────────────
// n8n: PROMPT-06
const claim = {
  label: "Il nostro impegno",
  testo_prima: "Un prototipo bloccato in attesa è un progetto fermo.",
  parola_evidenziata: "Con Rapid5 non aspetti.",
  attribuzione: "— Giorgio Ferri, Fondatore BrandPMI",
}

// ── BENEFICI ─────────────────────────────
// n8n: PROMPT-07
const benefici = [
  {
    id: "tempi",
    numero: 1,
    titolo: "5 giorni garantiti",
    descrizione:
      "Dal file CAD al pezzo fisico in 5 giorni lavorativi. Se sforerai il termine, ti avvisiamo prima e concordiamo una soluzione.",
  },
  {
    id: "materiali",
    numero: 2,
    titolo: "Tutti i materiali tecnici",
    descrizione:
      "Acciaio inox, alluminio, titanio, ottone, leghe speciali. Selezioniamo il materiale ottimale per le tue specifiche e il tuo budget.",
  },
  {
    id: "tolleranze",
    numero: 3,
    titolo: "Tolleranze da ±0,005 mm",
    descrizione:
      "Lavorazioni su centri a 5 assi con misura in processo. Ogni pezzo esce con report CMM allegato e certificato di conformità.",
  },
  {
    id: "dfm",
    numero: 4,
    titolo: "Analisi DFM inclusa",
    descrizione:
      "Il nostro team analizza il tuo disegno prima di avviare la produzione. Segnaliamo criticità e ottimizzazioni senza costi aggiuntivi.",
  },
  {
    id: "scalabilita",
    numero: 5,
    titolo: "Da prototipo a serie",
    descrizione:
      "Il processo validato sul prototipo diventa direttamente il setup per la produzione in serie. Zero rilavorazioni, zero rilanci.",
  },
  {
    id: "documentazione",
    numero: 6,
    titolo: "Documentazione completa",
    descrizione:
      "Report dimensionale CMM, certificati materiali, prima parte firmata. Tutto pronto per la tua validazione interna o cliente finale.",
  },
]

// ── SPECIFICHE ───────────────────────────
// n8n: PROMPT-10
const specifiche = {
  tagline: "Capacità produttiva",
  titolo: "Cosa possiamo lavorare con Rapid5.",
  descrizione:
    "Un servizio dedicato alla prototipazione veloce, con le stesse macchine e gli stessi standard qualitativi della produzione in serie.",
  immagine_src: "/images/lp/rapid5-cnc.jpg",
  immagine_alt: "Centro di lavoro CNC a 5 assi durante lavorazione pezzo in titanio",
  voci: [
    { nome: "Tipologia lavorazione", valore: "Fresatura e tornitura CNC" },
    { nome: "N. assi", valore: "3, 4 e 5 assi simultanei" },
    { nome: "Tolleranza standard", valore: "±0,01 mm" },
    { nome: "Tolleranza fine", valore: "fino a ±0,005 mm" },
    { nome: "Materiali", valore: "Acciaio, inox, alluminio, titanio, ottone" },
    { nome: "Dimensione max pezzo", valore: "600 × 500 × 400 mm" },
    { nome: "Quantità", valore: "da 1 pezzo a 50 pezzi" },
    { nome: "Consegna", valore: "5 giorni lavorativi garantiti" },
    { nome: "Report CMM", valore: "Incluso in ogni consegna" },
    { nome: "Certificazione", valore: "ISO 9001:2015 — Bureau Veritas" },
  ],
  cta_pdf: {
    testo: "Scarica la scheda servizio completa (PDF)",
    href: "/docs/rapid5-scheda-servizio.pdf",
  },
}

// ── FAQ ──────────────────────────────────
// n8n: PROMPT-15
const faq = [
  {
    id: "come-inviare",
    domanda: "Come invio il disegno tecnico per richiedere un preventivo?",
    risposta:
      "Puoi inviarci il file CAD (STEP, IGES, DXF) o il disegno tecnico in PDF tramite il form in fondo a questa pagina. Riceverai una prima valutazione di fattibilità entro 4 ore lavorative e il preventivo completo entro 24 ore.",
  },
  {
    id: "materiali-disponibili",
    domanda: "Quali materiali posso richiedere per la prototipazione?",
    risposta:
      "Lavoriamo acciaio al carbonio, acciaio inox (304, 316, 17-4PH), alluminio (6061, 7075, 2024), titanio grado 2 e 5, ottone, rame e leghe speciali su richiesta. Se hai dubbi sul materiale più adatto, il nostro ufficio tecnico ti supporta nella scelta.",
  },
  {
    id: "garanzia-5-giorni",
    domanda: "Cosa succede se i 5 giorni non vengono rispettati?",
    risposta:
      "Se per qualsiasi motivo prevediamo di non rispettare la data di consegna, ti avvisiamo con almeno 24 ore di anticipo e concordiamo insieme la soluzione — sia essa una consegna parziale, una prioritizzazione o uno sconto sulla commessa.",
  },
  {
    id: "trattamenti",
    domanda: "È possibile richiedere trattamenti superficiali sul prototipo?",
    risposta:
      "Sì. Offriamo nichelatura chimica, ossidazione anodica per alluminio, zincatura e verniciatura a polvere direttamente in house. I tempi di trattamento possono aggiungere 1-2 giorni alla consegna standard.",
  },
  {
    id: "passaggio-serie",
    domanda: "Come funziona il passaggio da prototipo a produzione in serie?",
    risposta:
      "Il processo e il setup validati sul prototipo vengono conservati e utilizzati direttamente per la produzione in serie. Non c'è bisogno di riqualificare il processo: ottieni un preventivo serie entro 48 ore dalla tua approvazione del prototipo.",
  },
]

// ── SOCIAL PROOF ─────────────────────────
// n8n: PROMPT-08
const social_proof = {
  label_loghi: "Hanno già scelto Rapid5",
  loghi: [
    { id: "cliente-1", src: "/loghi/cliente-1.svg", alt: "Cliente Tier-1 Automotive" },
    { id: "cliente-2", src: "/loghi/cliente-2.svg", alt: "Cliente Dispositivi Medici" },
    { id: "cliente-3", src: "/loghi/cliente-3.svg", alt: "Cliente Energia Rinnovabile" },
    { id: "cliente-4", src: "/loghi/cliente-4.svg", alt: "Cliente Macchine Utensili" },
  ],
  recensione: {
    stelle: 5,
    testo:
      "Avevamo un problema di geometria complessa con scadenza cliente. BrandPMI ci ha consegnato il prototipo in 4 giorni con report CMM completo. Qualità impeccabile, zero sorprese.",
    nome: "Davide Cattaneo",
    ruolo: "Responsabile R&D, Tier-1 Automotive — Torino",
    foto_src: "/images/recensori/davide.jpg",
    foto_alt: "Davide Cattaneo",
  },
}

// ── CTA FINALE ───────────────────────────
// n8n: PROMPT-06
const cta_finale = {
  label: "Inizia oggi",
  headline: "Il tuo prototipo in 5 giorni.",
  sottotitolo:
    "Inviaci il disegno tecnico. Preventivo in 24 ore, consegna garantita in 5 giorni lavorativi.",
  prezzo: "Preventivo gratuito",
  cta_testo: "Richiedi il preventivo Rapid5 →",
  cta_href: "/contatti#form",
  sticky: {
    secondario_testo: "Hai domande?",
    secondario_href: "#faq",
    primario_testo: "Richiedi preventivo →",
    primario_href: "/contatti#form",
  },
}

// ── FOOTER LP ────────────────────────────
// n8n: aggiorna con dati cliente
const footer_lp = {
  logo_src: "/logo.svg",
  logo_alt: "Logo BrandPMI",
  nome_azienda: "BrandPMI S.p.A.",
  piva: "P.IVA 01234567890",
  copyright: "© BrandPMI S.p.A.",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookie" },
    { label: "Torna al sito", href: "/" },
  ],
}

// Previene SSR dell'Accordion Base UI (usa --accordion-panel-height via JS → hydration mismatch)
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return <>{children}</>
}

export default function LandingPage() {
  return (
    <>
      {/* ── NAVBAR LP ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {navbar_lp.logo_src && (
              <Image
                src={navbar_lp.logo_src}
                alt={navbar_lp.logo_alt}
                width={32}
                height={32}
                className="shrink-0"
              />
            )}
            <span className="font-bold text-[var(--brand-navy)] text-base leading-none">
              {navbar_lp.nome_prodotto}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navbar_lp.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-600 hover:text-[var(--brand-navy)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Button size="sm" render={<Link href={navbar_lp.cta.href} />}>
            {navbar_lp.cta.testo}
          </Button>
        </div>
      </header>

      {/* ── HERO LP (light) ── */}
      <Section variant="default" size="lg">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="text-6xl md:text-8xl font-bold text-[var(--brand-navy)] leading-none tracking-tight">
                {hero_lp.nome_prodotto}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                {hero_lp.tagline}
              </p>
              <div className="flex flex-wrap gap-8">
                {hero_lp.metriche.map((m) => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <span className="text-2xl font-bold text-[var(--brand-navy)]">{m.valore}</span>
                    <span className="text-xs text-gray-500">{m.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button render={<Link href={hero_lp.cta_primaria.href} />}>
                  {hero_lp.cta_primaria.testo}
                </Button>
                <Button variant="outline" render={<Link href={hero_lp.cta_secondaria.href} />}>
                  {hero_lp.cta_secondaria.testo}
                </Button>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--brand-surface)] border border-[var(--brand-border)]">
              <Image
                src={hero_lp.immagine_src}
                alt={hero_lp.immagine_alt}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* ── CLAIM ── */}
      <Section variant="muted">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-[var(--brand-teal)] font-semibold">
              {claim.label}
            </p>
            <p className="text-3xl md:text-5xl font-bold leading-tight text-[var(--brand-navy)]">
              {claim.testo_prima}{" "}
              <span className="text-[var(--brand-teal)]">{claim.parola_evidenziata}</span>
            </p>
            {claim.attribuzione && (
              <p className="text-sm text-gray-400 mt-2">{claim.attribuzione}</p>
            )}
          </div>
        </SectionContainer>
      </Section>

      {/* ── BENEFICI ── */}
      <div id="benefici">
        <Section variant="default">
          <SectionContainer>
            <SectionHeader align="center">
              <SectionTagline>Perché sceglierlo</SectionTagline>
              <SectionTitle>Sei motivi che fanno la differenza</SectionTitle>
              <SectionDescription>
                Non aggiungiamo funzionalità per il gusto di farlo. Ogni caratteristica
                è progettata per risolvere un problema reale.
              </SectionDescription>
            </SectionHeader>
            <SectionGrid cols={3}>
              {benefici.map((b) => (
                <Card key={b.id}>
                  <CardHeader>
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-navy)] flex items-center justify-center mb-3">
                      <span className="text-sm font-bold text-[var(--brand-navy)]">{b.numero}</span>
                    </div>
                    <CardTitle>{b.titolo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 leading-relaxed">{b.descrizione}</p>
                  </CardContent>
                </Card>
              ))}
            </SectionGrid>
          </SectionContainer>
        </Section>
      </div>

      {/* ── SPECIFICHE ── */}
      <div id="specifiche">
        <Section variant="muted">
          <SectionContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-6">
                <SectionHeader>
                  <SectionTagline>{specifiche.tagline}</SectionTagline>
                  <SectionTitle>{specifiche.titolo}</SectionTitle>
                  <SectionDescription>{specifiche.descrizione}</SectionDescription>
                </SectionHeader>
                <dl className="divide-y divide-[var(--brand-border)]">
                  {specifiche.voci.map((s) => (
                    <div key={s.nome} className="flex justify-between py-3">
                      <dt className="text-sm text-gray-500">{s.nome}</dt>
                      <dd className="text-sm font-semibold text-[var(--brand-navy)]">{s.valore}</dd>
                    </div>
                  ))}
                </dl>
                <Button
                  variant="outline"
                  className="self-start"
                  render={<Link href={specifiche.cta_pdf.href} />}
                >
                  {specifiche.cta_pdf.testo}
                </Button>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--brand-border)] bg-white">
                <Image
                  src={specifiche.immagine_src}
                  alt={specifiche.immagine_alt}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </SectionContainer>
        </Section>
      </div>

      {/* ── FAQ ── */}
      <div id="faq">
        <Section variant="default">
          <SectionContainer>
            <SectionHeader align="center">
              <SectionTagline>Domande frequenti</SectionTagline>
              <SectionTitle>Tutto quello che vuoi sapere</SectionTitle>
              <SectionDescription>
                Non trovi la risposta che cerchi? Scrivici a{" "}
                <span className="text-[var(--brand-navy)] font-medium">info@brandpmi.it</span>
              </SectionDescription>
            </SectionHeader>
            <div className="max-w-2xl mx-auto">
              <ClientOnly>
                <Accordion>
                  {faq.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger>{item.domanda}</AccordionTrigger>
                      <AccordionContent>{item.risposta}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ClientOnly>
            </div>
          </SectionContainer>
        </Section>
      </div>

      {/* ── SOCIAL PROOF ── */}
      <div id="recensioni">
        {/* Parte 1 — Logo bar */}
        <Section variant="muted">
          <SectionContainer>
            <p className="text-xs text-center text-gray-400 uppercase tracking-widest mb-8">
              {social_proof.label_loghi}
            </p>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {social_proof.loghi.map((l) => (
                <div key={l.id} className="relative w-[120px] h-[40px]">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    fill
                    className="object-contain grayscale opacity-50 hover:opacity-80 transition-opacity"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>

        {/* Parte 2 — Recensione in evidenza */}
        <Section variant="default">
          <SectionContainer>
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
              {/* Stelle */}
              <div className="flex justify-center gap-1 text-yellow-400 text-2xl">
                {"★".repeat(social_proof.recensione.stelle)}
              </div>
              {/* Testo */}
              <p className="text-lg italic text-gray-700 leading-relaxed">
                &ldquo;{social_proof.recensione.testo}&rdquo;
              </p>
              {/* Recensore */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--brand-border)] bg-[var(--brand-surface)] shrink-0">
                  <Image
                    src={social_proof.recensione.foto_src}
                    alt={social_proof.recensione.foto_alt}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[var(--brand-navy)]">
                    {social_proof.recensione.nome}
                  </p>
                  <p className="text-xs text-gray-500">{social_proof.recensione.ruolo}</p>
                </div>
              </div>
            </div>
          </SectionContainer>
        </Section>
      </div>

      {/* ── CTA FINALE ── */}
      <div id="cta">
        <Section variant="navy">
          <SectionContainer>
            <div className="text-center flex flex-col items-center gap-6">
              <p className="text-xs uppercase tracking-widest text-[var(--brand-teal)] font-semibold">
                {cta_finale.label}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {cta_finale.headline}
              </h2>
              <p className="text-white/70 max-w-md">{cta_finale.sottotitolo}</p>
              <p className="text-4xl font-bold text-white">{cta_finale.prezzo}</p>
              <Button
                variant="accent"
                className="text-base px-8 py-3 h-auto"
                render={<Link href={cta_finale.cta_href} />}
              >
                {cta_finale.cta_testo}
              </Button>
            </div>
          </SectionContainer>
        </Section>
      </div>

      {/* ── FOOTER LP ── */}
      <footer className="bg-[var(--brand-navy)] py-6 pb-20">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            {footer_lp.logo_src && (
              <Image
                src={footer_lp.logo_src}
                alt={footer_lp.logo_alt}
                width={28}
                height={28}
                className="brightness-0 invert shrink-0"
              />
            )}
            <span className="text-sm text-white/60">
              {footer_lp.copyright} · {footer_lp.piva}
            </span>
          </div>
          {/* Link legali */}
          <div className="flex items-center gap-6">
            {footer_lp.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* ── STICKY BAR ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[var(--brand-border)] py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4">
          <Button variant="outline" render={<Link href={cta_finale.sticky.secondario_href} />}>
            {cta_finale.sticky.secondario_testo}
          </Button>
          <Button render={<Link href={cta_finale.sticky.primario_href} />}>
            {cta_finale.sticky.primario_testo}
          </Button>
        </div>
      </div>
    </>
  )
}
