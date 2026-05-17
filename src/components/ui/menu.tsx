import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Menu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root {...props} />
}

function MenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger {...props} />
}

function MenuPortal(props: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal {...props} />
}

function MenuPositioner({ className, ...props }: MenuPrimitive.Positioner.Props) {
  return (
    <MenuPrimitive.Positioner
      className={cn("z-50 outline-none", className)}
      {...props}
    />
  )
}

function MenuPopup({ className, ...props }: MenuPrimitive.Popup.Props) {
  return (
    <MenuPrimitive.Popup
      data-slot="menu-popup"
      className={cn(
        "min-w-[180px] overflow-hidden p-1",
        "rounded-[var(--radius-200)] border border-[var(--brand-border)] bg-white",
        "shadow-[0_var(--depth-025)_var(--depth-400)_0_rgba(0,0,0,0.10)]",
        "origin-[var(--transform-origin)]",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props}
    />
  )
}

function MenuContent({
  className,
  sideOffset = 6,
  ...props
}: Omit<MenuPrimitive.Positioner.Props, "className"> & { className?: string }) {
  return (
    <MenuPortal>
      <MenuPositioner sideOffset={sideOffset} {...props}>
        <MenuPopup className={className} />
      </MenuPositioner>
    </MenuPortal>
  )
}

function MenuItem({
  className,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & { variant?: "default" | "destructive" }) {
  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-[var(--radius-100)] px-3 py-1.5 text-sm outline-none transition-colors",
        // Default
        variant === "default" && [
          "text-gray-700",
          "hover:bg-[var(--brand-surface)] hover:text-[var(--brand-navy)]",
          "focus:bg-[var(--brand-surface)] focus:text-[var(--brand-navy)]",
        ],
        // Destructive
        variant === "destructive" && [
          "text-[#d4183d]",
          "hover:bg-[#fde8e7] hover:text-[#8f0b09]",
          "focus:bg-[#fde8e7] focus:text-[#8f0b09]",
        ],
        // Disabled
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
}

function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="menu-separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--brand-border)]", className)}
      {...props}
    />
  )
}

function MenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group {...props} />
}

function MenuGroupLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-group-label"
      className={cn(
        "px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  )
}

function MenuCheckboxItem({
  className,
  children,
  ...props
}: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-[var(--radius-100)] py-1.5 pl-8 pr-3 text-sm text-gray-700 outline-none transition-colors",
        "hover:bg-[var(--brand-surface)] hover:text-[var(--brand-navy)]",
        "focus:bg-[var(--brand-surface)] focus:text-[var(--brand-navy)]",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-3.5 text-[var(--brand-navy)]" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenuSubmenuTrigger({ className, children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menu-submenu-trigger"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-[var(--radius-100)] px-3 py-1.5 text-sm text-gray-700 outline-none transition-colors",
        "hover:bg-[var(--brand-surface)] hover:text-[var(--brand-navy)]",
        "focus:bg-[var(--brand-surface)] focus:text-[var(--brand-navy)]",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-3.5 text-gray-400" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

export {
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
  MenuCheckboxItem,
  MenuSubmenuTrigger,
}
