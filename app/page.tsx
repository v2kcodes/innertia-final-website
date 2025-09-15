import type { Metadata } from 'next'
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustLogosSection } from "@/components/sections/trust-logos-section"
import { AIAutomationSection } from "@/components/sections/ai-automation-section"
import { WebDevelopmentSection } from "@/components/sections/web-development-section"
import { ProcessSection } from "@/components/sections/process-section"
import { CTASection } from "@/components/sections/cta-section"

export const metadata: Metadata = {
  title: 'AI Automation & Web Development Services | Innertia Software Solutions',
  description: 'Transform your business with AI automation, web development, and digital solutions. Custom YouTube AI, newsletter automation, and modern websites in Namibia.',
  keywords: 'AI automation Namibia, web development services, business automation, YouTube AI, newsletter automation, custom websites, digital transformation, AI solutions, software development, automation systems, Namibian tech company, artificial intelligence, machine learning, web design, responsive websites, e-commerce development, content management systems, API development, database design, cloud solutions, mobile apps, SEO optimization, digital marketing, social media automation, chatbots, workflow automation, business intelligence, data analytics, custom software, tech consulting, IT services, website maintenance, hosting solutions, domain services, online presence, digital strategy, conversion optimization, user experience, modern web technologies, scalable solutions, performance optimization, security solutions, backup systems, tech support',
  openGraph: {
    title: 'AI Automation & Web Development Services | Innertia Software Solutions',
    description: 'Transform your business with cutting-edge AI automation and custom web development solutions. Specializing in YouTube AI, newsletter automation, and digital transformation.',
    url: '/',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Innertia Software Solutions - AI Automation & Web Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation & Web Development Services | Innertia Software Solutions',
    description: 'Transform your business with cutting-edge AI automation and custom web development solutions.',
    images: ['/twitter-home.png'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <HeroSection />
      
      <TrustLogosSection />
      
      <AIAutomationSection />
      
      <WebDevelopmentSection />
      
      <ProcessSection />
      
      <CTASection />
      
      <Footer />
    </main>
  )
}