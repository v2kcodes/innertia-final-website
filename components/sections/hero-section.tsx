"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Zap, 
  Globe, 
  Bot, 
  Video, 
  Mail,
  Palette,
  Code2,
  Users,
  Layers
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { GradientText, AnimatedText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList } from "@/components/ui/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const floatingIcons = [
  { icon: Sparkles, className: "top-20 left-10 text-blue-400", delay: 0 },
  { icon: Zap, className: "top-32 right-16 text-cyan-400", delay: 0.5 },
  { icon: Sparkles, className: "bottom-32 left-20 text-blue-500", delay: 1 },
  { icon: Zap, className: "bottom-20 right-20 text-cyan-500", delay: 1.5 },
]

const heroServices = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Content Management",
    description: "AI-powered content creation and management systems",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Intelligent automation solutions for business processes",
    color: "from-purple-500 to-blue-500"
  },
  {
    icon: Video,
    title: "Media Solutions",
    description: "Automated video and content production systems",
    color: "from-blue-500 to-purple-500"
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Dark Theme Animated Background */}
      <div className="absolute inset-0 dark-theme-bg opacity-95" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute hidden lg:block ${item.className}`}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1, 
            rotate: 0,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: item.delay },
            scale: { duration: 0.6, delay: item.delay },
            rotate: { duration: 0.6, delay: item.delay },
            y: { 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut",
              delay: item.delay 
            }
          }}
        >
          <item.icon className="w-8 h-8" />
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 mb-8 glass rounded-full border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
            <span className="text-sm font-medium text-white">
              AI-Powered Business Automation
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-8">
            <AnimatedText
              as="h1"
              size="4xl"
              variant="primary"
              delay={0.4}
              stagger={0.05}
              className="text-white"
            >
              AI Automation & Web Development Services in Namibia
            </AnimatedText>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-4"
            >
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight dark-gradient-text">
                Transforming Businesses with Custom AI Solutions
              </h2>
            </motion.div>
          </div>

          {/* Subheading */}
          <AnimatedSection variant="slideUp" delay={1.5}>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              From intelligent AI automation systems and custom web development to YouTube AI agents and newsletter automation, 
              we deliver cutting-edge digital transformation solutions that drive business growth and operational efficiency for companies across Africa.
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection variant="slideUp" delay={2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20">
              <Link href="/pricing">
                <Button
                  size="xl"
                  className="group font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/services">
                <Button
                  variant="ghost"
                  size="xl"
                  className="group text-white border-2 border-white/30 hover:bg-white/10"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Explore Services
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Service Cards Grid */}
          <AnimatedSection variant="slideUp" delay={2.3} className="mb-20">
            <StaggeredList 
              staggerDelay={0.2} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {heroServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="dark-card rounded-xl p-6 text-center group cursor-pointer transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.5 + (index * 0.1) }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-r ${service.color} text-white`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <service.icon className="w-6 h-6" />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </StaggeredList>
          </AnimatedSection>

        </div>
      </div>

    </section>
  )
}