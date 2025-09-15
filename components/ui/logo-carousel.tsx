"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

const trustLogos = [
  {
    name: "TrueHorizonAI",
    src: "/logos/truehorizon.webp",
    width: 120,
    height: 40,
  },
  {
    name: "n8n",
    src: "/logos/n8n logo.png",
    width: 80,
    height: 40,
  },
  {
    name: "Anthropic",
    src: "/logos/anthropic logo.webp",
    width: 120,
    height: 40,
  },
  {
    name: "Airtable",
    src: "/logos/airtablelogo.png.webp",
    width: 100,
    height: 40,
  },
  {
    name: "Next.js",
    src: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
    width: 40,
    height: 40,
  },
  {
    name: "Vercel",
    src: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
    width: 100,
    height: 40,
  },
]

interface LogoCarouselProps {
  className?: string
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export function LogoCarousel({ 
  className, 
  speed = 25, 
  direction = "left", 
  pauseOnHover = true 
}: LogoCarouselProps) {
  const [isPaused, setIsPaused] = React.useState(false)

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...trustLogos, ...trustLogos]

  return (
    <div 
      className={cn("overflow-hidden py-8", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex items-center space-x-8 lg:space-x-12"
        animate={{
          x: direction === "left" ? [0, -50 * trustLogos.length] : [-50 * trustLogos.length, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <motion.div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              className="h-8 lg:h-10 w-auto object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Alternative: Grid-based logo display
export function LogoGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 lg:grid-cols-7 gap-8 items-center", className)}>
      {trustLogos.map((logo, index) => (
        <motion.div
          key={logo.name}
          className="flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
        >
          <Image
            src={logo.src}
            alt={`${logo.name} logo`}
            width={logo.width}
            height={logo.height}
            className="h-8 lg:h-10 w-auto object-contain"
          />
        </motion.div>
      ))}
    </div>
  )
}

// Floating logos with different animations
export function FloatingLogos({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-64 overflow-hidden", className)}>
      {trustLogos.map((logo, index) => (
        <motion.div
          key={logo.name}
          className="absolute grayscale hover:grayscale-0 transition-all duration-300 opacity-40 hover:opacity-100"
          initial={{
            x: Math.random() * 800,
            y: Math.random() * 200,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: Math.random() * 800,
            y: Math.random() * 200,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          whileHover={{ scale: 1.2, opacity: 1, rotate: 0 }}
        >
          <Image
            src={logo.src}
            alt={`${logo.name} logo`}
            width={logo.width}
            height={logo.height}
            className="h-6 lg:h-8 w-auto object-contain"
          />
        </motion.div>
      ))}
    </div>
  )
}

// Staggered reveal animation
export function StaggeredLogos({ className }: { className?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 0.6,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={cn("flex flex-wrap justify-center items-center gap-8 lg:gap-12", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {trustLogos.map((logo) => (
        <motion.div
          key={logo.name}
          variants={itemVariants}
          className="grayscale hover:grayscale-0 transition-all duration-300 hover:opacity-100"
          whileHover={{ scale: 1.1, opacity: 1 }}
        >
          <Image
            src={logo.src}
            alt={`${logo.name} logo`}
            width={logo.width}
            height={logo.height}
            className="h-8 lg:h-10 w-auto object-contain"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}