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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { LpFaq } from "@/components/lp-faq"
import { LpHeroMedia } from "@/components/lp-hero-media"
import type { Metadata } from "next"
import { getLandingProdotto, getSiteSettings } from "@/sanity/queries"
import { buildMetadata, SEO_DEFAULTS } from "@/lib/seo"

export const revalidate = 3600

// Title/description per Google: dai campi SEO di Sanity, con fallback ai default.
export async function generateMetadata(): Promise<Metadata> {
  const lp = await getLandingProdotto()
  return buildMetadata(lp?.seo, SEO_DEFAULTS.landing)
}

const HERO_IMG_FALLBACK = "/images/lp/rapid5-componente.jpg"
const SPEC_IMG_FALLBACK = "/images/lp/rapid5-cnc.jpg"
const RECENSORE_IMG_FALLBACK = "/images/recensori/davide.jpg"
const PDF_FALLBACK = "/docs/rapid5-scheda-servizio.pdf"

export default async function LandingPage() {
  const [lp, settings] = await Promise.all([getLandingProdotto(), getSiteSettings()])

  const logo = lp?.logo_url ?? settings?.logo_url ?? "/logo.svg"
  const nome = lp?.nome_prodotto ?? "Rapid5"
  const heroImg = lp?.hero_immagine_url ?? HERO_IMG_FALLBACK
  const specImg = lp?.specifiche_immagine_url ?? SPEC_IMG_FALLBACK
  const recensoreImg = lp?.recensione_foto_url ?? RECENSORE_IMG_FALLBACK
  const pdfHref = lp?.specifiche_cta_pdf_url ?? PDF_FALLBACK
  const faqEmail = settings?.email ?? "info@brandpmi.it"
  const stelle = Math.max(0, Math.min(5, lp?.recensione_stelle ?? 5))

  // ── Schema markup JSON-LD (ognuno generato SOLO se ci sono i dati) ──
  // n8n: PROMPT-SEO — sostituire il dominio con quello reale del cliente
  const LP_URL = "https://www.brandpmi.it/lp/lancio-prodotto"
  const metaTitle = lp?.seo?.meta_title?.trim() || SEO_DEFAULTS.landing.title
  const metaDesc = lp?.seo?.meta_description?.trim() || SEO_DEFAULTS.landing.description

  const schemas: Record<string, unknown>[] = [
    { "@context": "https://schema.org", "@type": "WebPage", name: metaTitle, description: metaDesc, url: LP_URL },
  ]

  // FAQPage — solo se ci sono domande (utile per i rich result e per la GEO/AI)
  if (lp?.faq && lp.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: lp.faq.map((f) => ({
        "@type": "Question",
        name: f.domanda,
        acceptedAnswer: { "@type": "Answer", text: f.risposta },
      })),
    })
  }

  // Review + Person — solo se c'è un testimonial
  if (lp?.recensione_testo) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Review",
      reviewBody: lp.recensione_testo,
      author: { "@type": "Person", name: lp.recensione_nome ?? undefined, jobTitle: lp.recensione_ruolo ?? undefined },
      reviewRating: { "@type": "Rating", ratingValue: stelle, bestRating: 5 },
      itemReviewed: { "@type": "Product", name: nome },
    })
  }

  // Offer — solo se cta_prezzo contiene un numero (formato IT: '.' migliaia, ',' decimali)
  const rawPrezzo = lp?.cta_prezzo?.match(/\d[\d.,]*/)?.[0]
  const price = rawPrezzo
    ? (rawPrezzo.includes(",") ? rawPrezzo.replace(/\./g, "").replace(",", ".") : rawPrezzo.replace(/\./g, ""))
    : null
  if (price && !Number.isNaN(Number(price))) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Offer",
      name: lp?.cta_headline ?? nome,
      price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: LP_URL,
    })
  }

  // VideoObject — solo se è stato caricato un video in Sanity (campo "Video" della landing)
  if (lp?.video?.url) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: lp.video.titolo ?? nome,
      description: lp.video.descrizione ?? metaDesc,
      thumbnailUrl: lp.video.thumbnail_url ?? undefined,
      uploadDate: lp.video.data_caricamento ?? undefined,
      contentUrl: lp.video.url,
    })
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      {/* ── NAVBAR LP ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {logo && (
              <Image src={logo} alt={lp?.logo_alt || `Logo ${nome}`} width={32} height={32} className="shrink-0" />
            )}
            <span className="font-bold text-[var(--brand-navy)] text-base leading-none">{nome}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {(lp?.navbar_links ?? []).map((l) => (
              <Link key={l._key} href={l.href || "#"} className="text-sm text-gray-600 hover:text-[var(--brand-navy)] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          {lp?.navbar_cta_testo && (
            <Button size="sm" render={<Link href={lp.navbar_cta_href || "#cta"} />}>{lp.navbar_cta_testo}</Button>
          )}
        </div>
      </header>

      {/* ── HERO LP ── */}
      <Section variant="default" size="lg">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="text-6xl md:text-8xl font-bold text-[var(--brand-navy)] leading-none tracking-tight">{nome}</h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">{lp?.hero_tagline}</p>
              {lp?.hero_metriche && lp.hero_metriche.length > 0 && (
                <div className="flex flex-wrap gap-8">
                  {lp.hero_metriche.map((m) => (
                    <div key={m._key} className="flex flex-col gap-0.5">
                      <span className="text-2xl font-bold text-[var(--brand-navy)]">{m.valore}</span>
                      <span className="text-xs text-gray-500">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {lp?.hero_cta_primaria_testo && (
                  <Button render={<Link href={lp.hero_cta_primaria_href || "#cta"} />}>{lp.hero_cta_primaria_testo}</Button>
                )}
                {lp?.hero_cta_secondaria_testo && (
                  <Button variant="outline" render={<Link href={lp.hero_cta_secondaria_href || "#benefici"} />}>{lp.hero_cta_secondaria_testo}</Button>
                )}
              </div>
            </div>
            <LpHeroMedia
              videoUrl={lp?.video?.url}
              posterUrl={lp?.video?.thumbnail_url}
              imageUrl={heroImg}
              imageAlt={lp?.hero_immagine_alt || "Componente di precisione"}
            />
          </div>
        </SectionContainer>
      </Section>

      {/* ── CLAIM ── */}
      <Section variant="muted">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-4">
            {lp?.claim_label && (
              <p className="text-xs uppercase tracking-widest text-[var(--brand-teal)] font-semibold">{lp.claim_label}</p>
            )}
            <p className="text-3xl md:text-5xl font-bold leading-tight text-[var(--brand-navy)]">
              {lp?.claim_testo_prima}{" "}
              {lp?.claim_parola_evidenziata && <span className="text-[var(--brand-teal)]">{lp.claim_parola_evidenziata}</span>}
            </p>
            {lp?.claim_attribuzione && (
              <p className="text-sm text-gray-400 mt-2">{lp.claim_attribuzione}</p>
            )}
          </div>
        </SectionContainer>
      </Section>

      {/* ── BENEFICI ── */}
      <div id="benefici">
        <Section variant="default">
          <SectionContainer>
            <SectionHeader align="center">
              {lp?.benefici_tagline && <SectionTagline>{lp.benefici_tagline}</SectionTagline>}
              <SectionTitle>{lp?.benefici_titolo}</SectionTitle>
              <SectionDescription>{lp?.benefici_descrizione}</SectionDescription>
            </SectionHeader>
            <SectionGrid cols={3}>
              {(lp?.benefici ?? []).map((b) => (
                <Card key={b._key}>
                  <CardHeader>
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-navy)] flex items-center justify-center mb-3">
                      <span className="text-sm font-bold text-[var(--brand-navy)]">{b.numero}</span>
                    </div>
                    <CardTitle>{b.titolo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 leading-relaxed">{b.descrizione}</p>
                  </CardContent>
                </Card>
              ))}
            </SectionGrid>
          </SectionContainer>
        </Section>
      </div>

      {/* ── SPECIFICHE ── */}
      <div id="specifiche">
        <Section variant="muted">
          <SectionContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-6">
                <SectionHeader>
                  {lp?.specifiche_tagline && <SectionTagline>{lp.specifiche_tagline}</SectionTagline>}
                  <SectionTitle>{lp?.specifiche_titolo}</SectionTitle>
                  <SectionDescription>{lp?.specifiche_descrizione}</SectionDescription>
                </SectionHeader>
                <dl className="divide-y divide-[var(--brand-border)]">
                  {(lp?.specifiche_voci ?? []).map((s) => (
                    <div key={s._key} className="flex justify-between py-3">
                      <dt className="text-sm text-gray-500">{s.nome}</dt>
                      <dd className="text-sm font-semibold text-[var(--brand-navy)]">{s.valore}</dd>
                    </div>
                  ))}
                </dl>
                {lp?.specifiche_cta_pdf_testo && (
                  <Button variant="outline" className="self-start" render={<Link href={pdfHref} />}>
                    {lp.specifiche_cta_pdf_testo}
                  </Button>
                )}
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--brand-border)] bg-white">
                <Image src={specImg} alt={lp?.specifiche_immagine_alt || "Lavorazione CNC"} fill className="object-contain p-6" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </SectionContainer>
        </Section>
      </div>

      {/* ── FAQ ── */}
      <div id="faq">
        <Section variant="default">
          <SectionContainer>
            <SectionHeader align="center">
              {lp?.faq_tagline && <SectionTagline>{lp.faq_tagline}</SectionTagline>}
              <SectionTitle>{lp?.faq_titolo}</SectionTitle>
              <SectionDescription>
                {lp?.faq_descrizione}{" "}
                <span className="text-[var(--brand-navy)] font-medium">{faqEmail}</span>
              </SectionDescription>
            </SectionHeader>
            <div className="max-w-2xl mx-auto">
              <LpFaq items={lp?.faq ?? []} />
            </div>
          </SectionContainer>
        </Section>
      </div>

      {/* ── SOCIAL PROOF ── */}
      <div id="recensioni">
        {/* Logo bar */}
        {lp?.social_loghi && lp.social_loghi.length > 0 && (
          <Section variant="muted">
            <SectionContainer>
              {lp.social_label_loghi && (
                <p className="text-xs text-center text-gray-400 uppercase tracking-widest mb-8">{lp.social_label_loghi}</p>
              )}
              <div className="flex items-center justify-center gap-12 flex-wrap">
                {lp.social_loghi.map((l) =>
                  l.url ? (
                    <div key={l._key} className="relative w-[120px] h-[40px]">
                      <Image src={l.url} alt={l.alt} fill className="object-contain grayscale opacity-50 hover:opacity-80 transition-opacity" sizes="120px" />
                    </div>
                  ) : null,
                )}
              </div>
            </SectionContainer>
          </Section>
        )}

        {/* Recensione */}
        {lp?.recensione_testo && (
          <Section variant="default">
            <SectionContainer>
              <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
                <div className="flex justify-center gap-1 text-yellow-400 text-2xl">{"★".repeat(stelle)}</div>
                <p className="text-lg italic text-gray-700 leading-relaxed">&ldquo;{lp.recensione_testo}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--brand-border)] bg-[var(--brand-surface)] shrink-0">
                    <Image src={recensoreImg} alt={lp.recensione_foto_alt || lp.recensione_nome || ""} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[var(--brand-navy)]">{lp.recensione_nome}</p>
                    <p className="text-xs text-gray-500">{lp.recensione_ruolo}</p>
                  </div>
                </div>
              </div>
            </SectionContainer>
          </Section>
        )}
      </div>

      {/* ── CTA FINALE ── */}
      <div id="cta">
        <Section variant="navy">
          <SectionContainer>
            <div className="text-center flex flex-col items-center gap-6">
              {lp?.cta_label && (
                <p className="text-xs uppercase tracking-widest text-[var(--brand-teal)] font-semibold">{lp.cta_label}</p>
              )}
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{lp?.cta_headline}</h2>
              <p className="text-white/70 max-w-md">{lp?.cta_sottotitolo}</p>
              {lp?.cta_prezzo && <p className="text-4xl font-bold text-white">{lp.cta_prezzo}</p>}
              {lp?.cta_testo && (
                <Button variant="accent" className="text-base px-8 py-3 h-auto" render={<Link href={lp.cta_href || "/contatti#form"} />}>
                  {lp.cta_testo}
                </Button>
              )}
            </div>
          </SectionContainer>
        </Section>
      </div>

      {/* ── FOOTER LP ── */}
      <footer className="bg-[var(--brand-navy)] py-6 pb-20">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {logo && (
              <Image src={logo} alt={lp?.logo_alt || `Logo ${nome}`} width={28} height={28} className="brightness-0 invert shrink-0" />
            )}
            <span className="text-sm text-white/60">
              {[lp?.footer_copyright, lp?.footer_piva].filter(Boolean).join(" · ")}
            </span>
          </div>
          <div className="flex items-center gap-6">
            {(lp?.footer_links ?? []).map((l) => {
              const external = l.href?.startsWith("http")
              return external ? (
                <a key={l._key} href={l.href || "#"} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white transition-colors">
                  {l.label}
                </a>
              ) : (
                <Link key={l._key} href={l.href || "#"} className="text-xs text-white/50 hover:text-white transition-colors">
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      </footer>

      {/* ── STICKY BAR ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[var(--brand-border)] py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4">
          {lp?.sticky_secondario_testo && (
            <Button variant="outline" render={<Link href={lp.sticky_secondario_href || "#faq"} />}>{lp.sticky_secondario_testo}</Button>
          )}
          {lp?.sticky_primario_testo && (
            <Button render={<Link href={lp.sticky_primario_href || "/contatti#form"} />}>{lp.sticky_primario_testo}</Button>
          )}
        </div>
      </div>
    </>
  )
}
