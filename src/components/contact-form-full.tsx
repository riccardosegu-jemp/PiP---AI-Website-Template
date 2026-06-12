"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitContactForm } from "@/lib/contact"

type Props = {
  serviziOpzioni: string[]
  urgenzaOpzioni: string[]
  email: string
}

export function ContactFormFull({ serviziOpzioni, urgenzaOpzioni, email }: Props) {
  const [stato, setStato] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStato("loading")
    const result = await submitContactForm(e.currentTarget)
    setStato(result.ok ? "success" : "error")
  }

  if (stato === "success") {
    return (
      <div className="rounded-xl border border-[var(--brand-border)] p-8 text-center flex flex-col gap-3">
        <span className="text-4xl">✅</span>
        <h2 className="text-xl font-bold text-[var(--brand-navy)]">Richiesta inviata con successo</h2>
        <p className="text-gray-500 text-sm">Ti risponderemo entro 24 ore lavorative all&apos;indirizzo email fornito.</p>
        <Button className="self-center mt-2" onClick={() => setStato("idle")}>Invia un&apos;altra richiesta</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* honeypot anti-spam: invisibile agli utenti, compilato solo dai bot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
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
            {serviziOpzioni.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="urgenza">Urgenza</Label>
          <select id="urgenza" name="urgenza" className="h-8 rounded-lg border border-[var(--brand-border)] bg-white px-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)]/20">
            <option value="">Seleziona urgenza...</option>
            {urgenzaOpzioni.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="messaggio">Descrivi il progetto *</Label>
          <Textarea id="messaggio" name="messaggio" placeholder="Descrivi il componente da produrre, i materiali, le quantità e qualsiasi dettaglio tecnico rilevante..." rows={6} required />
        </div>
      </div>
      {stato === "error" && (
        <p className="text-sm text-red-600">Si è verificato un errore nell&apos;invio. Riprova o scrivici direttamente a <span className="font-medium">{email}</span>.</p>
      )}
      <Button type="submit" disabled={stato === "loading"} className="self-start">
        {stato === "loading" ? "Invio in corso..." : "Invia la richiesta →"}
      </Button>
    </form>
  )
}
