"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg hover:shadow-xl hover:shadow-primary/25 transform hover:scale-105 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-primary-500 text-primary-500 shadow-sm hover:bg-primary-500 hover:text-white hover:shadow-lg hover:shadow-primary/25 transform hover:scale-105",
        secondary:
          "bg-muted-800 text-white shadow-sm hover:bg-muted-700 hover:shadow-lg transform hover:scale-105",
        ghost: 
          "text-primary-500 hover:bg-primary-50 hover:text-primary-600 transform hover:scale-105",
        link: 
          "text-primary-500 underline-offset-4 hover:underline hover:text-primary-600",
        gradient:
          "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg hover:shadow-xl hover:shadow-primary/25 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent-500 before:via-secondary-500 before:to-primary-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        glass:
          "backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-lg hover:bg-white/20 hover:shadow-xl transform hover:scale-105",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-lg px-8 text-base",
        xl: "h-16 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, icon, rightIcon, children, ...props }, ref) => {

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    // Use a simple button without motion for compatibility
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <div className="loading-dots mr-2">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            Loading...
          </>
        ) : (
          <>
            {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
            <span className="relative z-10">{children}</span>
            {rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
          </>
        )}
        
        {/* Ripple effect */}
        {variant === "default" || variant === "gradient" ? (
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        ) : null}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }