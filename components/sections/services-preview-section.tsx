"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Globe, 
  Bot, 
  Video, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Zap,
  Users,
  TrendingUp
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, FloatingCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList } from "@/components/ui/animated-section"

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Custom, responsive websites built with cutting-edge technologies for optimal performance and user experience.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Custom CMS"],
    color: "from-primary-500 to-secondary-500",
    href: "/services/web-development",
  },
  {
    icon: Bot,
    title: "Media Department Automation",
    description: "Streamline your media operations with AI-powered content creation, scheduling, and performance analytics.",
    features: ["Content Creation", "Auto Scheduling", "Analytics", "Multi-Platform"],
    color: "from-secondary-500 to-accent-500",
    href: "/services/media-ai",
  },
  {
    icon: Video,
    title: "Faceless YouTube AI Agent",
    description: "Generate engaging YouTube content automatically without showing your face. AI handles script, visuals, and optimization.",
    features: ["Script Generation", "Voice Synthesis", "Auto Upload", "SEO Optimization"],
    color: "from-accent-500 to-primary-500",
    href: "/services/youtube-ai",
  },
  {
    icon: Mail,
    title: "Newsletter AI Agent",
    description: "Automated newsletter creation and distribution with AI-generated content tailored to your audience.",
    features: ["Content Generation", "Audience Segmentation", "A/B Testing", "Performance Tracking"],
    color: "from-primary-500 to-accent-500",
    href: "/services/newsletter-ai",
  },
]


export function ServicesPreviewSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-muted-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
            <Sparkles className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Our Services
            </span>
          </div>
          
          <GradientText
            as="h2"
            size="3xl"
            variant="primary"
            className="mb-6"
          >
            AI-Powered Solutions for Modern Business
          </GradientText>
          
          <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
            From intelligent automation to custom web development, we deliver solutions 
            that transform how you operate and grow your business.
          </p>
        </AnimatedSection>


        {/* Services Grid */}
        <StaggeredList staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <FloatingCard key={service.title} className="group cursor-pointer h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-6 h-6" />
                  </motion.div>
                  
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-5 h-5 text-muted-400" />
                  </motion.div>
                </div>
                
                <CardTitle className="text-xl mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </CardTitle>
                
                <CardDescription className="text-muted-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center text-sm text-muted-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Link href={service.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-accent-500 group-hover:text-white transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </FloatingCard>
          ))}
        </StaggeredList>

        {/* CTA */}
        <AnimatedSection variant="slideUp" delay={0.8} className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-muted-800 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-600 mb-8">
              Let's discuss how our AI automation solutions can streamline your operations 
              and accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <Button
                  variant="default"
                  size="lg"
                  className="group"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                >
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}