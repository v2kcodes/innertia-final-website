"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "gradient" | "hover-lift" | "floating"
    animated?: boolean
    hoverEffect?: boolean
  }
>(({ className, variant = "default", animated = true, hoverEffect = true, children, ...props }, ref) => {
  const cardVariants = {
    default: "bg-white border border-muted-200 shadow-sm",
    glass: "glass border-white/20 shadow-lg",
    gradient: "bg-gradient-to-br from-white to-muted-50 border border-muted-200 shadow-lg",
    "hover-lift": "bg-white border border-muted-200 shadow-sm hover:shadow-xl hover:shadow-primary/10 transform transition-all duration-300 hover:-translate-y-2",
    floating: "bg-white border border-muted-200 shadow-lg animate-float"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-6",
        cardVariants[variant],
        hoverEffect && variant === "default" && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { gradient?: boolean }
>(({ className, gradient = false, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-xl font-semibold leading-none tracking-tight",
      gradient && "gradient-text",
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Floating Card with 3D tilt effect
const FloatingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    tiltIntensity?: number
  }
>(({ className, tiltIntensity = 10, children, ...props }, ref) => {
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / (rect.height / 2)) * tiltIntensity
    const rotateY = (mouseX / (rect.width / 2)) * -tiltIntensity

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl p-6 bg-white border border-muted-200 shadow-lg cursor-pointer transition-all duration-300 ease-out preserve-3d",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
})
FloatingCard.displayName = "FloatingCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, FloatingCard }