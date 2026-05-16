"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  // Base — corrisponde a Figma: radius piccolo, padding compatto, testo sm
  "inline-flex items-center gap-1.5 rounded-[var(--radius-100)] px-2.5 py-1 text-sm font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        brand:    "",
        danger:   "",
        positive: "",
        warning:  "",
        neutral:  "",
      },
      type: {
        // Primary — sfondo solido, testo bianco (da Figma sDSLight)
        primary:   "",
        // Secondary — sfondo pastello, testo colorato (da Figma sDSLight)
        secondary: "",
      },
    },
    compoundVariants: [
      // ── PRIMARY ──
      {
        type: "primary",
        variant: "brand",
        className: "bg-[#2c2c2c] text-[#f5f5f5] hover:bg-[#1e1e1e]",
      },
      {
        type: "primary",
        variant: "danger",
        className: "bg-[#eb221e] text-[#fde8e7] hover:bg-[#bf0f0c]",
      },
      {
        type: "primary",
        variant: "positive",
        className: "bg-[#14ae5c] text-[#ebffee] hover:bg-[#009951]",
      },
      {
        type: "primary",
        variant: "warning",
        className: "bg-[#e8b931] text-[#401b00] hover:bg-[#e5a000]",
      },
      {
        type: "primary",
        variant: "neutral",
        className: "bg-[#cccccc] text-[#303030] hover:bg-[#b3b3b3]",
      },

      // ── SECONDARY ──
      {
        type: "secondary",
        variant: "brand",
        className: "bg-[#e6e6e6] text-[#2c2c2c] hover:bg-[#d9d9d9]",
      },
      {
        type: "secondary",
        variant: "danger",
        className: "bg-[#fdd2cf] text-[#8f0b09] hover:bg-[#fcb2ad]",
      },
      {
        type: "secondary",
        variant: "positive",
        className: "bg-[#cff7d3] text-[#02542d] hover:bg-[#aff4c6]",
      },
      {
        type: "secondary",
        variant: "warning",
        className: "bg-[#fff1c2] text-[#682d02] hover:bg-[#ffe8a3]",
      },
      {
        type: "secondary",
        variant: "neutral",
        className: "bg-[#e3e3e3] text-[#424242] hover:bg-[#cccccc]",
      },
    ],
    defaultVariants: {
      variant: "brand",
      type: "primary",
    },
  }
)

interface TagProps
  extends Omit<React.ComponentProps<"span">, "onClick">,
    VariantProps<typeof tagVariants> {
  dismissible?: boolean
  onDismiss?: () => void
  onClick?: () => void
}

function Tag({
  className,
  variant,
  type,
  dismissible = false,
  onDismiss,
  onClick,
  children,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(
        tagVariants({ variant, type }),
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      {dismissible && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDismiss?.()
          }}
          className="flex items-center justify-center rounded-sm p-0.5 hover:bg-black/15 transition-colors outline-none -mr-0.5"
          aria-label="Rimuovi"
        >
          <XIcon className="size-3 shrink-0" />
        </button>
      )}
    </span>
  )
}

function TagGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tag-group"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  )
}

export { Tag, TagGroup, tagVariants }
