"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Moon, Sun, Monitor, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  variant?: "icon" | "compact" | "mobile"
  className?: string
  showLabel?: boolean
  size?: "sm" | "default" | "lg"
}

export function ThemeToggle({ 
  variant = "icon", 
  className,
  showLabel = false,
  size = "default"
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const getIcon = () => {
    if (!mounted) {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }
    
    return resolvedTheme === "dark" ? (
      <Sun className="h-4 w-4 md:h-5 md:w-5" />
    ) : (
      <Moon className="h-4 w-4 md:h-5 md:w-5" />
    )
  }

  const getLabel = () => {
    if (!mounted) return "Loading..."
    return resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"
  }

  if (variant === "mobile") {
    return (
      <motion.button
        onClick={toggleTheme}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-xl text-left hover:bg-muted-100 transition-colors group",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!mounted}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white">
            <motion.div
              animate={{ rotate: mounted && resolvedTheme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {getIcon()}
            </motion.div>
          </div>
          <div>
            <div className="font-semibold text-muted-800">Theme</div>
            <div className="text-sm text-muted-600">{getLabel()}</div>
          </div>
        </div>
        <motion.div
          className="text-muted-400 group-hover:text-muted-600 transition-colors"
          whileHover={{ x: 5 }}
        >
          <Monitor className="w-5 h-5" />
        </motion.div>
      </motion.button>
    )
  }

  if (variant === "compact") {
    return (
      <motion.button
        onClick={toggleTheme}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted-100 hover:bg-muted-200 dark:bg-muted-800 dark:hover:bg-muted-700 transition-colors",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!mounted}
      >
        <motion.div
          animate={{ rotate: mounted && resolvedTheme === "dark" ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {getIcon()}
        </motion.div>
        {showLabel && (
          <span className="text-sm font-medium text-muted-700 dark:text-muted-300">
            {getLabel()}
          </span>
        )}
      </motion.button>
    )
  }

  // Default icon variant
  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size={size === "sm" ? "sm" : "icon"}
        onClick={toggleTheme}
        disabled={!mounted}
        className={cn(
          "relative rounded-lg transition-all duration-300",
          "hover:bg-muted-100 dark:hover:bg-muted-800",
          "focus:ring-2 focus:ring-primary-500/20",
          size === "sm" && "h-8 w-8",
          className
        )}
        aria-label={getLabel()}
      >
        <motion.div
          animate={{ 
            rotate: mounted && resolvedTheme === "dark" ? 180 : 0,
            scale: mounted ? 1 : 0.8 
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="relative"
        >
          {getIcon()}
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: resolvedTheme === "dark" 
              ? "radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
          }}
          animate={{ 
            scale: mounted && resolvedTheme === "dark" ? [1, 1.2, 1] : [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </Button>

      {/* Tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-muted-900 dark:bg-muted-100 text-white dark:text-muted-900 text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        {getLabel()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-muted-900 dark:border-t-muted-100" />
      </motion.div>
    </div>
  )
}