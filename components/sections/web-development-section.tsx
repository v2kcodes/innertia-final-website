"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Globe, 
  Smartphone, 
  Search, 
  Zap,
  Shield,
  Palette,
  Code2,
  Layers,
  ArrowRight,
  CheckCircle
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, FloatingCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList } from "@/components/ui/animated-section"

const webServices = [
  {
    icon: Globe,
    title: "Custom Website Development",
    description: "Tailored web solutions built from the ground up to match your unique business needs and brand identity.",
    features: ["Custom Design", "Responsive Layout", "Performance Optimized", "SEO Ready"],
    color: "from-primary-500 to-secondary-500"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Websites optimized for mobile devices first, ensuring perfect user experience across all screen sizes.",
    features: ["Touch Optimized", "Fast Loading", "App-like Feel", "Cross-platform"],
    color: "from-secondary-500 to-accent-500"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Built-in search engine optimization to help your website rank higher and attract more organic traffic.",
    features: ["Technical SEO", "Content Optimization", "Local SEO", "Analytics Setup"],
    color: "from-accent-500 to-primary-500"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast websites with optimized loading times and smooth user interactions.",
    features: ["Core Web Vitals", "Image Optimization", "Caching Strategy", "CDN Integration"],
    color: "from-primary-500 to-accent-500"
  }
]

const technologies = [
  { name: "Next.js", category: "Framework", color: "text-primary-600" },
  { name: "React", category: "Library", color: "text-secondary-600" },
  { name: "TypeScript", category: "Language", color: "text-accent-600" },
  { name: "Tailwind CSS", category: "Styling", color: "text-primary-600" },
  { name: "Supabase", category: "Backend", color: "text-secondary-600" },
  { name: "Vercel", category: "Deployment", color: "text-accent-600" },
]

export function WebDevelopmentSection() {
  return (
    <section id="web-development" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
            <Globe className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Web Development Services
            </span>
          </div>
          
          <GradientText
            as="h2"
            size="3xl"
            variant="primary"
            className="mb-6"
          >
            Modern Websites That Drive Results
          </GradientText>
          
          <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
            We create stunning, high-performance websites using the latest technologies. 
            Every project is custom-built to reflect your brand and achieve your business goals.
          </p>
        </AnimatedSection>

        {/* Web Services Grid */}
        <StaggeredList staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {webServices.map((service, index) => (
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
                      <CheckCircle className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:text-white transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </FloatingCard>
          ))}
        </StaggeredList>

        {/* Technologies Section */}
        <AnimatedSection variant="slideUp" delay={0.6}>
          <div className="text-center mb-12">
            <GradientText
              as="h3"
              size="2xl"
              variant="primary"
              className="mb-4"
            >
              Cutting-Edge Technologies
            </GradientText>
            <p className="text-muted-600 max-w-2xl mx-auto">
              We use the most modern and reliable technologies to ensure your website is 
              fast, secure, and scalable.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="p-4 rounded-lg bg-muted-50 group-hover:bg-white group-hover:shadow-lg transition-all duration-300 border border-transparent group-hover:border-primary-200">
                  <div className={`font-semibold ${tech.color} mb-1`}>
                    {tech.name}
                  </div>
                  <div className="text-xs text-muted-500 uppercase tracking-wide">
                    {tech.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}