"use client"

import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import type { FaqItem } from "@/sanity/types"

// Previene SSR dell'Accordion Base UI (usa --accordion-panel-height via JS → hydration mismatch)
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
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
