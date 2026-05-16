"use client"

import { useState } from "react"
import { Tag, TagGroup } from "@/components/ui/tag"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

const variants = ["brand", "danger", "positive", "warning", "neutral"] as const
const initialTags = ["Design System", "Next.js", "Tailwind", "Sanity CMS", "Cloudflare"]

export function TagsTooltipDemo() {
  const [dismissed, setDismissed] = useState<string[]>([])
  const activeTags = initialTags.filter((t) => !dismissed.includes(t))

  return (
    <div className="flex flex-col gap-10">

      {/* Griglia Primary × Secondary — fedele a Figma */}
      <div className="flex flex-col gap-6">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Tag — Primary &amp; Secondary</p>

        {/* Header colonne */}
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="text-left text-xs text-gray-400 font-medium pb-2 w-24"></th>
                {variants.map((v) => (
                  <th key={v} className="text-center text-xs text-gray-500 font-semibold uppercase tracking-wider pb-2 px-3 capitalize">
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Primary */}
              <tr>
                <td className="text-xs font-semibold text-gray-600 pr-4 whitespace-nowrap align-middle">Primary</td>
                {variants.map((v) => (
                  <td key={v} className="text-center px-3 align-middle">
                    <Tag type="primary" variant={v} dismissible>Tag</Tag>
                  </td>
                ))}
              </tr>
              {/* Primary hover — simulato con opacity per mostrarlo statico */}
              <tr>
                <td className="text-xs text-gray-400 pr-4 whitespace-nowrap align-middle">Primary Hover</td>
                {variants.map((v) => (
                  <td key={v} className="text-center px-3 align-middle">
                    <Tag type="primary" variant={v} dismissible className="brightness-90">Tag</Tag>
                  </td>
                ))}
              </tr>
              {/* Secondary */}
              <tr>
                <td className="text-xs font-semibold text-gray-600 pr-4 whitespace-nowrap align-middle">Secondary</td>
                {variants.map((v) => (
                  <td key={v} className="text-center px-3 align-middle">
                    <Tag type="secondary" variant={v} dismissible>Tag</Tag>
                  </td>
                ))}
              </tr>
              {/* Secondary hover */}
              <tr>
                <td className="text-xs text-gray-400 pr-4 whitespace-nowrap align-middle">Secondary Hover</td>
                {variants.map((v) => (
                  <td key={v} className="text-center px-3 align-middle">
                    <Tag type="secondary" variant={v} dismissible className="brightness-95">Tag</Tag>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Uso reale — dismissibili */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Uso reale — dismissibili</p>
        <TagGroup>
          {activeTags.map((label) => (
            <Tag
              key={label}
              type="primary"
              variant="brand"
              dismissible
              onDismiss={() => setDismissed((prev) => [...prev, label])}
            >
              {label}
            </Tag>
          ))}
          {activeTags.length === 0 && (
            <button
              className="text-xs text-[var(--brand-teal)] hover:underline"
              onClick={() => setDismissed([])}
            >
              + Ripristina tag
            </button>
          )}
        </TagGroup>
      </div>

      {/* Uso reale — status semantici */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Uso reale — status</p>
        <TagGroup>
          <Tag type="secondary" variant="positive">Attivo</Tag>
          <Tag type="secondary" variant="warning">In scadenza</Tag>
          <Tag type="secondary" variant="danger">Scaduto</Tag>
          <Tag type="secondary" variant="neutral">Archiviato</Tag>
          <Tag type="primary" variant="brand">Nuovo</Tag>
        </TagGroup>
      </div>

      {/* Tooltip */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Tooltip</p>
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-6">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm">Hover — top</Button>} />
              <TooltipContent content="Tooltip posizionato in alto" side="top" />
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm">Hover — bottom</Button>} />
              <TooltipContent content="Tooltip in basso" side="bottom" />
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm">Hover — left</Button>} />
              <TooltipContent content="Tooltip a sinistra" side="left" />
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm">Hover — right</Button>} />
              <TooltipContent content="Tooltip a destra" side="right" />
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <button className="rounded-full p-1 text-gray-400 hover:text-[var(--brand-navy)] transition-colors outline-none">
                    <InfoIcon className="size-4" />
                  </button>
                }
              />
              <TooltipContent content="Il codice fiscale è necessario per la fatturazione elettronica" side="top" />
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

    </div>
  )
}
