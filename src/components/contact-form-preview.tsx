"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitContactForm } from "@/lib/contact"

export function ContactFormPreview() {
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
        <h3 className="text-lg font-bold text-[var(--brand-navy)]">Richiesta inviata!</h3>
        <p className="text-gray-500 text-sm">Ti risponderemo entro 24 ore lavorative all&apos;indirizzo email fornito.</p>
        <Button className="self-center mt-2" onClick={() => setStato("idle")}>Invia un&apos;altra richiesta</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* honeypot anti-spam: invisibile agli utenti, compilato solo dai bot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="nome-preview">Nome</Label>
          <Input id="nome-preview" name="nome" placeholder="Mario" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="cognome-preview">Cognome</Label>
          <Input id="cognome-preview" name="cognome" placeholder="Rossi" required />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="azienda-preview">Azienda</Label>
        <Input id="azienda-preview" name="azienda" placeholder="Rossi S.r.l." />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email-preview">Email</Label>
        <Input id="email-preview" name="email" type="email" placeholder="mario@rossi.it" required />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="messaggio-preview">Descrivi la tua esigenza</Label>
        <Textarea id="messaggio-preview" name="messaggio" placeholder="Breve descrizione del progetto o del componente da produrre..." rows={4} required />
      </div>
      {stato === "error" && (
        <p className="text-sm text-red-600">Errore nell&apos;invio. Riprova o scrivici direttamente a <span className="font-medium">info@brandpmi.it</span>.</p>
      )}
      <Button type="submit" disabled={stato === "loading"} className="self-start">
        {stato === "loading" ? "Invio in corso..." : "Invia la richiesta →"}
      </Button>
    </form>
  )
}
