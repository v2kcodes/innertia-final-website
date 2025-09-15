"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  ArrowRight,
  Code,
  Zap,
  Users,
  Award
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection } from "@/components/ui/animated-section"
import { NewsletterForm } from "@/components/ui/newsletter-form"
import { WhatsAppSelector } from "@/components/ui/whatsapp-selector"

const navigation = {
  services: [
    { name: "Website Development", href: "/services/web-development" },
    { name: "AI Automation", href: "/services/ai-automation" },
    { name: "Media Department AI", href: "/services/media-ai" },
    { name: "YouTube AI Agent", href: "/services/youtube-ai" },
    { name: "Newsletter AI", href: "/services/newsletter-ai" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "AI Use Cases", href: "/ai-use-cases" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "#contact" },
  ],
  support: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api-docs" },
    { name: "Help Center", href: "/help" },
    { name: "Status", href: "/status" },
  ],
}

const contactInfo = {
  phones: ["+264 81 755 7690", "+264 81 655 6859"],
  email: "innertiass@gmail.com",
  location: "Namibia",
  social: {
    instagram: "https://www.instagram.com/innertiass?igsh=cTJqcmUwbTdteGg4",
    facebook: "https://www.facebook.com/share/17AMcUwEna/?mibextid=wwXIfr",
  },
}


export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-muted-900 via-muted-800 to-black text-white">

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <AnimatedSection className="lg:col-span-2" variant="slideUp">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logos/innertia-logo.png"
                  alt="Innertia Software Solutions"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <GradientText as="h3" size="xl" className="font-display font-bold">
                  Innertia
                </GradientText>
              </div>
              
              <p className="text-muted-300 leading-relaxed max-w-md">
                Leading AI automation and website development company in Namibia. 
                We transform businesses with cutting-edge AI solutions and custom web development.
              </p>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-muted-300">
                  <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>{contactInfo.location}</span>
                </div>
                
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center space-x-3 text-muted-300 hover:text-primary-500 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>{contactInfo.email}</span>
                </motion.a>

                {/* WhatsApp Contact */}
                <WhatsAppSelector variant="footer" />
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <motion.a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                
                <motion.a
                  href={contactInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </AnimatedSection>

          {/* Services */}
          <AnimatedSection className="space-y-6" variant="slideUp" delay={0.1}>
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={item.href}
                      className="text-muted-300 hover:text-primary-500 transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Company */}
          <AnimatedSection className="space-y-6" variant="slideUp" delay={0.2}>
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={item.href}
                      className="text-muted-300 hover:text-primary-500 transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Newsletter */}
          <AnimatedSection className="space-y-6" variant="slideUp" delay={0.3}>
            <NewsletterForm variant="compact" />
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-muted-400 text-sm">
              © {new Date().getFullYear()} Innertia Software Solutions. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-400 hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-400 hover:text-primary-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-400 hover:text-primary-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}