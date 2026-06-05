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
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// ── CHI SIAMO (full) ──────────────────────
// n8n: PROMPT-09
const hero_cs = {
  headline: "Trentacinque anni di precisione al servizio dell'industria",
  immagine_src: "/images/chi-siamo/hero.jpg",
  immagine_alt: "Vista dell'officina meccanica con macchinari CNC",
}

const storia = {
  narrativa: [
    "Fondata nel 1989 da un gruppo di tecnici fresatori con esperienza nelle grandi officine bresciane, la nostra azienda nasce con un obiettivo preciso: offrire lavorazioni meccaniche di altissima qualità a un mercato industriale sempre più esigente.",
    "Negli anni '90 investiamo nei primi centri di lavoro CNC e ampliamo la capacità produttiva, acquisendo clienti nel settore automotive e delle macchine utensili. È il periodo che definisce la nostra cultura: qualità non negoziabile, consegne rispettate, nessuna scusa.",
    "Tra il 2005 e il 2015 costruiamo il reparto metrologico e otteniamo la certificazione ISO 9001, poi estesa all'IATF 16949 per la fornitura automotive. Ogni lotto esce con report CMM completo.",
    "Oggi siamo un'azienda di 85 persone, con oltre 4.200 mq di produzione, 24 centri CNC attivi e clienti in 12 paesi europei. La stessa cultura del 1989, con tecnologia del 2024.",
  ],
  timeline: [
    { anno: "1989", testo: "Fondazione. Tre soci, due torni paralleli, un capannone da 400 mq a Castel Mella." },
    { anno: "1996", testo: "Primi centri di lavoro CNC. Ingresso nel settore automotive con qualifica Fiat Auto." },
    { anno: "2003", testo: "Apertura del reparto stampaggio a freddo. Capacità produttiva triplicata." },
    { anno: "2009", testo: "Certificazione ISO 9001:2008. Apertura sala metrologica con prima CMM." },
    { anno: "2015", testo: "Certificazione ISO 14001. Impianto fotovoltaico da 120 kWp." },
    { anno: "2018", testo: "Qualifica IATF 16949 per fornitura OEM. Ingresso nei mercati tedesco e francese." },
    { anno: "2024", testo: "85 dipendenti, 24 centri CNC, 320+ clienti attivi. Terza generazione in azienda." },
  ],
}

const valori = [
  { id: "precisione", icona: "✓", titolo: "Precisione tecnica", descrizione: "Tolleranze da ±0,003 mm realizzate ogni giorno. La precisione non è un'eccezione — è il nostro standard operativo." },
  { id: "puntualita", icona: "✓", titolo: "Puntualità nelle consegne", descrizione: "OTD al 94% misurato mensilmente e pubblicato ai clienti. Se non rispettiamo, comunichiamo prima." },
  { id: "trasparenza", icona: "✓", titolo: "Trasparenza contrattuale", descrizione: "Preventivo scritto, condizioni chiare, nessuna sorpresa in fattura. Il prezzo concordato è quello finale." },
  { id: "continuita", icona: "✓", titolo: "Continuità di fornitura", descrizione: "Piani di contingency per ogni linea critica. Nessun cliente si è mai fermato per colpa nostra." },
  { id: "miglioramento", icona: "✓", titolo: "Miglioramento continuo", descrizione: "Kaizen trimestrale su ogni reparto. I suggerimenti degli operatori diventano procedure. Il sistema impara." },
  { id: "persone", icona: "✓", titolo: "Valorizzazione delle persone", descrizione: "Media anzianità aziendale: 11 anni. Formiamo internamente i tecnici CNC e investiamo nell'apprendistato." },
]

const certificazioni = [
  { titolo: "ISO 9001:2015", ente: "Bureau Veritas", dal: "2009" },
  { titolo: "IATF 16949:2016", ente: "TÜV SÜD", dal: "2018" },
  { titolo: "ISO 14001:2015", ente: "Bureau Veritas", dal: "2015" },
]

const team = [
  { id: "ceo", nome: "Giorgio Ferri", ruolo: "Fondatore & Direttore Generale", bio: "Fresatore di formazione, imprenditore per vocazione. Ha fondato l'azienda a 34 anni e ne guida ancora la strategia con lo stesso approccio: qualità prima, tutto il resto dopo.", foto_src: "/images/team/giorgio.jpg", foto_alt: "Giorgio Ferri, fondatore" },
  { id: "dt", nome: "Alessia Conti", ruolo: "Direttrice Tecnica", bio: "Ingegnere meccanico con 18 anni di esperienza in lavorazioni CNC e metrologia. Supervisiona il processo produttivo e i rapporti con i clienti tecnicamente più complessi.", foto_src: "/images/team/alessia.jpg", foto_alt: "Alessia Conti, direttrice tecnica" },
  { id: "cq", nome: "Marco Bianchi", ruolo: "Responsabile Qualità", bio: "Lead auditor ISO 9001 e IATF 16949. Gestisce il sistema qualità, i rapporti con gli enti di certificazione e le qualifiche cliente (PPAP, FAI, APQP).", foto_src: "/images/team/marco.jpg", foto_alt: "Marco Bianchi, responsabile qualità" },
]

const sede = {
  titolo: "4.200 mq, tutto sotto lo stesso tetto",
  descrizione: "Un'unica sede produttiva a Castel Mella (BS), con reparti dedicati e flusso logistico ottimizzato. Nessuna terziarizzazione critica: dalla materia prima alla spedizione, controlliamo ogni passaggio.",
  punti: ["24 centri di lavoro CNC (3, 4 e 5 assi)", "Reparto stampaggio a freddo con 8 presse (10–400 ton)", "Linea trattamenti superficiali in house", "Sala metrologica CMM Zeiss Contura", "Magazzino prodotti finiti con WMS dedicato", "Impianto fotovoltaico da 120 kWp"],
  immagine_src: "/images/sede.jpg",
  immagine_alt: "Vista aerea dello stabilimento produttivo",
}

const contatti = {
  telefono: "+39 030 123 4567",
  email: "info@brandpmi.it",
  indirizzo: "Via dell'Industria 12, 25030 Castel Mella (BS)",
  orari: "Lun–Ven 8:00–18:00",
}

export default function ChiSiamo() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-end">
        <Image src={hero_cs.immagine_src} alt={hero_cs.immagine_alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[var(--brand-navy)]/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">{hero_cs.headline}</h1>
        </div>
      </section>

      <Section variant="default">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-5">
              <SectionHeader>
                <SectionTagline>La nostra storia</SectionTagline>
                <SectionTitle>Dal banco fresatore al CNC a 5 assi</SectionTitle>
              </SectionHeader>
              {storia.narrativa.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p>
              ))}
            </div>
            <div className="flex flex-col pt-4">
              {storia.timeline.map((item, i) => (
                <div key={item.anno} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--brand-navy)] shrink-0 mt-1" />
                    {i < storia.timeline.length - 1 && <div className="w-px flex-1 bg-[var(--brand-border)] my-1" />}
                  </div>
                  <div className="pb-6">
                    <p className="font-bold text-[var(--brand-navy)] text-sm">{item.anno}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{item.testo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </Section>

      <Section variant="muted">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>I nostri valori</SectionTagline>
            <SectionTitle>Sei principi che guidano ogni decisione</SectionTitle>
            <SectionDescription>Non è marketing. Sono gli stessi principi che usiamo internamente per valutare ogni investimento, ogni assunzione, ogni processo.</SectionDescription>
          </SectionHeader>
          <SectionGrid cols={3}>
            {valori.map((v) => (
              <Card key={v.id}>
                <CardContent className="p-6 flex flex-col gap-3">
                  <span className="w-8 h-8 rounded-full bg-[var(--brand-navy)] text-white flex items-center justify-center text-sm font-bold">{v.icona}</span>
                  <h3 className="font-semibold text-[var(--brand-navy)]">{v.titolo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.descrizione}</p>
                </CardContent>
              </Card>
            ))}
          </SectionGrid>
        </SectionContainer>
      </Section>

      <Section variant="default">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Certificazioni</SectionTagline>
            <SectionTitle>Qualità verificata da enti terzi</SectionTitle>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificazioni.map((c) => (
              <Card key={c.titolo}>
                <CardContent className="p-6 flex flex-col gap-1">
                  <p className="font-bold text-[var(--brand-navy)] text-lg">{c.titolo}</p>
                  <p className="text-sm text-gray-500">{c.ente}</p>
                  <p className="text-xs text-gray-400">Certificato dal {c.dal}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </Section>

      <Section variant="muted">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Le persone</SectionTagline>
            <SectionTitle>Chi c&apos;è dietro ogni commessa</SectionTitle>
            <SectionDescription>Competenze tecniche, esperienza sul campo e passione per il lavoro ben fatto. Queste sono le persone che seguono i tuoi componenti.</SectionDescription>
          </SectionHeader>
          <SectionGrid cols={3}>
            {team.map((m) => (
              <Card key={m.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-[var(--brand-surface)]">
                  <Image src={m.foto_src} alt={m.foto_alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <CardContent className="p-5 flex flex-col gap-2">
                  <h3 className="font-bold text-[var(--brand-navy)]">{m.nome}</h3>
                  <p className="text-xs font-medium text-[var(--brand-teal)] uppercase tracking-wide">{m.ruolo}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </SectionGrid>
        </SectionContainer>
      </Section>

      <Section variant="default">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--brand-border)] bg-[var(--brand-surface)]">
              <Image src={sede.immagine_src} alt={sede.immagine_alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col gap-6">
              <SectionHeader>
                <SectionTagline>La nostra sede</SectionTagline>
                <SectionTitle>{sede.titolo}</SectionTitle>
                <SectionDescription>{sede.descrizione}</SectionDescription>
              </SectionHeader>
              <ul className="flex flex-col gap-2">
                {sede.punti.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[var(--brand-teal)] font-bold shrink-0 mt-0.5">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionContainer>
      </Section>

      <Section variant="muted">
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
              <div>
                <Button render={<Link href="/contatti" />}>Vai alla pagina contatti →</Button>
              </div>
            </div>
            <form action={process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "#"} method="POST" className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="nome-cs">Nome</Label>
                  <Input id="nome-cs" name="nome" placeholder="Mario" required />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="cognome-cs">Cognome</Label>
                  <Input id="cognome-cs" name="cognome" placeholder="Rossi" required />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="azienda-cs">Azienda</Label>
                <Input id="azienda-cs" name="azienda" placeholder="Rossi S.r.l." />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email-cs">Email</Label>
                <Input id="email-cs" name="email" type="email" placeholder="mario@rossi.it" required />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="messaggio-cs">Descrivi la tua esigenza</Label>
                <Textarea id="messaggio-cs" name="messaggio" placeholder="Breve descrizione del progetto o del componente da produrre..." rows={4} />
              </div>
              <Button type="submit" className="self-start">Invia la richiesta →</Button>
            </form>
          </div>
        </SectionContainer>
      </Section>
    </>
  )
}
