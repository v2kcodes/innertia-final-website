"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsletterFormProps {
  className?: string
  variant?: 'default' | 'compact'
}

export function NewsletterForm({ className = "", variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState("")

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'footer'
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe')
      }

      setStatus('success')
      setMessage(result.message || 'Successfully subscribed!')
      setEmail("") // Clear form on success
      
      // Reset to idle after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)

    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setMessage(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again.'
      )
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`space-y-3 ${className}`}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2 text-green-400"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{message}</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-muted-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
                <Button 
                  type="submit"
                  variant="gradient" 
                  size="sm"
                  disabled={isSubmitting}
                  className="whitespace-nowrap min-w-[100px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-400"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
        
        <p className="text-xs text-muted-400">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    )
  }

  // Default variant - more detailed form
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
          <Mail className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Stay Updated</h3>
      </div>
      
      <p className="text-muted-300 text-sm">
        Get the latest insights on AI automation and web development trends.
      </p>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-6"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-green-400 mb-2">
              Successfully Subscribed!
            </h4>
            <p className="text-green-300 text-sm">{message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-muted-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
              
              <Button 
                type="submit"
                variant="gradient" 
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Subscribing to Newsletter...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Subscribe to Newsletter
                  </div>
                )}
              </Button>
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 bg-red-900/20 border border-red-500/20 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                <span className="text-sm text-red-300">{message}</span>
              </motion.div>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <div className="text-xs text-muted-400 space-y-1">
        <p>✓ Latest AI automation insights</p>
        <p>✓ Web development tips and trends</p>
        <p>✓ Exclusive case studies and offers</p>
        <p className="pt-2">No spam. Unsubscribe at any time.</p>
      </div>
    </div>
  )
}