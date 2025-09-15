"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, User } from "lucide-react"
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

interface WhatsAppWidgetProps {
  className?: string
  position?: "bottom-left" | "bottom-right"
}

export function WhatsAppWidget({ 
  className,
  position = "bottom-left" 
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const widgetRef = React.useRef<HTMLDivElement>(null)

  // Handle click outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  const handleContactClick = (contact: Contact) => {
    window.open(contact.whatsappUrl, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  const positionClasses = {
    "bottom-left": "bottom-4 left-4 md:bottom-6 md:left-6",
    "bottom-right": "bottom-4 right-4 md:bottom-6 md:right-6"
  }

  return (
    <div
      ref={widgetRef}
      className={cn(
        "fixed z-50 flex flex-col items-start",
        positionClasses[position],
        className
      )}
    >
      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ 
              duration: 0.3, 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            className="mb-4 w-72 sm:w-80 glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">WhatsApp Chat</h3>
                  <p className="text-white/80 text-xs">Choose who to contact</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close WhatsApp widget"
              >
                <X className="w-3 h-3" />
              </motion.button>
            </div>

            {/* Contact List */}
            <div className="bg-white p-4 space-y-3">
              {contacts.map((contact, index) => (
                <motion.button
                  key={contact.phone}
                  onClick={() => handleContactClick(contact)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-500">{contact.role}</div>
                    <div className="text-xs text-gray-600">{contact.phone}</div>
                  </div>
                  <motion.div
                    className="text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Click to start a WhatsApp conversation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={toggleWidget}
        className={cn(
          "w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden",
          "focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        aria-label={isOpen ? "Close WhatsApp menu" : "Open WhatsApp menu"}
      >
        {/* Background pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          WhatsApp Chat
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </motion.div>
      </motion.button>
    </div>
  )
}