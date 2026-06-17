import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageSquare, Paperclip, Wrench, CheckCircle2, Truck, Settings2, Layers, Shield, ClipboardCheck, Drill, PackageCheck, Target, User, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactFormPreview } from "@/components/contact-form-preview"
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
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import type { Metadata } from "next"
import { getHomepage, getServizi, getCaseStudy, getSiteSettings } from "@/sanity/queries"
import { buildMetadata, SEO_DEFAULTS } from "@/lib/seo"

export const revalidate = 3600

// Title/description per Google: dai campi SEO di Sanity, con fallback ai default.
export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomepage()
  return buildMetadata(home?.seo, SEO_DEFAULTS.home)
}

// Mappa id-icona (stringa) → componente lucide.
// Sanity può salvare solo stringhe, non componenti React: quindi nel CMS si sceglie
// un id (es. "shield") da una lista, e qui lo traduciamo nell'icona corrispondente.
// Tre mappe separate perché le tre sezioni usano dimensioni diverse (w-6 / w-7 / w-5).
// Gli id validi sono definiti nelle "options.list" dei rispettivi schema Sanity
// (servizio.ts per ICONS, homepage.ts per PROCESSO_ICONS e FEATURE_ICONS).
const ICONS: Record<string, React.ReactNode> = {
  "settings2": <Settings2 className="w-6 h-6" />,
  "layers": <Layers className="w-6 h-6" />,
  "shield": <Shield className="w-6 h-6" />,
  "clipboard-check": <ClipboardCheck className="w-6 h-6" />,
  "drill": <Drill className="w-6 h-6" />,
  "package-check": <PackageCheck className="w-6 h-6" />,
}
const PROCESSO_ICONS: Record<string, React.ReactNode> = {
  "message-square": <MessageSquare className="w-7 h-7" />,
  "paperclip": <Paperclip className="w-7 h-7" />,
  "wrench": <Wrench className="w-7 h-7" />,
  "check-circle-2": <CheckCircle2 className="w-7 h-7" />,
  "truck": <Truck className="w-7 h-7" />,
}
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "target": <Target className="w-5 h-5" />,
  "user": <User className="w-5 h-5" />,
  "check-circle-2": <CheckCircle2 className="w-5 h-5" />,
  "refresh-cw": <RefreshCw className="w-5 h-5" />,
}

export default async function Home() {
  const [home, servizi, casi, settings] = await Promise.all([
    getHomepage(),
    getServizi(),
    getCaseStudy(),
    getSiteSettings(),
  ])

  const heroImg = home?.hero_immagine_url ?? "/hero.jpg"
  const serviziPreview = servizi.slice(0, 6)
  const casiPreview = casi.slice(0, 3)

  const indirizzo = [settings?.indirizzo, settings?.citta].filter(Boolean).join(", ")

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[75vh] flex items-end">
        <Image src={heroImg} alt={home?.hero_immagine_alt || "Impianto di produzione industriale"} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[var(--brand-navy)]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 text-white w-full">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-6 leading-tight">{home?.hero_headline}</h1>
          <p className="text-white/80 text-xl max-w-2xl mb-10 leading-relaxed">{home?.hero_sottotitolo}</p>
          <div className="flex flex-wrap gap-4">
            {home?.hero_cta_primaria_testo && (
              <Button render={<Link href={home.hero_cta_primaria_href || "/contatti"} />}>{home.hero_cta_primaria_testo}</Button>
            )}
            {home?.hero_cta_secondaria_testo && (
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--brand-navy)]" render={<Link href={home.hero_cta_secondaria_href || "/servizi"} />}>{home.hero_cta_secondaria_testo}</Button>
            )}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      {home?.loghi_clienti && home.loghi_clienti.length > 0 && (
        <section className="py-8 border-y border-[var(--brand-border)] bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {home.trustbar_titolo && (
              <p className="text-xs text-center text-gray-600 uppercase tracking-widest mb-6">{home.trustbar_titolo}</p>
            )}
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              {home.loghi_clienti.map((l) =>
                l.url ? (
                  <div key={l._key} className="relative w-[120px] h-[40px]">
                    <Image src={l.url} alt={l.alt} fill className="object-contain grayscale opacity-50 hover:opacity-80 transition-opacity" sizes="120px" />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVIZI PREVIEW ── */}
      <Section variant="default">
        <SectionContainer>
          <SectionHeader align="center">
            {home?.servizi_tagline && <SectionTagline>{home.servizi_tagline}</SectionTagline>}
            <SectionTitle>{home?.servizi_titolo}</SectionTitle>
            <SectionDescription>{home?.servizi_descrizione}</SectionDescription>
          </SectionHeader>
          <SectionGrid cols={3}>
            {serviziPreview.map((s) => (
              <Card key={s._id} className="flex flex-col">
                <CardHeader>
                  <div className="text-[var(--brand-navy)] mb-2">
                    {(s.icona && ICONS[s.icona]) || <Settings2 className="w-6 h-6" />}
                  </div>
                  <CardTitle>{s.titolo}</CardTitle>
                  <CardDescription>{s.descrizione_breve ?? s.descrizione_completa}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button variant="link" render={<Link href={`/servizi${s.slug ? `#${s.slug}` : ""}`} />}>Scopri →</Button>
                </CardFooter>
              </Card>
            ))}
          </SectionGrid>
          <div className="flex justify-center mt-12">
            <Button variant="outline" render={<Link href="/servizi" />}>Vedi tutti i servizi →</Button>
          </div>
        </SectionContainer>
      </Section>

      {/* ── PROCESSO ── */}
      {home?.processo && home.processo.length > 0 && (
        <Section variant="muted">
          <SectionContainer>
            <SectionHeader align="center">
              {home.processo_tagline && <SectionTagline>{home.processo_tagline}</SectionTagline>}
              <SectionTitle>{home.processo_titolo}</SectionTitle>
              <SectionDescription>{home.processo_descrizione}</SectionDescription>
            </SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {home.processo.map((step) => (
                <Card key={step._key}>
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="text-[var(--brand-navy)] mb-1">
                      {(step.icona && PROCESSO_ICONS[step.icona]) || <Settings2 className="w-7 h-7" />}
                    </div>
                    <h3 className="font-bold text-[var(--brand-navy)]">
                      {step.numero ? `${step.numero}. ` : ""}{step.titolo}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.descrizione}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* ── CASE STUDY PREVIEW ── */}
      {casiPreview.length > 0 && (
        <Section variant="default">
          <SectionContainer>
            <SectionHeader align="center">
              {home?.casi_tagline && <SectionTagline>{home.casi_tagline}</SectionTagline>}
              <SectionTitle>{home?.casi_titolo}</SectionTitle>
              <SectionDescription>{home?.casi_descrizione}</SectionDescription>
            </SectionHeader>
            <SectionGrid cols={3}>
              {casiPreview.map((c) => (
                <Card key={c._id} className="flex flex-col overflow-hidden">
                  <div className="relative h-48 w-full bg-[var(--brand-surface)] shrink-0">
                    {c.immagine_url && (
                      <Image src={c.immagine_url} alt={c.immagine_alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    )}
                  </div>
                  <CardHeader>
                    {c.metriche && c.metriche.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {c.metriche.map((m) => (
                          <div key={m._key} className="border border-[var(--brand-border)] rounded p-2 text-center">
                            <p className="text-lg font-bold text-[var(--brand-navy)]">{m.valore}</p>
                            <p className="text-xs text-gray-500">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-[var(--brand-teal)] font-medium">{c.settore}</p>
                    <CardTitle className="text-sm leading-snug">{c.titolo}</CardTitle>
                    <CardDescription>{c.descrizione_breve}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button variant="link" render={<Link href={`/case-study${c.slug ? `#${c.slug}` : ""}`} />}>Leggi il caso →</Button>
                  </CardFooter>
                </Card>
              ))}
            </SectionGrid>
            <div className="flex justify-center mt-12">
              <Button variant="outline" render={<Link href="/case-study" />}>Vedi tutti i casi studio →</Button>
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* ── PERCHÉ SCEGLIERCI ── */}
      <Section variant="muted">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader>
                {home?.perche_tagline && <SectionTagline>{home.perche_tagline}</SectionTagline>}
                <SectionTitle>{home?.perche_titolo}</SectionTitle>
                <SectionDescription>{home?.perche_descrizione}</SectionDescription>
              </SectionHeader>
              <div className="flex flex-col gap-6 mt-2">
                {(home?.features ?? []).map((f) => (
                  <div key={f._key} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--brand-navy)] border border-[var(--brand-border)]">
                      {(f.icona && FEATURE_ICONS[f.icona]) || <CheckCircle2 className="w-5 h-5" />}
                    </span>
                    <div>
                      <h3 className="font-semibold text-[var(--brand-navy)] mb-1">{f.titolo}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{f.descrizione}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(home?.stats ?? []).map((s) => (
                <Card key={s._key}>
                  <CardContent className="p-6 text-center">
                    <p className="text-5xl font-bold text-[var(--brand-navy)]">{s.valore}</p>
                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                    {s.descrizione && <p className="text-xs text-gray-600 mt-1">{s.descrizione}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* ── CONTATTI PREVIEW ── */}
      <Section variant="default">
        <SectionContainer>
          <div id="form" className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <SectionHeader>
                {home?.contatti_tagline && <SectionTagline>{home.contatti_tagline}</SectionTagline>}
                <SectionTitle>{home?.contatti_titolo}</SectionTitle>
                <SectionDescription>{home?.contatti_descrizione}</SectionDescription>
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
