"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Contact {
  name: string
  phone: string
  role: string
  whatsappUrl: string
}

const contacts: Contact[] = [
  {
    name: "Fabrizio",
    phone: "+264 81 755 7690", 
    role: "Technical Lead",
    whatsappUrl: "https://wa.me/264817557690"
  },
  {
    name: "Consultant",
    phone: "+264 81 655 6859",
    role: "Business Development", 
    whatsappUrl: "https://wa.me/264816556859"
  }
]

interface WhatsAppSelectorProps {
  variant?: "default" | "compact" | "footer"
  className?: string
  buttonClassName?: string
  dropdownClassName?: string
}

export function WhatsAppSelector({
  variant = "default",
  className,
  buttonClassName,
  dropdownClassName
}: WhatsAppSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<Contact>(contacts[0])
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setIsOpen(false)
    // Open WhatsApp immediately when contact is selected
    window.open(contact.whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          buttonRef.current?.focus()
          break
        case 'ArrowDown':
        case 'ArrowUp':
          event.preventDefault()
          const menuItems = dropdownRef.current?.querySelectorAll('[role="menuitem"]')
          if (menuItems && menuItems.length > 0) {
            const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement)
            const nextIndex = event.key === 'ArrowDown'
              ? (currentIndex + 1) % menuItems.length
              : (currentIndex - 1 + menuItems.length) % menuItems.length
            ;(menuItems[nextIndex] as HTMLElement).focus()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (variant === "compact") {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <motion.button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={cn(
            "flex items-center space-x-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white transition-all duration-200 text-sm font-medium touch-manipulation min-h-[44px] w-full justify-center",
            "focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
            buttonClassName
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Open WhatsApp contact selector"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop for mobile */}
              <motion.div
                className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut"
                }}
                className={cn(
                  "absolute top-full left-0 mt-2 min-w-[280px] bg-white dark:bg-muted-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-muted-700 z-50 overflow-hidden",
                  dropdownClassName
                )}
                role="menu"
                aria-label="WhatsApp contacts"
              >
                {contacts.map((contact, index) => (
                  <motion.button
                    key={contact.phone}
                    onClick={() => handleContactSelect(contact)}
                    className="w-full px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-muted-700 transition-colors flex items-center space-x-4 border-b border-gray-100 dark:border-muted-600 last:border-b-0 touch-manipulation min-h-[60px] focus:outline-none focus:bg-gray-50 dark:focus:bg-muted-700"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.1,
                      delay: index * 0.03,
                      ease: "easeOut"
                    }}
                    whileTap={{ scale: 0.98 }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-sm">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">{contact.name}</div>
                      <div className="text-xs text-gray-500 dark:text-muted-400 truncate">{contact.role}</div>
                      <div className="text-xs text-gray-600 dark:text-muted-300 truncate">{contact.phone}</div>
                    </div>
                    <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (variant === "footer") {
    return (
      <div className={cn("space-y-3", className)}>
        <h4 className="text-sm font-semibold text-white/90 mb-3 flex items-center">
          <MessageCircle className="w-4 h-4 mr-2 text-[#25D366]" />
          WhatsApp Chat
        </h4>
        {contacts.map((contact, index) => (
          <motion.a
            key={contact.phone}
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-muted-300 hover:text-[#25D366] transition-colors group"
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{contact.name}</div>
              <div className="text-xs text-muted-400">{contact.role}</div>
              <div className="text-xs text-muted-400">{contact.phone}</div>
            </div>
          </motion.a>
        ))}
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn("relative", className)}>
      <motion.button
        onClick={toggleDropdown}
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl",
          buttonClassName
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-semibold">Contact via WhatsApp</div>
            <div className="text-sm text-white/80">Choose who to contact</div>
          </div>
        </div>
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden",
              dropdownClassName
            )}
          >
            {contacts.map((contact, index) => (
              <motion.button
                key={contact.phone}
                onClick={() => handleContactSelect(contact)}
                className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors flex items-center space-x-4 border-b border-gray-100 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ backgroundColor: "#f9fafb", x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{contact.name}</div>
                  <div className="text-sm text-gray-500">{contact.role}</div>
                  <div className="text-sm text-gray-600">{contact.phone}</div>
                </div>
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}