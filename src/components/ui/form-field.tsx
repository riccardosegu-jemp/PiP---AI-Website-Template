import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label?: string
  htmlFor?: string
  helperText?: string
  errorText?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

function FormField({
  label,
  htmlFor,
  helperText,
  errorText,
  required,
  className,
  children,
}: FormFieldProps) {
  const hasError = Boolean(errorText)

  return (
    <div data-slot="form-field" className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-[#d4183d] ml-0.5">*</span>}
        </Label>
      )}
      {/* Clona children iniettando hasError se è Input/Textarea */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ hasError?: boolean }>, {
            hasError,
          })
        }
        return child
      })}
      {helperText && !hasError && (
        <p data-slot="helper-text" className="text-xs text-gray-500">
          {helperText}
        </p>
      )}
      {hasError && (
        <p data-slot="error-text" className="text-xs text-[#d4183d]">
          {errorText}
        </p>
      )}
    </div>
  )
}

export { FormField }
