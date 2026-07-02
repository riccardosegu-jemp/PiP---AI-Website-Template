"use client"

import { useSyncExternalStore } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import type { FaqItem } from "@/sanity/types"

const emptySubscribe = () => () => {}

// Previene SSR dell'Accordion Base UI (usa --accordion-panel-height via JS → hydration mismatch)
function ClientOnly({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  if (!mounted) return null
  return <>{children}</>
}

export function LpFaq({ items }: { items: FaqItem[] }) {
  return (
    <ClientOnly>
      <Accordion>
        {items.map((item) => (
          <AccordionItem key={item._key} value={item._key}>
            <AccordionTrigger>{item.domanda}</AccordionTrigger>
            <AccordionContent>{item.risposta}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ClientOnly>
  )
}
