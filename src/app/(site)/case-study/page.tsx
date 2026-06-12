import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
  SectionGrid,
} from "@/components/ui/section"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getCaseStudy } from "@/sanity/queries"

export const revalidate = 3600

export default async function CaseStudy() {
  const casi = await getCaseStudy()
  const [primo, ...restanti] = casi

  // n8n: PROMPT-18-BREADCRUMB — aggiorna url_sito con il dominio reale del cliente
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.brandpmi.it" },
      { "@type": "ListItem", "position": 2, "name": "Case Study" },
    ],
  }

  return (
    <>
      <h1 className="sr-only">Case Study</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <Section variant="muted" size="lg">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Risultati concreti</SectionTagline>
            <SectionTitle className="text-[40px] md:text-[52px]">Casi studio dai nostri clienti</SectionTitle>
            <SectionDescription>Sfide reali, numeri reali. Come abbiamo aiutato aziende manifatturiere italiane ed europee a migliorare qualità, lead time e costi di fornitura.</SectionDescription>
          </SectionHeader>
        </SectionContainer>
      </Section>

      {primo && (
        <Section variant="default">
          <SectionContainer>
            <Card id={primo.slug ?? undefined} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px] bg-[var(--brand-surface)]">
                  {primo.immagine_url && (
                    <Image
                      src={primo.immagine_url}
                      alt={primo.immagine_alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>
                <CardContent className="p-8 flex flex-col gap-6 justify-center">
                  <p className="text-xs font-medium text-[var(--brand-teal)] uppercase tracking-widest">{primo.settore}</p>
                  <h2 className="text-2xl font-bold text-[var(--brand-navy)] leading-tight">{primo.titolo}</h2>
                  {primo.metriche && primo.metriche.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {primo.metriche.map((m) => (
                        <div key={m._key} className="border border-[var(--brand-border)] rounded p-3 text-center">
                          <p className="text-2xl font-bold text-[var(--brand-navy)]">{m.valore}</p>
                          <p className="text-xs text-gray-500">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed">{primo.descrizione_completa}</p>
                  {primo.slug && (
                    <div>
                      <Button render={<Link href={`/case-study#${primo.slug}`} />}>Leggi il caso completo →</Button>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          </SectionContainer>
        </Section>
      )}

      {restanti.length > 0 && (
        <Section variant="muted">
          <SectionContainer>
            <SectionGrid cols={2}>
              {restanti.map((c) => (
                <Card key={c._id} id={c.slug ?? undefined} className="flex flex-col overflow-hidden">
                  <div className="relative h-56 bg-[var(--brand-surface)]">
                    {c.immagine_url && (
                      <Image
                        src={c.immagine_url}
                        alt={c.immagine_alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col gap-4 flex-1">
                    <p className="text-xs font-medium text-[var(--brand-teal)] uppercase tracking-widest">{c.settore}</p>
                    <h2 className="text-lg font-bold text-[var(--brand-navy)] leading-snug">{c.titolo}</h2>
                    {c.metriche && c.metriche.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {c.metriche.map((m) => (
                          <div key={m._key} className="border border-[var(--brand-border)] rounded p-3 text-center">
                            <p className="text-2xl font-bold text-[var(--brand-navy)]">{m.valore}</p>
                            <p className="text-xs text-gray-500">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-gray-600 leading-relaxed">{c.descrizione_completa}</p>
                  </CardContent>
                  {c.slug && (
                    <CardFooter>
                      <Button variant="link" render={<Link href={`/case-study#${c.slug}`} />}>Leggi il caso →</Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </SectionGrid>
          </SectionContainer>
        </Section>
      )}
    </>
  )
}
