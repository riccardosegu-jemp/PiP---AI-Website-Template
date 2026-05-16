import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="pagination"
      role="navigation"
      aria-label="Paginazione"
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="pagination-item" className={cn("", className)} {...props} />
  )
}

interface PaginationButtonProps extends React.ComponentProps<"button"> {
  isActive?: boolean
}

function PaginationButton({
  className,
  isActive,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      data-slot="pagination-button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center size-8 rounded-[var(--radius-100)] text-sm font-medium transition-colors outline-none",
        isActive
          ? "bg-[var(--brand-navy)] text-white pointer-events-none"
          : "text-gray-600 hover:bg-[var(--brand-surface)] hover:text-[var(--brand-navy)]",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
}

function PaginationPrev({
  className,
  label = "Precedente",
  ...props
}: React.ComponentProps<"button"> & { label?: string }) {
  return (
    <button
      data-slot="pagination-prev"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 h-8 rounded-[var(--radius-100)] text-sm font-medium text-gray-600",
        "hover:bg-[var(--brand-surface)] hover:text-[var(--brand-navy)] transition-colors outline-none",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

function PaginationNext({
  className,
  label = "Successivo",
  ...props
}: React.ComponentProps<"button"> & { label?: string }) {
  return (
    <button
      data-slot="pagination-next"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 h-8 rounded-[var(--radius-100)] text-sm font-medium text-gray-600",
        "hover:bg-[var(--brand-surface)] hover:text-[var(--brand-navy)] transition-colors outline-none",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span className="hidden sm:inline">{label}</span>
      <ChevronRightIcon className="size-4" />
    </button>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden
      className={cn("inline-flex size-8 items-center justify-center text-gray-400", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
}
