"use client"

import { useState } from "react"
import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// ── CONTATTI (full) ───────────────────────
// n8n: PROMPT-14
const contatti = {
  telefono: "+39 030 123 4567",
  email: "info@brandpmi.it",
  indirizzo: "Via dell'Industria 12, 25030 Castel Mella (BS)",
  orari: "Lun–Ven 8:00–18:00",
}

const info_legale = {
  ragione_sociale: "BrandPMI S.p.A.",
  piva: "P.IVA 01234567890",
  rea: "REA BS-123456",
  sede_legale: "Via dell'Industria 12, 25030 Castel Mella (BS)",
  email_pec: "brandpmi@pec.it",
}

const certificazioni = [
  { titolo: "ISO 9001:2015", ente: "Bureau Veritas", dal: "2009" },
  { titolo: "ISO 14001:2015", ente: "Bureau Veritas", dal: "2015" },
  { titolo: "IATF 16949:2016", ente: "TÜV SÜD", dal: "2018" },
]

const servizi_opzioni = ["Lavorazioni CNC", "Stampaggio a Freddo", "Trattamenti Superficiali", "Controllo Qualità", "Prototipazione Rapida", "Logistica e Consegna", "Altro"]
const urgenza_opzioni = ["Nessuna urgenza (> 30 giorni)", "Urgenza media (15–30 giorni)", "Urgente (< 15 giorni)", "Urgentissimo (< 5 giorni)"]

export default function Contatti() {
  const [stato, setStato] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStato("loading")
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      setStato(res.ok ? "success" : "error")
    } catch {
      setStato("error")
    }
  }

  return (
    <>
      <Section variant="muted" size="lg">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Contattaci</SectionTagline>
            <SectionTitle className="text-[40px] md:text-[52px]">Parliamo del tuo progetto</SectionTitle>
            <SectionDescription>Inviaci il disegno tecnico o descrivici la necessità: un tecnico ti risponderà entro 24 ore lavorative con una prima valutazione.</SectionDescription>
          </SectionHeader>
        </SectionContainer>
      </Section>

      <Section variant="default">
        <SectionContainer>
          <div id="form" className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-start">
            <div className="flex flex-col gap-6">
              {stato === "success" ? (
                <div className="rounded-xl border border-[var(--brand-border)] p-8 text-center flex flex-col gap-3">
                  <span className="text-4xl">✅</span>
                  <h2 className="text-xl font-bold text-[var(--brand-navy)]">Richiesta inviata con successo</h2>
                  <p className="text-gray-500 text-sm">Ti risponderemo entro 24 ore lavorative all&apos;indirizzo email fornito.</p>
                  <Button className="self-center mt-2" onClick={() => setStato("idle")}>Invia un&apos;altra richiesta</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-base font-semibold text-[var(--brand-navy)] border-b border-[var(--brand-border)] pb-2">Dati di contatto</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1"><Label htmlFor="nome">Nome *</Label><Input id="nome" name="nome" placeholder="Mario" required /></div>
                      <div className="flex flex-col gap-1"><Label htmlFor="cognome">Cognome *</Label><Input id="cognome" name="cognome" placeholder="Rossi" required /></div>
                    </div>
                    <div className="flex flex-col gap-1"><Label htmlFor="azienda">Azienda</Label><Input id="azienda" name="azienda" placeholder="Rossi S.r.l." /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" placeholder="mario@rossi.it" required /></div>
                      <div className="flex flex-col gap-1"><Label htmlFor="telefono">Telefono</Label><Input id="telefono" name="telefono" type="tel" placeholder="+39 030 000 0000" /></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-base font-semibold text-[var(--brand-navy)] border-b border-[var(--brand-border)] pb-2">La tua richiesta</h2>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="servizio">Servizio richiesto</Label>
                      <select id="servizio" name="servizio" className="h-8 rounded-lg border border-[var(--brand-border)] bg-white px-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)]/20">
                        <option value="">Seleziona un servizio...</option>
                        {servizi_opzioni.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="urgenza">Urgenza</Label>
                      <select id="urgenza" name="urgenza" className="h-8 rounded-lg border border-[var(--brand-border)] bg-white px-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)]/20">
                        <option value="">Seleziona urgenza...</option>
                        {urgenza_opzioni.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="messaggio">Descrivi il progetto *</Label>
                      <Textarea id="messaggio" name="messaggio" placeholder="Descrivi il componente da produrre, i materiali, le quantità e qualsiasi dettaglio tecnico rilevante..." rows={6} required />
                    </div>
                  </div>
                  {stato === "error" && (
                    <p className="text-sm text-red-600">Si è verificato un errore nell&apos;invio. Riprova o scrivici direttamente a <span className="font-medium">{contatti.email}</span>.</p>
                  )}
                  <Button type="submit" disabled={stato === "loading"} className="self-start">
                    {stato === "loading" ? "Invio in corso..." : "Invia la richiesta →"}
                  </Button>
                </form>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <h3 className="font-semibold text-[var(--brand-navy)]">Informazioni azienda</h3>
                  <ul className="flex flex-col gap-3 text-sm">
                    <li><span className="text-gray-400 text-xs uppercase tracking-wide block mb-0.5">Ragione sociale</span><span className="text-gray-700">{info_legale.ragione_sociale}</span></li>
                    <li><span className="text-gray-400 text-xs uppercase tracking-wide block mb-0.5">Sede operativa</span><span className="text-gray-700">{contatti.indirizzo}</span></li>
                    <li><span className="text-gray-400 text-xs uppercase tracking-wide block mb-0.5">Telefono</span><span className="text-gray-700">{contatti.telefono}</span></li>
                    <li><span className="text-gray-400 text-xs uppercase tracking-wide block mb-0.5">Email</span><span className="text-gray-700">{contatti.email}</span></li>
                    <li><span className="text-gray-400 text-xs uppercase tracking-wide block mb-0.5">Orari</span><span className="text-gray-700">{contatti.orari}</span></li>
                    <li className="pt-2 border-t border-[var(--brand-border)]"><span className="text-gray-400 text-xs">{info_legale.piva} · {info_legale.rea}</span></li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <h3 className="font-semibold text-[var(--brand-navy)]">Certificazioni</h3>
                  <div className="flex flex-col gap-3">
                    {certificazioni.map((c) => (
                      <div key={c.titolo} className="flex flex-col">
                        <span className="font-semibold text-sm text-[var(--brand-navy)]">{c.titolo}</span>
                        <span className="text-xs text-gray-500">{c.ente} · dal {c.dal}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionContainer>
      </Section>
    </>
  )
}
