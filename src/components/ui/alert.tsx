import * as React from "react"
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type AlertVariant = "info" | "success" | "warning" | "danger"

const variantStyles: Record<AlertVariant, {
  container: string
  icon: React.ReactNode
}> = {
  info: {
    container: "bg-[var(--brand-surface)] border-[var(--brand-navy)] text-[var(--brand-navy)]",
    icon: <InfoIcon className="size-4 shrink-0 mt-0.5" />,
  },
  success: {
    container: "bg-[#cff7d3] border-[#14ae5c] text-[#02542d]",
    icon: <CheckCircleIcon className="size-4 shrink-0 mt-0.5" />,
  },
  warning: {
    container: "bg-[#fff1c2] border-[#e8b931] text-[#682d02]",
    icon: <AlertTriangleIcon className="size-4 shrink-0 mt-0.5" />,
  },
  danger: {
    container: "bg-[#fdd2cf] border-[#bf0f0c] text-[#8f0b09]",
    icon: <XCircleIcon className="size-4 shrink-0 mt-0.5" />,
  },
}

interface AlertProps extends React.ComponentProps<"div"> {
  variant?: AlertVariant
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
}

function Alert({
  className,
  variant = "info",
  title,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const { container, icon } = variantStyles[variant]

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        "relative flex gap-3 rounded-[var(--radius-200)] border px-4 py-3 text-sm",
        container,
        className
      )}
      {...props}
    >
      {icon}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold mb-0.5">{title}</p>
        )}
        {children && (
          <p className="leading-relaxed opacity-90">{children}</p>
        )}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="absolute right-3 top-3 rounded p-0.5 opacity-60 hover:opacity-100 transition-opacity outline-none"
          aria-label="Chiudi"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </div>
  )
}

export { Alert }
export type { AlertVariant }
