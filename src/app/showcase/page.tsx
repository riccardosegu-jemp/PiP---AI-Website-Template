import { Button, IconButton, ButtonGroup } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { StarIcon, BookmarkIcon, HeartIcon } from "lucide-react"
import { DialogDemo }       from "@/components/showcase/dialog-demo"
import { MenuDemo }         from "@/components/showcase/menu-demo"
import { NavigationDemo }   from "@/components/showcase/navigation-demo"
import { NotificationsDemo } from "@/components/showcase/notifications-demo"
import { PaginationDemo }   from "@/components/showcase/pagination-demo"
import { SectionsDemo }     from "@/components/showcase/sections-demo"
import { TagsTooltipDemo }  from "@/components/showcase/tags-tooltip-demo"
import { Input }      from "@/components/ui/input"
import { Textarea }   from "@/components/ui/textarea"
import { FormField }  from "@/components/ui/form-field"

// ── helpers ────────────────────────────────────────────────────────────────

function GroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 pt-8 pb-2">
      <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--brand-navy)] opacity-40 shrink-0">
        {label}
      </span>
      <div className="flex-1 border-t border-[var(--brand-border)]" />
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-semibold text-[var(--brand-navy)] border-b border-[var(--brand-border)] pb-3">
      {title}
    </h2>
  )
}

// ── page ───────────────────────────────────────────────────────────────────

export default function Showcase() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-4xl font-bold text-[var(--brand-navy)]">
          Component Showcase
        </h1>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          FOUNDATION
      ════════════════════════════════════════════════════════════════ */}
      <GroupDivider label="Foundation" />

      {/* Brand Colors */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Colori brand" />
        <div className="flex flex-wrap gap-6">
          {[
            { name: "Navy",       hex: "#1b3a5c",  bg: "bg-[#1b3a5c]" },
            { name: "Navy Dark",  hex: "#0f2740",  bg: "bg-[#0f2740]" },
            { name: "Navy Light", hex: "#2b5278",  bg: "bg-[#2b5278]" },
            { name: "Teal",       hex: "#2a7f6f",  bg: "bg-[#2a7f6f]" },
            { name: "Teal Light", hex: "#3dae9b",  bg: "bg-[#3dae9b]" },
            { name: "Surface",    hex: "#f8f9fb",  bg: "bg-[#f8f9fb] border border-gray-200" },
            { name: "Border",     hex: "#e5e9ef",  bg: "bg-[#e5e9ef]" },
          ].map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 rounded-[var(--radius-200)] ${c.bg}`} />
              <p className="text-xs font-semibold text-gray-700">{c.name}</p>
              <p className="text-xs font-mono text-gray-400">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Tipografia" />
        <div className="flex flex-col gap-8">

          {/* Type roles */}
          {[
            {
              role: "Title Page",
              desc: "family-sans · bold · scale-07/08/09",
              rows: [
                { label: "sm — 40px", size: "text-[40px]", weight: "font-bold" },
                { label: "md — 48px", size: "text-[48px]", weight: "font-bold", highlight: true },
                { label: "lg — 56px", size: "text-[56px]", weight: "font-bold" },
              ],
            },
            {
              role: "Subtitle",
              desc: "family-sans · regular · scale-05/06/07",
              rows: [
                { label: "sm — 24px", size: "text-2xl",    weight: "font-normal" },
                { label: "md — 32px", size: "text-[32px]", weight: "font-normal", highlight: true },
                { label: "lg — 40px", size: "text-[40px]", weight: "font-normal" },
              ],
            },
            {
              role: "Heading",
              desc: "family-sans · semibold · scale-04/05/06",
              rows: [
                { label: "sm — 20px", size: "text-xl",     weight: "font-semibold" },
                { label: "md — 24px", size: "text-2xl",    weight: "font-semibold", highlight: true },
                { label: "lg — 32px", size: "text-[32px]", weight: "font-semibold" },
              ],
            },
            {
              role: "Subheading",
              desc: "family-sans · regular · scale-03/04/05",
              rows: [
                { label: "sm — 16px", size: "text-base", weight: "font-normal" },
                { label: "md — 20px", size: "text-xl",   weight: "font-normal", highlight: true },
                { label: "lg — 24px", size: "text-2xl",  weight: "font-normal" },
              ],
            },
          ].map((block) => (
            <div key={block.role} className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <p className="text-sm font-semibold text-[var(--brand-navy)]">{block.role}</p>
                <p className="text-xs text-gray-400">{block.desc}</p>
              </div>
              <div className="flex flex-col border border-[var(--brand-border)] rounded-[var(--radius-200)] overflow-hidden divide-y divide-[var(--brand-border)]">
                {block.rows.map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center gap-6 px-4 py-3 ${row.highlight ? "bg-amber-50" : "bg-white"}`}
                  >
                    <span className={`text-xs w-28 shrink-0 font-mono ${row.highlight ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                      {row.label}
                    </span>
                    <p className={`${row.size} ${row.weight} text-[var(--brand-navy)] leading-tight`}>
                      {block.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Body styles */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-3">
              <p className="text-sm font-semibold text-[var(--brand-navy)]">Body</p>
              <p className="text-xs text-gray-400">family-sans · scale-02/03/04 · regular / semibold / italic</p>
            </div>
            <div className="flex flex-col border border-[var(--brand-border)] rounded-[var(--radius-200)] overflow-hidden divide-y divide-[var(--brand-border)]">
              {[
                { label: "Base 16px",        cls: "text-base font-normal",        sample: "Body Base — testo standard per i paragrafi" },
                { label: "Strong 16px",       cls: "text-base font-semibold",      sample: "Body Strong — enfasi nel testo corrente", highlight: true },
                { label: "Emphasis 16px",     cls: "text-base font-normal italic", sample: "Body Emphasis — testo in corsivo" },
                { label: "Small 14px",        cls: "text-sm font-normal",          sample: "Body Small — note, caption, testo secondario" },
                { label: "Small Strong 14px", cls: "text-sm font-semibold",        sample: "Body Small Strong — enfasi su testo piccolo" },
              ].map((row) => (
                <div key={row.label} className={`flex items-center gap-6 px-4 py-3 ${row.highlight ? "bg-amber-50" : "bg-white"}`}>
                  <span className={`text-xs w-36 shrink-0 font-mono ${row.highlight ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                    {row.label}
                  </span>
                  <p className={`${row.cls} text-gray-700`}>{row.sample}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Font families */}
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--brand-surface)] border border-[var(--brand-border)] rounded-[var(--radius-100)] text-xs text-gray-600">
              <span className="font-semibold text-[var(--brand-navy)]">Aa</span> Inter — family-sans
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--brand-surface)] border border-[var(--brand-border)] rounded-[var(--radius-100)] text-xs text-gray-600 font-mono">
              <span className="font-semibold">Aa</span> Roboto Mono — family-mono
            </span>
          </div>

        </div>
      </section>

      {/* Spacing */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Spacing" />
        <div className="flex flex-wrap items-end gap-6">
          {[
            { name: "050",  size: "2px",  w: "w-0.5" },
            { name: "100",  size: "4px",  w: "w-1" },
            { name: "200",  size: "8px",  w: "w-2" },
            { name: "300",  size: "12px", w: "w-3" },
            { name: "400",  size: "16px", w: "w-4" },
            { name: "600",  size: "24px", w: "w-6" },
            { name: "800",  size: "32px", w: "w-8" },
            { name: "1200", size: "48px", w: "w-12" },
            { name: "1600", size: "64px", w: "w-16" },
          ].map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div
                className={`${s.w} bg-[var(--brand-teal)] rounded`}
                style={{ height: "40px" }}
              />
              <p className="text-xs font-mono text-gray-500">{s.name}</p>
              <p className="text-xs text-gray-400">{s.size}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ATOMS
      ════════════════════════════════════════════════════════════════ */}
      <GroupDivider label="Atoms" />

      {/* Button */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Button" />

        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Varianti</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Dimensioni</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabilitato</Button>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Icon Button</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">Medium (40px)</p>
              <div className="flex flex-wrap items-center gap-3">
                <IconButton variant="primary" size="md" aria-label="Preferiti"><StarIcon /></IconButton>
                <IconButton variant="neutral" size="md" aria-label="Salva"><BookmarkIcon /></IconButton>
                <IconButton variant="subtle"  size="md" aria-label="Mi piace"><HeartIcon /></IconButton>
                <IconButton variant="primary" size="md" aria-label="Disabilitato" disabled><StarIcon /></IconButton>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">Small (32px)</p>
              <div className="flex flex-wrap items-center gap-3">
                <IconButton variant="primary" size="sm" aria-label="Preferiti"><StarIcon /></IconButton>
                <IconButton variant="neutral" size="sm" aria-label="Salva"><BookmarkIcon /></IconButton>
                <IconButton variant="subtle"  size="sm" aria-label="Mi piace"><HeartIcon /></IconButton>
                <IconButton variant="primary" size="sm" aria-label="Disabilitato" disabled><StarIcon /></IconButton>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Button Group</p>
          <div className="flex flex-col gap-4 max-w-sm">
            {(["justify", "start", "end", "center", "stack"] as const).map((layout) => (
              <div key={layout} className="flex flex-col gap-1">
                <p className="text-xs text-gray-400 capitalize">{layout}</p>
                <ButtonGroup layout={layout}>
                  <Button variant="outline" size="sm">Button</Button>
                  <Button size="sm">Button</Button>
                </ButtonGroup>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tag & Tooltip */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Tag &amp; Tooltip" />
        <TagsTooltipDemo />
      </section>

      {/* Alert */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Alert" />
        <NotificationsDemo />
      </section>


      {/* ════════════════════════════════════════════════════════════════
          COMPONENTS
      ════════════════════════════════════════════════════════════════ */}
      <GroupDivider label="Components" />

      {/* Card */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Card" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Titolo card</CardTitle>
              <CardDescription>Descrizione breve del contenuto della card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Testo di esempio per mostrare come appare il contenuto all&apos;interno di una card standard.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Scopri di più</Button>
            </CardFooter>
          </Card>

          <Card className="border-[var(--brand-navy)] border-2">
            <CardHeader>
              <CardTitle className="text-[var(--brand-navy)]">Card Servizio</CardTitle>
              <CardDescription>Con bordo brand evidenziato</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Usata per evidenziare un servizio o un&apos;offerta principale.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Contattaci</Button>
              <Button size="sm" variant="outline">Dettagli</Button>
            </CardFooter>
          </Card>

          <Card className="bg-[var(--brand-navy)] text-white border-0">
            <CardHeader>
              <CardTitle className="text-white">Case Study</CardTitle>
              <CardDescription className="text-white/60">Variante dark con sfondo brand</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                Usata per mostrare risultati e case study con impatto visivo.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                size="sm"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[var(--brand-navy)]"
              >
                Leggi il caso
              </Button>
            </CardFooter>
          </Card>

        </div>
      </section>

      {/* Accordion */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Accordion" />
        <Accordion>
          <AccordionItem value="1">
            <AccordionTrigger>Quali servizi offrite?</AccordionTrigger>
            <AccordionContent>
              Offriamo soluzioni B2B complete per il settore manifatturiero: consulenza, progettazione e implementazione di sistemi industriali.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>Come posso richiedere un preventivo?</AccordionTrigger>
            <AccordionContent>
              Puoi contattarci tramite il form nella pagina Contatti oppure chiamarci direttamente. Risponderemo entro 24 ore lavorative.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger>In quali aree geografiche operate?</AccordionTrigger>
            <AccordionContent>
              Operiamo principalmente in Italia e nei principali mercati europei. Per progetti internazionali valutiamo caso per caso.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Form */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Form" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Input — stati</p>
            <FormField label="Nome" htmlFor="input-default" helperText="Inserisci il tuo nome completo">
              <Input id="input-default" placeholder="Es. Mario Rossi" />
            </FormField>
            <FormField label="Email" htmlFor="input-error" errorText="Formato email non valido" required>
              <Input id="input-error" placeholder="email@esempio.it" defaultValue="non-una-email" />
            </FormField>
            <FormField label="Campo disabilitato" htmlFor="input-disabled">
              <Input id="input-disabled" placeholder="Non modificabile" disabled />
            </FormField>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Form contatti — esempio</p>
            <FormField label="Azienda" htmlFor="form-company" required>
              <Input id="form-company" placeholder="Nome azienda" />
            </FormField>
            <FormField label="Telefono" htmlFor="form-phone" helperText="Formato: +39 02 0000000">
              <Input id="form-phone" type="tel" placeholder="+39 02 0000000" />
            </FormField>
            <FormField label="Messaggio" htmlFor="form-message" required>
              <Textarea id="form-message" placeholder="Descrivi brevemente la tua richiesta..." />
            </FormField>
            <div className="flex justify-end">
              <Button size="sm">Invia richiesta</Button>
            </div>
          </div>

        </div>
      </section>

      {/* Dialog */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Dialog" />
        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Varianti — clicca per aprire</p>
          <DialogDemo />
        </div>
      </section>

      {/* Menu */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Menu" />
        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Varianti — clicca per aprire</p>
          <MenuDemo />
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          NAVIGATION
      ════════════════════════════════════════════════════════════════ */}
      <GroupDivider label="Navigation" />

      {/* Breadcrumb & Tabs */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Navigation" />
        <NavigationDemo />
      </section>

      {/* Pagination */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Pagination" />
        <PaginationDemo />
      </section>


      {/* ════════════════════════════════════════════════════════════════
          LAYOUT
      ════════════════════════════════════════════════════════════════ */}
      <GroupDivider label="Layout" />

      {/* Sections */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Sections" />
        <SectionsDemo />
      </section>

    </div>
  )
}
