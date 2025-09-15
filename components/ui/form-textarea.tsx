"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)
    const [charCount, setCharCount] = React.useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      if (props.onChange) {
        props.onChange(e)
      }
    }

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
          <textarea
            className={cn(
              "flex min-h-[120px] w-full rounded-lg border bg-white/50 px-4 py-3 text-sm transition-all duration-200",
              "placeholder:text-muted-400",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "resize-none",
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
            onChange={handleChange}
            {...props}
          />
          
          {props.maxLength && (
            <div className="absolute bottom-2 right-3">
              <span className={cn(
                "text-xs",
                charCount > (props.maxLength * 0.9) 
                  ? "text-orange-500" 
                  : charCount === props.maxLength 
                  ? "text-red-500" 
                  : "text-muted-400"
              )}>
                {charCount}/{props.maxLength}
              </span>
            </div>
          )}
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

FormTextarea.displayName = "FormTextarea"

export { FormTextarea }