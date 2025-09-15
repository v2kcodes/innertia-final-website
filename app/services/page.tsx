import type { Metadata } from 'next'
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { ServicesHeroSection } from "@/components/sections/services-hero-section"
import { WebDevelopmentSection } from "@/components/sections/web-development-section"
import { AIAutomationSection } from "@/components/sections/ai-automation-section"
import { ProcessSection } from "@/components/sections/process-section"

export const metadata: Metadata = {
  title: 'AI Automation & Web Development Services | Innertia Software Solutions',
  description: 'Professional AI automation and web development services. Faceless YouTube AI, newsletter automation, custom websites, and digital transformation solutions.',
  keywords: 'AI automation services, web development Namibia, YouTube automation, newsletter AI, custom websites, digital transformation, software development, business automation, artificial intelligence, machine learning, web design, responsive development, e-commerce solutions, CMS development, API integration, database solutions, cloud services, mobile development, SEO services, digital marketing automation, social media management, chatbot development, workflow automation, business intelligence, data analysis, custom software solutions, tech consulting, IT services, website maintenance, hosting services, domain management, online solutions, digital strategy, UX design, performance optimization, security services, backup solutions, technical support, scalable systems, modern frameworks, agile development',
  openGraph: {
    title: 'AI Automation & Web Development Services | Innertia Software Solutions',
    description: 'Professional AI automation and web development services including YouTube AI, newsletter automation, custom websites, and comprehensive digital solutions.',
    url: '/services',
    images: [
      {
        url: '/og-services.png',
        width: 1200,
        height: 630,
        alt: 'Innertia Software Solutions Services - AI Automation & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation & Web Development Services | Innertia Software Solutions',
    description: 'Professional AI automation and web development services for modern businesses.',
    images: ['/twitter-services.png'],
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <ServicesHeroSection />
      
      <WebDevelopmentSection />
      
      <AIAutomationSection />
      
      <ProcessSection />
      
      <Footer />
    </main>
  )
}