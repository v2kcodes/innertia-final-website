"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Mail } from "lucide-react"
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

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
            <motion.div
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
            </motion.div>

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
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  scrolled ? "text-muted-800" : "text-white"
                )}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu */}
            <motion.div
              className="fixed top-16 right-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                {/* Contact Info */}
                <div className="mb-8 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
                  <h3 className="font-semibold text-muted-800 mb-4">Contact Us</h3>
                  <div className="space-y-4">
                    {/* WhatsApp Options */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-700 mb-2 flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-[#25D366]" />
                        WhatsApp Chat
                      </h4>
                      <div className="space-y-2">
                        <a
                          href="https://wa.me/264817557690"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 text-sm text-muted-600 hover:text-[#25D366] transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                            <Phone className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">Fabrizio - Technical Lead</div>
                            <div className="text-xs text-muted-500">+264 81 755 7690</div>
                          </div>
                        </a>
                        <a
                          href="https://wa.me/264816556859"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 text-sm text-muted-600 hover:text-[#25D366] transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                            <Phone className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">Consultant - Business Development</div>
                            <div className="text-xs text-muted-500">+264 81 655 6859</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center space-x-2 text-sm text-muted-600 hover:text-primary-500"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{contactInfo.email}</span>
                    </a>
                    
                    {/* Theme Toggle */}
                    <div className="pt-3 border-t border-gray-200">
                      <ThemeToggle variant="mobile" />
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                          pathname === item.href
                            ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white"
                            : "text-muted-800 hover:bg-muted-100"
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Link href="/pricing">
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}