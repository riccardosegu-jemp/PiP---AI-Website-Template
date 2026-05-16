import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "@/lib/utils"

function TooltipProvider(props: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider {...props} />
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger {...props} />
}

function TooltipPositioner({ className, ...props }: TooltipPrimitive.Positioner.Props) {
  return (
    <TooltipPrimitive.Positioner
      className={cn("z-50", className)}
      {...props}
    />
  )
}

function TooltipPopup({ className, ...props }: TooltipPrimitive.Popup.Props) {
  return (
    <TooltipPrimitive.Popup
      data-slot="tooltip-popup"
      className={cn(
        "max-w-[240px] rounded-[var(--radius-100)] px-2.5 py-1.5",
        "bg-[var(--brand-navy)] text-white text-xs font-medium leading-snug",
        "shadow-[0_var(--depth-025)_var(--depth-100)_0_rgba(0,0,0,0.18)]",
        "origin-[var(--transform-origin)]",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props}
    />
  )
}

function TooltipArrow({ className, ...props }: TooltipPrimitive.Arrow.Props) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className={cn("fill-[var(--brand-navy)]", className)}
      {...props}
    />
  )
}

// Componente all-in-one per uso rapido
interface TooltipContentProps extends TooltipPrimitive.Positioner.Props {
  content: string
  side?: "top" | "bottom" | "left" | "right"
  showArrow?: boolean
}

function TooltipContent({
  content,
  side = "top",
  showArrow = true,
  sideOffset = 6,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPositioner side={side} sideOffset={sideOffset} {...props}>
        <TooltipPopup>
          {showArrow && <TooltipArrow />}
          {content}
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPrimitive.Portal>
  )
}

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
  TooltipContent,
}
