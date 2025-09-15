"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  variant?: "primary" | "secondary" | "accent" | "rainbow" | "sunset"
  animated?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
}

const gradientVariants = {
  primary: "from-primary-500 via-secondary-500 to-accent-500",
  secondary: "from-secondary-500 via-primary-500 to-accent-600",
  accent: "from-accent-500 via-primary-500 to-secondary-500",
  rainbow: "from-purple-500 via-primary-500 via-secondary-500 to-accent-500",
  sunset: "from-orange-400 via-primary-500 to-pink-500"
}

const sizeVariants = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl lg:text-5xl xl:text-6xl"
}

const GradientText = React.forwardRef<
  HTMLElement,
  GradientTextProps
>(({ 
  className, 
  as: Component = "span", 
  variant = "primary", 
  animated = false,
  size = "md",
  children, 
  ...props 
}, ref) => {
  const textRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (animated && textRef.current) {
      // Add animation class for background position animation
      textRef.current.style.backgroundSize = "200% 200%"
      textRef.current.style.animation = "gradient-x 3s ease infinite"
    }
  }, [animated])

  const baseClasses = cn(
    "font-display font-bold leading-tight tracking-tight",
    "bg-gradient-to-r bg-clip-text text-transparent",
    gradientVariants[variant],
    sizeVariants[size],
    animated && "animate-gradient-x",
    className
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Component
          ref={ref as any}
          className={baseClasses}
          {...props}
        >
          {children}
        </Component>
      </motion.div>
    )
  }

  return (
    <Component
      ref={ref as any}
      className={baseClasses}
      {...props}
    >
      {children}
    </Component>
  )
})

GradientText.displayName = "GradientText"

// Animated text that reveals letter by letter
const AnimatedText = React.forwardRef<
  HTMLElement,
  GradientTextProps & { delay?: number; stagger?: number }
>(({ 
  className, 
  as: Component = "h1", 
  variant = "primary", 
  size = "4xl",
  delay = 0,
  stagger = 0.1,
  children, 
  ...props 
}, ref) => {
  const text = children as string
  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <Component
        ref={ref as any}
        className={cn(
          "font-display font-bold leading-tight tracking-tight inline-block",
          "bg-gradient-to-r bg-clip-text text-transparent",
          gradientVariants[variant],
          sizeVariants[size],
          className
        )}
        {...props}
      >
        {letters.map((letter, index) => (
          <motion.span
            variants={child}
            key={index}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </Component>
    </motion.div>
  )
})

AnimatedText.displayName = "AnimatedText"

// Typewriter effect component
const TypewriterText = React.forwardRef<
  HTMLElement,
  GradientTextProps & { 
    text: string
    speed?: number
    delay?: number
    cursor?: boolean
  }
>(({ 
  className, 
  as: Component = "h1", 
  variant = "primary", 
  size = "4xl",
  text,
  speed = 100,
  delay = 0,
  cursor = true,
  ...props 
}, ref) => {
  const [displayText, setDisplayText] = React.useState("")
  const [showCursor, setShowCursor] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, displayText.length + 1))
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, text, speed])

  React.useEffect(() => {
    if (cursor) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)

      return () => clearInterval(cursorTimer)
    }
  }, [cursor])

  React.useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setDisplayText(text.charAt(0))
      }, delay)

      return () => clearTimeout(delayTimer)
    } else {
      setDisplayText(text.charAt(0))
    }
  }, [text, delay])

  return (
    <Component
      ref={ref as any}
      className={cn(
        "font-display font-bold leading-tight tracking-tight",
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradientVariants[variant],
        sizeVariants[size],
        className
      )}
      {...props}
    >
      {displayText}
      {cursor && (
        <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>
          |
        </span>
      )}
    </Component>
  )
})

TypewriterText.displayName = "TypewriterText"

export { GradientText, AnimatedText, TypewriterText }