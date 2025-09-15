"use client"

import * as React from "react"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { AnimatedSection } from "@/components/ui/animated-section"

export function TrustLogosSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection variant="slideUp" className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-muted-800 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-600 max-w-2xl mx-auto">
            We partner with cutting-edge platforms and technologies to deliver exceptional results
          </p>
        </AnimatedSection>
        
        <AnimatedSection variant="fade" delay={0.3}>
          <LogoCarousel className="px-4" />
        </AnimatedSection>
      </div>
    </section>
  )
}