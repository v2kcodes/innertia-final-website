"use client"

import * as React from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { MotionDiv } from "@/lib/motion-helpers"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variant?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  staggerChildren?: boolean
  staggerDelay?: number
}

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10, scale: 0.9 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
  },
}

export function AnimatedSection({
  children,
  className,
  variant = "slideUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  staggerChildren = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, {
    once,
  })

  const animation = animationVariants[variant]

  const containerVariants = staggerChildren ? {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  } : undefined

  const itemVariants = staggerChildren ? {
    initial: animation.initial,
    animate: animation.animate,
  } : undefined

  return (
    <MotionDiv
      ref={ref}
      className={cn(className)}
      variants={staggerChildren ? containerVariants : undefined}
      initial={staggerChildren ? "initial" : animation.initial}
      animate={isInView ? (staggerChildren ? "animate" : animation.animate) : animation.initial}
      transition={{
        duration,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
    >
      {staggerChildren
        ? React.Children.map(children, (child, index) => (
            <MotionDiv
              key={index}
              variants={itemVariants}
              transition={{
                duration,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
            >
              {child}
            </MotionDiv>
          ))
        : children}
    </MotionDiv>
  )
}

// Parallax Section Component
interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  offset = 0,
}: ParallaxSectionProps) {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + (speed * 100)])

  return (
    <MotionDiv ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </MotionDiv>
  )
}

// Count up animation component
interface CountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = React.useState(start)

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const increment = (end - start) / (duration * 60) // 60 FPS
        const interval = setInterval(() => {
          setCount(prev => {
            if (prev < end) {
              return Math.min(prev + increment, end)
            } else {
              clearInterval(interval)
              return end
            }
          })
        }, 1000 / 60)

        return () => clearInterval(interval)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, end, start, duration, delay])

  return (
    <MotionDiv
      ref={ref}
      className={cn("font-bold text-4xl lg:text-5xl gradient-text", className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{Math.floor(count).toLocaleString()}{suffix}
    </MotionDiv>
  )
}

// Reveal on scroll component
interface RevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  const directionVariants = {
    up: { y: 75 },
    down: { y: -75 },
    left: { x: -75 },
    right: { x: 75 },
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <MotionDiv
        initial={{ opacity: 0, ...directionVariants[direction] }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionVariants[direction] }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </MotionDiv>
    </div>
  )
}

// Staggered reveal for lists
interface StaggeredListProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  itemDelay?: number
}

export function StaggeredList({
  children,
  className,
  staggerDelay = 0.1,
  itemDelay = 0,
}: StaggeredListProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: itemDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <MotionDiv
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child, index) => (
        <MotionDiv key={index} variants={itemVariants}>
          {child}
        </MotionDiv>
      ))}
    </MotionDiv>
  )
}

