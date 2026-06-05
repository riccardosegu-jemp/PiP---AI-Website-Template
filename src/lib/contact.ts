export type ContactResult = { ok: true } | { ok: false; error: string }

/**
 * Invia i dati di un form contatti all'endpoint /api/contact.
 * Logica condivisa tra il form della pagina Contatti e la preview in homepage.
 */
export async function submitContactForm(form: HTMLFormElement): Promise<ContactResult> {
  const payload = Object.fromEntries(new FormData(form).entries())
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (res.ok) return { ok: true }

    let error = "Errore nell'invio."
    try {
      const data = await res.json()
      if (data?.error) error = data.error
    } catch {
      // risposta non-JSON: manteniamo il messaggio generico
    }
    return { ok: false, error }
  } catch {
    return { ok: false, error: "Errore di rete. Controlla la connessione e riprova." }
  }
}
