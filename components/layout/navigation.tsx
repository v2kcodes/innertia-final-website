"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import { MotionDiv } from "@/lib/motion-helpers"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { WhatsAppSelector } from "@/components/ui/whatsapp-selector"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "AI Use Cases", href: "/ai-use-cases" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

const contactInfo = {
  phones: ["+264817557690", "+264816556859"],
  email: "innertiass@gmail.com"
}

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const menuRef = React.useRef<HTMLDivElement>(null)
  const menuButtonRef = React.useRef<HTMLButtonElement>(null)
  const [dragY, setDragY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Focus management and accessibility
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus first menu item
      const firstMenuItem = menuRef.current?.querySelector('[role="menuitem"]') as HTMLElement
      firstMenuItem?.focus()
    } else {
      document.body.style.overflow = 'unset'
      // Return focus to menu button
      menuButtonRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          break
        case 'Tab':
          // Trap focus within menu
          const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"], button, a')
          if (menuItems && menuItems.length > 0) {
            const firstItem = menuItems[0] as HTMLElement
            const lastItem = menuItems[menuItems.length - 1] as HTMLElement

            if (event.shiftKey && document.activeElement === firstItem) {
              event.preventDefault()
              lastItem.focus()
            } else if (!event.shiftKey && document.activeElement === lastItem) {
              event.preventDefault()
              firstItem.focus()
            }
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Gesture handling for mobile
  const handleDragEnd = (event: any, info: any) => {
    const shouldClose = info.velocity.y > 500 || info.offset.y > 100
    if (shouldClose) {
      setIsOpen(false)
    }
    setDragY(0)
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-muted-200"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <MotionDiv
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/logos/innertia-logo.png"
                  alt="Innertia Software Solutions"
                  width={40}
                  height={40}
                  className="w-10 h-10 lg:w-12 lg:h-12"
                />
                <span className="ml-2 text-lg lg:text-xl font-display font-bold gradient-text">
                  Innertia
                </span>
              </Link>
            </MotionDiv>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors hover:text-primary-500",
                      pathname === item.href
                        ? "text-primary-500"
                        : scrolled
                        ? "text-muted-800"
                        : "text-white"
                    )}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-sm">
                <WhatsAppSelector 
                  variant="compact" 
                  className="relative z-50"
                  buttonClassName={cn(
                    "text-xs",
                    !scrolled && "bg-white/20 hover:bg-white/30 text-white border border-white/20"
                  )}
                  dropdownClassName="mt-1"
                />
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className={cn(
                    "flex items-center space-x-1 hover:text-primary-500 transition-colors",
                    scrolled ? "text-muted-600" : "text-white/80"
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden xl:inline">Email</span>
                </motion.a>
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle 
                variant="icon" 
                size="sm"
                className={cn(
                  "transition-colors",
                  scrolled 
                    ? "text-muted-600 hover:text-primary-500" 
                    : "text-white/80 hover:text-white"
                )}
              />
              
              <Link href="/pricing">
                <Button
                  variant={scrolled ? "default" : "glass"}
                  size="sm"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                ref={menuButtonRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "relative z-50 touch-manipulation min-h-[44px] min-w-[44px]",
                  scrolled ? "text-muted-800" : "text-white"
                )}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Bottom Sheet Menu */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation menu"
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-muted-900 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: dragY }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 35,
                stiffness: 400,
                mass: 0.8
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.3 }}
              onDragEnd={handleDragEnd}
              onDrag={(_, info) => setDragY(info.offset.y)}
              style={{
                // Respect reduced motion preference
                transition: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'transform 0.2s ease-out'
                  : undefined
              }}
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-muted-300 dark:bg-muted-600 rounded-full" />
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: 'calc(85vh - 24px)' }}>
                <div className="px-6 pt-4 pb-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-muted-900 dark:text-white mb-1">Navigation</h2>
                    <p className="text-sm text-muted-600 dark:text-muted-400">Quick access to all sections</p>
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-2 mb-6" role="menu">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.05,
                          ease: "easeOut"
                        }}
                      >
                        <Link
                          href={item.href}
                          role="menuitem"
                          tabIndex={0}
                          className={cn(
                            "block px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 touch-manipulation min-h-[44px] flex items-center",
                            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-muted-900",
                            pathname === item.href
                              ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                              : "text-muted-800 dark:text-muted-200 hover:bg-muted-100 dark:hover:bg-muted-800 active:scale-[0.98]"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{item.name}</span>
                          {pathname === item.href && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-white rounded-full"
                              layoutId="mobile-nav-indicator"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Quick Actions */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-4 bg-muted-50 dark:bg-muted-800 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-muted-900 dark:text-white">Quick Contact</p>
                          <p className="text-sm text-muted-600 dark:text-muted-400">WhatsApp or Email</p>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-400" />
                    </div>

                    {/* Simplified WhatsApp */}
                    <WhatsAppSelector
                      variant="compact"
                      className="w-full"
                      buttonClassName="w-full justify-center min-h-[44px] text-base font-medium"
                      dropdownClassName="w-full left-0 right-0"
                    />

                    {/* Email */}
                    <motion.a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center justify-center space-x-2 p-4 border-2 border-muted-200 dark:border-muted-700 rounded-xl text-muted-700 dark:text-muted-300 hover:border-primary-300 dark:hover:border-primary-600 transition-colors min-h-[44px] touch-manipulation"
                      whileTap={{ scale: 0.98 }}
                      role="menuitem"
                      tabIndex={0}
                    >
                      <Mail className="w-5 h-5" />
                      <span className="font-medium">Send Email</span>
                    </motion.a>
                  </div>

                  {/* Theme Toggle */}
                  <div className="mb-6">
                    <ThemeToggle variant="mobile" />
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="pb-2"
                  >
                    <Link href="/pricing" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full min-h-[48px] text-base font-semibold shadow-lg hover:shadow-xl transition-shadow touch-manipulation"
                        role="menuitem"
                        tabIndex={0}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}