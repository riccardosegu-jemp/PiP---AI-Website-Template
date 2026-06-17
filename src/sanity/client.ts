import { createClient } from 'next-sanity'

/**
 * Client Sanity condiviso da tutte le query (src/sanity/queries.ts).
 * I valori arrivano dalle env var (vedi .env.example). Il `!` assume che siano
 * sempre presenti: se mancano in fase di deploy, le query falliscono a runtime.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // CDN disattivata di proposito: il caching è gestito da Next.js (ISR, vedi
  // `opts` in queries.ts) + rivalidazione on-demand via webhook (api/revalidate).
  // Attivare useCdn introdurrebbe dati stantii fino a 60s in parallelo all'ISR.
  useCdn: false,
})
