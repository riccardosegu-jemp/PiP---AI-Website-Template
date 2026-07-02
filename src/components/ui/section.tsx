import * as React from "react"
import { cn } from "@/lib/utils"

type SectionVariant = "default" | "muted" | "navy"

const sectionBg: Record<SectionVariant, string> = {
  default: "bg-white",
  muted:   "bg-[var(--brand-surface)]",
  navy:    "bg-[var(--brand-navy)] text-white",
}

interface SectionProps extends React.ComponentProps<"section"> {
  variant?: SectionVariant
  size?: "sm" | "default" | "lg"
}

function Section({
  className,
  variant = "default",
  size = "default",
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(
        sectionBg[variant],
        size === "sm"      && "py-12",
        size === "default" && "py-16",
        size === "lg"      && "py-24",
        className
      )}
      {...props}
    />
  )
}

function SectionContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-container"
      className={cn("max-w-7xl mx-auto px-6", className)}
      {...props}
    />
  )
}

interface SectionHeaderProps extends React.ComponentProps<"div"> {
  align?: "left" | "center"
}

function SectionHeader({
  className,
  align = "left",
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-col gap-3 mb-12",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    />
  )
}

interface SectionTaglineProps extends React.ComponentProps<"p"> {
  dark?: boolean
}

function SectionTagline({ className, dark = false, ...props }: SectionTaglineProps) {
  return (
    <p
      data-slot="section-tagline"
      className={cn(
        "text-sm font-semibold uppercase tracking-widest",
        dark ? "text-[var(--brand-teal-light)]" : "text-[var(--brand-teal)]",
        className
      )}
      {...props}
    />
  )
}

interface SectionTitleProps extends React.ComponentProps<"h2"> {
  dark?: boolean
}

function SectionTitle({ className, dark = false, ...props }: SectionTitleProps) {
  return (
    <h2
      data-slot="section-title"
      className={cn(
        "text-[32px] font-bold leading-tight",
        dark ? "text-white" : "text-[var(--brand-navy)]",
        className
      )}
      {...props}
    />
  )
}

interface SectionDescriptionProps extends React.ComponentProps<"p"> {
  dark?: boolean
}

function SectionDescription({ className, dark = false, ...props }: SectionDescriptionProps) {
  return (
    <p
      data-slot="section-description"
      className={cn(
        "text-base leading-relaxed max-w-2xl",
        dark ? "text-white/70" : "text-gray-500",
        className
      )}
      {...props}
    />
  )
}

function SectionGrid({
  className,
  cols = 3,
  ...props
}: React.ComponentProps<"div"> & { cols?: 2 | 3 | 4 }) {
  return (
    <div
      data-slot="section-grid"
      className={cn(
        "grid gap-6",
        cols === 2 && "grid-cols-1 md:grid-cols-2",
        cols === 3 && "grid-cols-1 md:grid-cols-3",
        cols === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Section,
  SectionContainer,
  SectionHeader,
  SectionTagline,
  SectionTitle,
  SectionDescription,
  SectionGrid,
}
export type { SectionVariant }
