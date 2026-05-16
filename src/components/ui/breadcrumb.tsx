import * as React from "react"
import Link from "next/link"
import { ChevronRightIcon, HomeIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="Breadcrumb"
      className={cn("flex", className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1 text-sm text-gray-500",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  href,
  children,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return (
    <Link
      href={href}
      data-slot="breadcrumb-link"
      className={cn(
        "text-sm text-gray-500 hover:text-[var(--brand-navy)] transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      className={cn("text-gray-300", className)}
      {...props}
    >
      <ChevronRightIcon className="size-3.5" />
    </span>
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("text-sm font-semibold text-[var(--brand-navy)]", className)}
      {...props}
    />
  )
}

function BreadcrumbHome({ href = "/" }: { href?: string }) {
  return (
    <BreadcrumbLink href={href} aria-label="Home">
      <HomeIcon className="size-3.5" />
    </BreadcrumbLink>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbHome,
}
