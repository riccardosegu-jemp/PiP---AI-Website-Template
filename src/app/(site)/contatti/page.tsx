import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { ContactFormFull } from "@/components/contact-form-full"
import type { Metadata } from "next"
import { getContattiPage, getSiteSettings } from "@/sanity/queries"
import { buildMetadata, SEO_DEFAULTS } from "@/lib/seo"

export const revalidate = 3600

// Title/description per Google: dai campi SEO di Sanity, con fallback ai default.
export async function generateMetadata(): Promise<Metadata> {
  const page = await getContattiPage()
  return buildMetadata(page?.seo, SEO_DEFAULTS.contatti)
}

export default async function Contatti() {
  const [page, settings] = await Promise.all([getContattiPage(), getSiteSettings()])

  const serviziOpzioni = page?.servizi_opzioni ?? []
  const urgenzaOpzioni = page?.urgenza_opzioni ?? []
  const certificazioni = settings?.certificazioni ?? []
  const indirizzo = [settings?.indirizzo, settings?.citta].filter(Boolean).join(", ")
  const email = settings?.email ?? "info@brandpmi.it"

  // n8n: PROMPT-18-BREADCRUMB — aggiorna url_sito con il dominio reale del cliente
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.brandpmi.it" },
      { "@type": "ListItem", "position": 2, "name": "Contatti" },
    ],
  }

  return (
    <>
      <h1 className="sr-only">Contatti</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <Section variant="muted" size="lg">
        <SectionContainer>
          <SectionHeader align="center">
            {page?.hero_tagline && <SectionTagline>{page.hero_tagline}</SectionTagline>}
            <SectionTitle className="text-[40px] md:text-[52px]">{page?.hero_titolo}</SectionTitle>
            <SectionDescription>{page?.hero_descrizione}</SectionDescription>
          </SectionHeader>
        </SectionContainer>
      </Section>

      <Section variant="default">
        <SectionContainer>
          <div id="form" className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-start">
            <div className="flex flex-col gap-6">
              <ContactFormFull serviziOpzioni={serviziOpzioni} urgenzaOpzioni={urgenzaOpzioni} email={email} />
            </div>
            <div className="flex flex-col gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <h3 className="font-semibold text-[var(--brand-navy)]">Informazioni azienda</h3>
                  <ul className="flex flex-col gap-3 text-sm">
                    {settings?.ragione_sociale && (
                      <li><span className="text-gray-600 text-xs uppercase tracking-wide block mb-0.5">Ragione sociale</span><span className="text-gray-700">{settings.ragione_sociale}</span></li>
                    )}
                    {indirizzo && (
                      <li><span className="text-gray-600 text-xs uppercase tracking-wide block mb-0.5">Sede operativa</span><span className="text-gray-700">{indirizzo}</span></li>
                    )}
                    {settings?.telefono && (
                      <li><span className="text-gray-600 text-xs uppercase tracking-wide block mb-0.5">Telefono</span><span className="text-gray-700">{settings.telefono}</span></li>
                    )}
                    {settings?.email && (
                      <li><span className="text-gray-600 text-xs uppercase tracking-wide block mb-0.5">Email</span><span className="text-gray-700">{settings.email}</span></li>
                    )}
                    {settings?.orari && (
                      <li><span className="text-gray-600 text-xs uppercase tracking-wide block mb-0.5">Orari</span><span className="text-gray-700">{settings.orari}</span></li>
                    )}
                    {(settings?.piva || settings?.rea) && (
                      <li className="pt-2 border-t border-[var(--brand-border)]"><span className="text-gray-600 text-xs">{[settings?.piva, settings?.rea].filter(Boolean).join(" · ")}</span></li>
                    )}
                  </ul>
                </CardContent>
              </Card>
              {certificazioni.length > 0 && (
                <Card>
                  <CardContent className="p-6 flex flex-col gap-4">
                    <h3 className="font-semibold text-[var(--brand-navy)]">Certificazioni</h3>
                    <div className="flex flex-col gap-3">
                      {certificazioni.map((c) => (
                        <div key={c._key} className="flex flex-col">
                          <span className="font-semibold text-sm text-[var(--brand-navy)]">{c.titolo}</span>
                          <span className="text-xs text-gray-500">{[c.ente, c.dal ? `dal ${c.dal}` : null].filter(Boolean).join(" · ")}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </SectionContainer>
      </Section>
    </>
  )
}
