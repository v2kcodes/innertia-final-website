"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Building, 
  MessageSquare,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/ui/form-input"
import { FormTextarea } from "@/components/ui/form-textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>
  className?: string
}

const services = [
  "Website Development",
  "AI Automation",
  "Faceless YouTube AI",
  "Newsletter AI",
  "Media Department Automation", 
  "E-commerce Development",
  "Custom Integrations",
  "Other"
]

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  })

  const [errors, setErrors] = React.useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = React.useState('')

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number"
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // If custom onSubmit provided, use it
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default API submission
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            source: 'pricing_page'
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit form')
        }

        setSubmitMessage(result.message || 'Thank you! We\'ll get back to you soon.')
      }

      setSubmitStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: ""
        })
        setSubmitStatus('idle')
      }, 3000)

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: ""
    })
    setErrors({})
    setSubmitStatus('idle')
    setSubmitMessage('')
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Get Your Custom Quote</CardTitle>
        <p className="text-muted-600 text-center">
          Tell us about your project and we'll provide a detailed proposal within 24 hours.
        </p>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {submitStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Message Sent Successfully!
              </h3>
              
              <p className="text-green-600 mb-6">
                {submitMessage}
              </p>

              <Button 
                onClick={resetForm}
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="name"
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={errors.name}
                  required
                />

                <FormInput
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={errors.email}
                  required
                />
              </div>

              {/* Phone and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="phone"
                  type="tel"
                  label="Phone Number"
                  placeholder="+264 81 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={errors.phone}
                  helperText="Optional - for faster communication"
                />

                <FormInput
                  id="company"
                  label="Company Name"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  error={errors.company}
                  helperText="Optional"
                />
              </div>

              {/* Service Interest */}
              <div className="space-y-2">
                <label 
                  htmlFor="service" 
                  className="text-sm font-medium text-muted-700"
                >
                  Service Interest
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={handleInputChange('service')}
                  className="flex h-12 w-full rounded-lg border border-muted-200 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <FormTextarea
                id="message"
                label="Project Details"
                placeholder="Tell us about your project requirements, goals, timeline, and any specific features you need..."
                value={formData.message}
                onChange={handleInputChange('message')}
                error={errors.message}
                maxLength={1000}
                required
                helperText="Provide as much detail as possible for an accurate quote"
              />

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  <p className="text-sm text-red-700">{submitMessage}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full group relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending Message...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        Send Message
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Privacy Note */}
              <p className="text-xs text-muted-500 text-center">
                By submitting this form, you agree to our privacy policy. 
                We'll never share your information with third parties.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}