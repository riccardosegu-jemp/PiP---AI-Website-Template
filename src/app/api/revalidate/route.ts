import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

// Chiamato dal webhook Sanity quando un documento viene creato/aggiornato/eliminato.
// Richiede il secret come query param: /api/revalidate?secret=...
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret")

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    console.error("SANITY_REVALIDATE_SECRET non configurato")
    return NextResponse.json({ error: "Configurazione mancante" }, { status: 500 })
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Secret non valido" }, { status: 401 })
  }

  // "layout" invalida il layout condiviso + tutte le pagine figlie in un colpo solo.
  // Copre: navbar, footer, siteSettings (colori, font, logo) e tutte le route del sito.
  revalidatePath("/", "layout")

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() })
}
