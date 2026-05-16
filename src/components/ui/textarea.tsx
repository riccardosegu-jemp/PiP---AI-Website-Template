import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  hasError?: boolean
}

function Textarea({ className, hasError, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        "peer flex w-full min-h-[100px] rounded-[var(--radius-200)] border border-[var(--brand-border)]",
        "bg-[#f3f4f6] px-3 py-2 text-sm text-[var(--foreground)]",
        "placeholder:text-gray-400 resize-y",
        // Transition
        "transition-colors duration-150",
        // Focus
        "outline-none focus:border-[var(--brand-navy)] focus:ring-2 focus:ring-[var(--brand-navy)]/20",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#d9d9d9] disabled:border-[#b3b3b3]",
        // Error
        hasError && "border-[#d4183d] focus:border-[#d4183d] focus:ring-[#d4183d]/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
