"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Globe, 
  Bot, 
  Video, 
  Mail, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { GradientText, AnimatedText } from "@/components/ui/gradient-text"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Card, CardContent } from "@/components/ui/card"

const serviceHighlights = [
  { icon: Globe, label: "Custom Web Development" },
  { icon: Bot, label: "AI Automation Systems" },
  { icon: Video, label: "Content Generation" },
  { icon: Mail, label: "Marketing Automation" },
]


export function ServicesHeroSection() {
  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-muted-900 via-muted-800 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <AnimatedSection variant="slideUp">
            <div className="inline-flex items-center px-4 py-2 mb-8 glass rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 mr-2 text-accent-400" />
              <span className="text-sm font-medium">
                Comprehensive Services
              </span>
            </div>
          </AnimatedSection>

          {/* Headline */}
          <div className="mb-8">
            <AnimatedText
              as="h1"
              size="4xl"
              variant="primary"
              delay={0.2}
              stagger={0.03}
            >
              Professional AI Automation & Web Development Services
            </AnimatedText>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-4"
            >
              <GradientText
                as="h2"
                size="3xl"
                variant="accent"
                animated
                className="leading-tight"
              >
                Custom Solutions for Digital Transformation
              </GradientText>
            </motion.div>
          </div>

          {/* Description */}
          <AnimatedSection variant="slideUp" delay={2}>
            <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              From intelligent AI automation systems and responsive web development to custom software solutions and digital marketing automation, 
              we deliver comprehensive technology services that accelerate business growth and maximize operational efficiency.
            </p>
          </AnimatedSection>

          {/* Service Highlights */}
          <AnimatedSection variant="slideUp" delay={2.3} className="mb-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {serviceHighlights.map((service, index) => (
                <motion.div
                  key={service.label}
                  className="glass p-4 rounded-xl border border-white/20 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.5 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-sm font-medium text-center text-white/90">
                    {service.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection variant="slideUp" delay={2.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
              <a href="#services">
                <Button
                  variant="glass"
                  size="xl"
                  className="group font-semibold"
                >
                  Explore Services
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              
              <a href="/pricing">
                <Button
                  variant="ghost"
                  size="xl"
                  className="group text-white border-2 border-white/30 hover:bg-white/10"
                >
                  Get Quote
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>


        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ 
                behavior: 'smooth' 
              })
            }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ height: [8, 16, 8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <p className="text-white/60 text-xs mt-2 uppercase tracking-wide text-center">
            Discover More
          </p>
        </motion.div>
      </div>
    </section>
  )
}