import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Button ──────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:     "bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-dark)]",
        accent:      "bg-[var(--brand-teal)] text-white hover:bg-[var(--brand-teal-light)]",
        outline:     "border border-[var(--brand-navy)] text-[var(--brand-navy)] bg-transparent hover:bg-[var(--brand-navy)] hover:text-white",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:       "hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link:        "text-[var(--brand-navy)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs:      "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm:      "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg:      "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon:    "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// ── Icon Button ──────────────────────────────────────────────────────────────
// Figma: Icon Button — cerchio, 3 varianti (Primary/Neutral/Subtle) × 2 dimensioni (Medium/Small)

const iconButtonVariants = cva(
  // Base: cerchio, transizione, outline, disabled
  "inline-flex shrink-0 items-center justify-center rounded-full transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary — sfondo navy pieno, icona bianca
        primary: "bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-dark)]",
        // Neutral — sfondo bianco, bordo grigio, icona grigia → navy in hover
        neutral: "bg-white border border-[var(--brand-border)] text-gray-500 hover:border-[var(--brand-navy)] hover:text-[var(--brand-navy)]",
        // Subtle — nessun bordo, nessuno sfondo, icona grigia → navy in hover
        subtle:  "bg-transparent text-gray-400 hover:bg-[var(--brand-surface)] hover:text-[var(--brand-navy)]",
      },
      size: {
        // Medium — 40px (iconMedium = icona di 32px all'interno)
        md: "size-10 [&_svg:not([class*='size-'])]:size-5",
        // Small — 32px (iconSmall = icona di 24px all'interno)
        sm: "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface IconButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string
}

function IconButton({
  className,
  variant,
  size,
  ...props
}: IconButtonProps) {
  return (
    <button
      data-slot="icon-button"
      type="button"
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// ── Button Group ─────────────────────────────────────────────────────────────
// Figma: Button Group — layout disponibili: Justify / Start / End / Center / Stack

type ButtonGroupLayout = "justify" | "start" | "end" | "center" | "stack"

const groupLayout: Record<ButtonGroupLayout, string> = {
  justify: "flex flex-row items-center justify-between w-full",
  start:   "flex flex-row items-center justify-start gap-2",
  end:     "flex flex-row items-center justify-end gap-2",
  center:  "flex flex-row items-center justify-center gap-2",
  stack:   "flex flex-col items-stretch gap-2",
}

interface ButtonGroupProps extends React.ComponentProps<"div"> {
  layout?: ButtonGroupLayout
}

function ButtonGroup({
  className,
  layout = "start",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      className={cn(groupLayout[layout], className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, IconButton, iconButtonVariants, ButtonGroup }
export type { ButtonGroupLayout }
