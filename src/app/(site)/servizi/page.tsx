import Image from "next/image"
import {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section"
import { getServizi } from "@/sanity/queries"

export const revalidate = 3600

export default async function Servizi() {
  const servizi = await getServizi()

  return (
    <>
      <Section variant="muted" size="lg">
        <SectionContainer>
          <SectionHeader align="center">
            <SectionTagline>Capacità produttiva</SectionTagline>
            <SectionTitle className="text-[40px] md:text-[52px]">
              Lavorazioni e servizi per l&apos;industria
            </SectionTitle>
            <SectionDescription>
              Una filiera produttiva completa — dalla prototipazione al trattamento
              superficiale — con qualità certificata ISO 9001 e consegne puntuali in
              tutta Europa.
            </SectionDescription>
          </SectionHeader>
        </SectionContainer>
      </Section>

      {servizi.map((s, i) => (
        <section
          key={s._id}
          id={s.slug}
          className="py-16 border-b border-[var(--brand-border)]"
          style={{ background: i % 2 === 0 ? "white" : "var(--brand-surface)" }}
        >
          <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--brand-border)] bg-[var(--brand-surface)]">
              {s.immagine_url && (
                <Image
                  src={s.immagine_url}
                  alt={s.immagine_alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--brand-navy)] leading-tight">{s.titolo}</h2>
              <p className="text-gray-600 leading-relaxed">{s.descrizione_completa}</p>
              {s.punti_chiave?.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {s.punti_chiave.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[var(--brand-teal)] font-bold shrink-0">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
