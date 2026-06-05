import { NextRequest, NextResponse } from "next/server"

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

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
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#1e3a5f;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#374151">${v}</td></tr>`)
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
    <p style="margin:0;color:#374151;line-height:1.6">${messaggio.replace(/\n/g, "<br>")}</p>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, cognome, email, messaggio, azienda = "", telefono = "", servizio = "", urgenza = "" } = body

    if (!nome || !cognome || !email || !messaggio) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    const senderEmail = process.env.BREVO_SENDER_EMAIL
    const senderName = process.env.BREVO_SENDER_NAME

    if (!apiKey || !senderEmail) {
      console.error("Brevo env vars mancanti")
      return NextResponse.json({ error: "Configurazione server mancante" }, { status: 500 })
    }

    const subject = `Nuova richiesta: ${nome} ${cognome}${azienda ? ` — ${azienda}` : ""}`

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
        replyTo: { email, name: `${nome} ${cognome}` },
        subject,
        htmlContent: buildHtml({ nome, cognome, azienda, email, telefono, servizio, urgenza, messaggio }),
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("Brevo error:", res.status, errText)
      return NextResponse.json({ error: "Errore invio email" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Errore server" }, { status: 500 })
  }
}
