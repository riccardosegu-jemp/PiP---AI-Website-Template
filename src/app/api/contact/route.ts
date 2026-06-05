import { NextRequest, NextResponse } from "next/server"

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

// Limiti massimi per campo (caratteri) — proteggono da payload abnormi.
const LIMITS: Record<string, number> = {
  nome: 100,
  cognome: 100,
  azienda: 200,
  email: 254,
  telefono: 40,
  servizio: 100,
  urgenza: 100,
  messaggio: 5000,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function buildHtml(fields: Record<string, string>): string {
  const { nome, cognome, azienda, email, telefono, servizio, urgenza, messaggio } = fields
  const rowData: [string, string][] = [
    ["Nome", `${nome} ${cognome}`],
    ["Email", email],
    ...(azienda ? [["Azienda", azienda] as [string, string]] : []),
    ...(telefono ? [["Telefono", telefono] as [string, string]] : []),
    ...(servizio ? [["Servizio richiesto", servizio] as [string, string]] : []),
    ...(urgenza ? [["Urgenza", urgenza] as [string, string]] : []),
  ]
  const rows = rowData
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#1e3a5f;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#374151">${escapeHtml(v)}</td></tr>`,
    )
    .join("")

  return `
<!DOCTYPE html>
<html lang="it">
<body style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#1e3a5f;border-bottom:2px solid #e5e7eb;padding-bottom:12px">Nuova richiesta di contatto</h2>
  <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
    ${rows}
  </table>
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
    <p style="font-weight:600;color:#1e3a5f;margin:0 0 8px">Messaggio</p>
    <p style="margin:0;color:#374151;line-height:1.6">${escapeHtml(messaggio).replace(/\n/g, "<br>")}</p>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  // 1. Body deve essere JSON valido e un oggetto
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: "Body non valido" }, { status: 400 })
  }
  if (typeof raw !== "object" || raw === null) {
    return NextResponse.json({ error: "Body non valido" }, { status: 400 })
  }
  const obj = raw as Record<string, unknown>

  // 2. Honeypot: un bot compila il campo nascosto "website" → fingiamo successo, non inviamo nulla
  if (typeof obj.website === "string" && obj.website.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  // 3. Normalizzazione: ogni campo deve essere stringa, trimmata (i non-stringa diventano "")
  const get = (k: string) => (typeof obj[k] === "string" ? (obj[k] as string).trim() : "")
  const fields = {
    nome: get("nome"),
    cognome: get("cognome"),
    email: get("email"),
    messaggio: get("messaggio"),
    azienda: get("azienda"),
    telefono: get("telefono"),
    servizio: get("servizio"),
    urgenza: get("urgenza"),
  }

  // 4. Validazione campi obbligatori (dopo il trim → niente spazi vuoti)
  if (!fields.nome || !fields.cognome || !fields.email || !fields.messaggio) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 })
  }
  // 5. Formato email
  if (!EMAIL_RE.test(fields.email)) {
    return NextResponse.json({ error: "Indirizzo email non valido" }, { status: 400 })
  }
  // 6. Limiti di lunghezza
  for (const [k, max] of Object.entries(LIMITS)) {
    if ((fields as Record<string, string>)[k].length > max) {
      return NextResponse.json({ error: `Il campo "${k}" supera il limite consentito` }, { status: 400 })
    }
  }

  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  const senderName = process.env.BREVO_SENDER_NAME

  if (!apiKey || !senderEmail) {
    console.error("Brevo env vars mancanti")
    return NextResponse.json({ error: "Configurazione server mancante" }, { status: 500 })
  }

  const subject = `Nuova richiesta: ${fields.nome} ${fields.cognome}${fields.azienda ? ` — ${fields.azienda}` : ""}`

  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName ?? senderEmail, email: senderEmail },
        to: [{ email: senderEmail, name: senderName ?? senderEmail }],
        replyTo: { email: fields.email, name: `${fields.nome} ${fields.cognome}` },
        subject,
        htmlContent: buildHtml(fields),
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("Brevo error:", res.status, errText)
      // 502: errore a monte (Brevo), non colpa del client
      return NextResponse.json({ error: "Errore nell'invio dell'email" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Errore server" }, { status: 500 })
  }
}

// NOTA: questo endpoint pubblico non ha rate limiting. Su Vercel serverless
// un limiter in-memory non è affidabile (istanze multiple). Per produzione
// aggiungere un throttle per-IP con uno store esterno (es. Vercel KV / Upstash).
