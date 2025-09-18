"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection } from "@/components/ui/animated-section"
import { WhatsAppSelector } from "@/components/ui/whatsapp-selector"

const benefits = [
  "Free initial consultation",
  "Custom solution design",
  "Ongoing support & maintenance",
  "Transparent pricing",
]

const contactMethods = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+264 81 755 7690",
    href: "tel:+264817557690",
    description: "Speak directly with our experts",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "innertiass@gmail.com",
    href: "mailto:innertiass@gmail.com",
    description: "Get detailed project information",
  },
]

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-muted-900 via-muted-800 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='m11 18 0 18c0 1.5 1.5 3 3 3l18 0c1.5 0 3-1.5 3-3l0-18c0-1.5-1.5-3-3-3l-18 0c-1.5 0-3 1.5-3 3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection variant="slideLeft" className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 mb-6 glass rounded-full border border-white/20">
                <CheckCircle className="w-4 h-4 mr-2 text-accent-400" />
                <span className="text-sm font-medium">Transform Your Business Today</span>
              </div>

              <GradientText
                as="h2"
                size="3xl"
                variant="primary"
                className="mb-6"
              >
                Let's Build Something Amazing Together
              </GradientText>

              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Whether you need a stunning website, AI automation, or a complete digital transformation, 
                our team is ready to bring your vision to life.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-5 h-5 mr-3 text-accent-400 flex-shrink-0" />
                    {benefit}
                  </motion.div>
                ))}
              </div>

              {/* Main CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/pricing">
                  <Button
                    variant="glass"
                    size="xl"
                    className="group mb-6"
                  >
                    Get Your Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <p className="text-sm text-white/80">
                No commitment required. Let's discuss your project and explore possibilities.
              </p>
            </div>
          </AnimatedSection>

          {/* Contact Methods */}
          <AnimatedSection variant="slideRight" delay={0.3}>
            <Card className="glass border-white/20 p-8">
              <CardContent className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Multiple Ways to Connect
                  </h3>
                  <p className="text-white/70">
                    Choose the communication method that works best for you
                  </p>
                </div>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      className="block group"
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center p-4 rounded-xl glass-dark border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 mr-4 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {method.label}
                          </h4>
                          <p className="text-white/70 text-sm mb-1">
                            {method.description}
                          </p>
                          <p className="text-accent-400 font-medium">
                            {method.value}
                          </p>
                        </div>

                        <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </motion.a>
                  ))}
                  
                  {/* WhatsApp Selector */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: contactMethods.length * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <WhatsAppSelector 
                      variant="default"
                      className="w-full"
                      buttonClassName="glass-dark border border-white/10 hover:border-white/20 hover:bg-white/10 text-white bg-[#25D366] hover:bg-[#128C7E]"
                    />
                  </motion.div>
                </div>

                {/* Social Proof */}
                <motion.div
                  className="text-center pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-white/80 mb-2">
                    Join 25+ satisfied clients who transformed their business with our solutions
                  </p>
                  <div className="flex justify-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-accent-400 text-lg"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1 + (i * 0.1) }}
                        viewport={{ once: true }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-xs text-white/75 mt-1">4.9/5 average client rating</p>
                </motion.div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}