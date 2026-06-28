import type { MetadataRoute } from "next"
import { getSiteSettings } from "@/sanity/queries"
import { siteUrl } from "@/lib/seo"

export const revalidate = 3600

// Genera /robots.txt. Il dominio arriva da Sanity (Impostazioni sito › URL del sito).
// Il sitemap viene generato esternamente (n8n) ed è solo referenziato qui.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings()
  const base = siteUrl(settings?.url_sito)

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio", // il pannello CMS non va indicizzato
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
