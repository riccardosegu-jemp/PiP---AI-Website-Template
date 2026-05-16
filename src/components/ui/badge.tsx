import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[var(--radius-full)] px-2 py-0.5 text-xs font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        // Brand
        default:     "bg-[var(--brand-navy)] text-white",
        navy:        "bg-[var(--brand-navy)] text-white",
        teal:        "bg-[var(--brand-teal)] text-white",
        // Semantic
        success:     "bg-[#cff7d3] text-[#02542d]",
        warning:     "bg-[#fff1c2] text-[#682d02]",
        danger:      "bg-[#fdd2cf] text-[#8f0b09]",
        // Neutral
        neutral:     "bg-[#e3e3e3] text-[#303030]",
        outline:     "border border-[var(--brand-border)] text-gray-600 bg-transparent",
        ghost:       "bg-[var(--brand-surface)] text-[var(--brand-navy)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {dot && (
        <span
          className="size-1.5 rounded-full bg-current opacity-70"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
