"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={props.id} 
            className={cn(
              "text-sm font-medium transition-colors",
              error ? "text-red-600" : "text-muted-700",
              focused && !error && "text-primary-600"
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-white/50 px-4 py-3 text-sm transition-all duration-200",
              "placeholder:text-muted-400",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : focused
                ? "border-primary-300 focus:border-primary-500 focus:ring-primary-200"
                : "border-muted-200 hover:border-muted-300",
              className
            )}
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        </div>

        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error ? (
              <p className="text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2" />
                {error}
              </p>
            ) : (
              <p className="text-sm text-muted-500">
                {helperText}
              </p>
            )}
          </motion.div>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

export { FormInput }