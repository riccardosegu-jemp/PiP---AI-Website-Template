import Image from "next/image"
import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
  SectionGrid,
} from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { ContactFormPreview } from "@/components/contact-form-preview"
import type { Metadata } from "next"
import { getChiSiamo, getSiteSettings } from "@/sanity/queries"
import { buildMetadata, SEO_DEFAULTS, siteUrl } from "@/lib/seo"

export const revalidate = 3600

// Title/description per Google: dai campi SEO di Sanity, con fallback ai default.
export async function generateMetadata(): Promise<Metadata> {
  const cs = await getChiSiamo()
  return buildMetadata(cs?.seo, SEO_DEFAULTS.chiSiamo)
}

export default async function ChiSiamo() {
  const [cs, settings] = await Promise.all([getChiSiamo(), getSiteSettings()])

  const heroImg = cs?.hero_immagine_url ?? "/images/chi-siamo/hero.jpg"
  const sedeImg = cs?.sede_immagine_url ?? "/images/sede.jpg"
  const certificazioni = settings?.certificazioni ?? []
  const indirizzo = [settings?.indirizzo, settings?.citta].filter(Boolean).join(", ")
  const base = siteUrl(settings?.url_sito)

  // Il dominio (Home) arriva da Sanity tramite `base`.
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": base },
      { "@type": "ListItem", "position": 2, "name": "Chi Siamo" },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <section className="relative min-h-[60vh] flex items-end">
        <Image src={heroImg} alt={cs?.hero_immagine_alt || "Officina meccanica"} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[var(--brand-navy)]/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">{cs?.hero_headline}</h1>
        </div>
      </section>

      <Section variant="default">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-5">
              <SectionHeader>
                {cs?.storia_tagline && <SectionTagline>{cs.storia_tagline}</SectionTagline>}
                <SectionTitle>{cs?.storia_titolo}</SectionTitle>
              </SectionHeader>
              {(cs?.storia_narrativa ?? []).map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p>
              ))}
            </div>
            <div className="flex flex-col pt-4">
              {(cs?.timeline ?? []).map((item, i, arr) => (
                <div key={item._key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--brand-navy)] shrink-0 mt-1" />
                    {i < arr.length - 1 && <div className="w-px flex-1 bg-[var(--brand-border)] my-1" />}
                  </div>
                  <div className="pb-6">
                    <p className="font-bold text-[var(--brand-navy)] text-sm">{item.anno}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{item.testo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </Section>

      <Section variant="muted">
        <SectionContainer>
          <SectionHeader align="center">
            {cs?.valori_tagline && <SectionTagline>{cs.valori_tagline}</SectionTagline>}
            <SectionTitle>{cs?.valori_titolo}</SectionTitle>
            <SectionDescription>{cs?.valori_descrizione}</SectionDescription>
          </SectionHeader>
          <SectionGrid cols={3}>
            {(cs?.valori ?? []).map((v) => (
              <Card key={v._key}>
                <CardContent className="p-6 flex flex-col gap-3">
                  {v.numero && (
                    <span className="w-8 h-8 rounded-full bg-[var(--brand-navy)] text-white flex items-center justify-center text-sm font-bold">{v.numero}</span>
                  )}
                  <h3 className="font-semibold text-[var(--brand-navy)]">{v.titolo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.descrizione}</p>
                </CardContent>
              </Card>
            ))}
          </SectionGrid>
        </SectionContainer>
      </Section>

      {certificazioni.length > 0 && (
        <Section variant="default">
          <SectionContainer>
            <SectionHeader align="center">
              {cs?.cert_tagline && <SectionTagline>{cs.cert_tagline}</SectionTagline>}
              <SectionTitle>{cs?.cert_titolo}</SectionTitle>
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certificazioni.map((c) => (
                <Card key={c._key}>
                  <CardContent className="p-6 flex flex-col gap-1">
                    <p className="font-bold text-[var(--brand-navy)] text-lg">{c.titolo}</p>
                    <p className="text-sm text-gray-500">{c.ente}</p>
                    {c.dal && <p className="text-xs text-gray-600">Certificato dal {c.dal}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      <Section variant="muted">
        <SectionContainer>
          <SectionHeader align="center">
            {cs?.team_tagline && <SectionTagline>{cs.team_tagline}</SectionTagline>}
            <SectionTitle>{cs?.team_titolo}</SectionTitle>
            <SectionDescription>{cs?.team_descrizione}</SectionDescription>
          </SectionHeader>
          <SectionGrid cols={3}>
            {(cs?.team ?? []).map((m) => (
              <Card key={m._key} className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-[var(--brand-surface)]">
                  {m.foto_url && (
                    <Image src={m.foto_url} alt={m.foto_alt || m.nome || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  )}
                </div>
                <CardContent className="p-5 flex flex-col gap-2">
                  <h3 className="font-bold text-[var(--brand-navy)]">{m.nome}</h3>
                  <p className="text-xs font-medium text-[var(--brand-teal)] uppercase tracking-wide">{m.ruolo}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </SectionGrid>
        </SectionContainer>
      </Section>

      <Section variant="default">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--brand-border)] bg-[var(--brand-surface)]">
              <Image src={sedeImg} alt={cs?.sede_immagine_alt || "Stabilimento produttivo"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col gap-6">
              <SectionHeader>
                {cs?.sede_tagline && <SectionTagline>{cs.sede_tagline}</SectionTagline>}
                <SectionTitle>{cs?.sede_titolo}</SectionTitle>
                <SectionDescription>{cs?.sede_descrizione}</SectionDescription>
              </SectionHeader>
              <ul className="flex flex-col gap-2">
                {(cs?.sede_punti ?? []).map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[var(--brand-teal)] font-bold shrink-0 mt-0.5">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionContainer>
      </Section>

      <Section variant="muted">
        <SectionContainer>
          <div id="form" className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <SectionHeader>
                {cs?.contatti_tagline && <SectionTagline>{cs.contatti_tagline}</SectionTagline>}
                <SectionTitle>{cs?.contatti_titolo}</SectionTitle>
                <SectionDescription>{cs?.contatti_descrizione}</SectionDescription>
              </SectionHeader>
              <ul className="flex flex-col gap-4">
                {settings?.telefono && (
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    {settings.telefono}
                  </li>
                )}
                {settings?.email && (
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    {settings.email}
                  </li>
                )}
                {indirizzo && (
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {indirizzo}
                  </li>
                )}
                {settings?.orari && (
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-[var(--brand-teal)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {settings.orari}
                  </li>
                )}
              </ul>
            </div>
            <ContactFormPreview />
          </div>
        </SectionContainer>
      </Section>
    </>
  )
}
