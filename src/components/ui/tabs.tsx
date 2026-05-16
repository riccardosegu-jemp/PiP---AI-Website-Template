import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  variant = "underline",
  ...props
}: TabsPrimitive.List.Props & { variant?: "underline" | "pill" }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        "flex items-center",
        // Underline variant
        variant === "underline" && [
          "border-b border-[var(--brand-border)] gap-0",
        ],
        // Pill variant
        variant === "pill" && [
          "gap-1 p-1 bg-[var(--brand-surface)] rounded-[var(--radius-200)] w-fit",
        ],
        className
      )}
      {...props}
    />
  )
}

function TabsTab({
  className,
  variant = "underline",
  ...props
}: TabsPrimitive.Tab.Props & { variant?: "underline" | "pill" }) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none cursor-pointer",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",

        // Underline variant
        variant === "underline" && [
          "px-4 py-2.5 text-gray-500",
          "hover:text-[var(--brand-navy)]",
          // Active state — underline via pseudo border-bottom
          "data-selected:text-[var(--brand-navy)]",
          "data-selected:after:content-[''] data-selected:after:absolute data-selected:after:bottom-[-1px] data-selected:after:left-0 data-selected:after:right-0 data-selected:after:h-[2px] data-selected:after:bg-[var(--brand-navy)] data-selected:after:rounded-t-full",
        ],

        // Pill variant
        variant === "pill" && [
          "px-3 py-1.5 rounded-[var(--radius-100)] text-gray-500",
          "hover:text-[var(--brand-navy)] hover:bg-white",
          "data-selected:bg-white data-selected:text-[var(--brand-navy)] data-selected:shadow-sm",
        ],

        className
      )}
      {...props}
    />
  )
}

function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn(
        "text-sm text-gray-600 outline-none",
        "data-open:animate-in data-open:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTab, TabsPanel }
