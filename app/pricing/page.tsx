"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Check, 
  X, 
  Star,
  Shield,
  CreditCard,
  HeadphonesIcon,
  Rocket,
  Sparkles,
  Zap,
  ArrowRight,
  MessageCircle
} from "lucide-react"

import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, FloatingCard } from "@/components/ui/card"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList } from "@/components/ui/animated-section"
import { ContactForm } from "@/components/ui/contact-form"
import { CTASection } from "@/components/sections/cta-section"

const pricingTiers = [
  {
    name: "Starter",
    description: "Perfect for small businesses looking to establish their digital presence",
    popular: false,
    color: "from-primary-500 to-secondary-500",
    features: [
      "Custom website design",
      "Responsive mobile optimization", 
      "Basic SEO setup",
      "Contact form integration",
      "Social media links",
      "Google Analytics setup",
      "3 months support",
      "Basic AI chatbot"
    ],
    notIncluded: [
      "E-commerce functionality",
      "Advanced AI automation",
      "Custom integrations",
      "Priority support"
    ]
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses ready to scale with AI automation",
    popular: true,
    color: "from-secondary-500 to-accent-500", 
    features: [
      "Everything in Starter",
      "AI automation system",
      "Newsletter AI agent",
      "Social media automation",
      "Advanced analytics dashboard",
      "E-commerce functionality",
      "Custom integrations",
      "6 months support",
      "Priority support queue",
      "Monthly strategy sessions"
    ],
    notIncluded: [
      "Faceless YouTube AI",
      "Custom AI model training",
      "Dedicated account manager"
    ]
  },
  {
    name: "Enterprise", 
    description: "Complete digital transformation for established businesses",
    popular: false,
    color: "from-accent-500 to-primary-500",
    features: [
      "Everything in Professional",
      "Faceless YouTube AI agent",
      "Custom AI model training",
      "Advanced workflow automation",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom integrations",
      "Unlimited revisions",
      "12 months support",
      "Quarterly business reviews",
      "White-label solutions",
      "Multi-platform deployment"
    ],
    notIncluded: []
  }
]

const trustSignals = [
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "30-day satisfaction guarantee on all projects"
  },
  {
    icon: CreditCard, 
    title: "Flexible Payment Terms",
    description: "Pay in milestones, no upfront commitment required"
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "Dedicated support team for all your needs"
  }
]

const faqs = [
  {
    question: "Why don't you show specific prices?",
    answer: "Every business has unique needs and requirements. Our solutions are custom-built, so pricing varies based on project scope, complexity, and specific features. We provide transparent, detailed quotes after understanding your exact requirements."
  },
  {
    question: "What's included in the consultation?",
    answer: "Our free consultation includes a thorough analysis of your current digital presence, identification of automation opportunities, custom solution design, and a detailed project proposal with transparent pricing and timeline."
  },
  {
    question: "How long does implementation take?",
    answer: "Project timelines vary: Starter projects typically take 2-3 weeks, Professional projects 4-6 weeks, and Enterprise solutions 6-12 weeks depending on complexity and integrations required."
  },
  {
    question: "Do you provide training and support?",
    answer: "Yes! All packages include comprehensive training, documentation, and ongoing support. Professional and Enterprise tiers include extended support periods and regular strategy sessions."
  },
  {
    question: "Can I upgrade between tiers?",
    answer: "Absolutely! You can start with any tier and upgrade as your business grows. We'll seamlessly integrate new features into your existing system without disrupting operations."
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
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
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <AnimatedSection variant="slideUp">
              <div className="inline-flex items-center px-4 py-2 mb-8 glass rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 mr-2 text-accent-400" />
                <span className="text-sm font-medium">
                  Investment in Your Success
                </span>
              </div>
            </AnimatedSection>

            {/* Headline */}
            <div className="mb-8">
              <AnimatedSection variant="slideUp" delay={0.2}>
                <GradientText
                  as="h1"
                  size="4xl"
                  variant="primary"
                  className="mb-6"
                >
                  Transparent AI Automation & Web Development Pricing
                </GradientText>
              </AnimatedSection>

              <AnimatedSection variant="slideUp" delay={0.4}>
                <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Custom AI automation and web development solutions designed for your unique business needs. 
                  Transparent pricing, flexible payment options, and guaranteed ROI for transformative digital results.
                </p>
              </AnimatedSection>
            </div>

            {/* Trust Signals */}
            <AnimatedSection variant="slideUp" delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {trustSignals.map((signal, index) => (
                  <motion.div
                    key={signal.title}
                    className="text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <signal.icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {signal.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {signal.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-gradient-to-br from-muted-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <GradientText
              as="h2"
              size="3xl"
              variant="primary"
              className="mb-6"
            >
              Custom Solution Packages for Every Business Stage
            </GradientText>
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              Every solution is custom-built for your specific needs. Get a detailed quote 
              that matches your requirements and budget.
            </p>
          </AnimatedSection>

          <StaggeredList staggerDelay={0.2} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <FloatingCard 
                key={tier.name}
                className={`group cursor-pointer h-full relative overflow-hidden ${
                  tier.popular ? 'border-2 border-primary-200 shadow-xl shadow-primary/10' : ''
                }`}
                tiltIntensity={6}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center py-2 text-sm font-semibold">
                      Most Popular Choice
                    </div>
                  </div>
                )}

                <CardHeader className={tier.popular ? "pt-12" : ""}>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-r ${tier.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Rocket className="w-6 h-6" />
                    </motion.div>
                    
                    {tier.popular && (
                      <div className="flex items-center text-primary-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-medium ml-1">Popular</span>
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl mb-3 group-hover:text-primary-600 transition-colors">
                    {tier.name}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-600 leading-relaxed mb-6">
                    {tier.description}
                  </CardDescription>

                  <div className="text-center p-6 bg-gradient-to-r from-muted-50 to-accent-50 rounded-lg mb-6">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      Contact for Quote
                    </div>
                    <p className="text-sm text-muted-600">
                      Custom pricing based on your needs
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Included Features */}
                  <div>
                    <h4 className="font-semibold text-muted-800 mb-3">What's Included:</h4>
                    <div className="space-y-2">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Not Included */}
                  {tier.notIncluded.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-muted-800 mb-3">Not Included:</h4>
                      <div className="space-y-2">
                        {tier.notIncluded.map((feature) => (
                          <div key={feature} className="flex items-start text-sm">
                            <X className="w-4 h-4 text-muted-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-500">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button
                      variant={tier.popular ? "default" : "outline"}
                      size="lg"
                      className="w-full group"
                    >
                      Get Custom Quote
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </FloatingCard>
            ))}
          </StaggeredList>

          {/* Additional Info */}
          <AnimatedSection variant="slideUp" delay={0.8} className="text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-muted-800 mb-4">
                Not Sure Which Package is Right for You?
              </h3>
              <p className="text-muted-600 mb-8">
                Book a free consultation and we'll help you choose the perfect solution 
                for your business goals and budget.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="group"
                >
                  Schedule Free Consultation
                  <MessageCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                >
                  Compare All Features
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-white to-muted-50">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
              <MessageCircle className="w-4 h-4 mr-2 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Ready to Get Started?
              </span>
            </div>
            
            <GradientText
              as="h2"
              size="3xl"
              variant="primary"
              className="mb-6"
            >
              Get Your Custom Quote Today
            </GradientText>
            
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              Tell us about your project and receive a detailed proposal with transparent pricing 
              tailored to your specific requirements.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.3} className="max-w-2xl mx-auto">
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-muted-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
              <Zap className="w-4 h-4 mr-2 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Frequently Asked Questions
              </span>
            </div>
            
            <GradientText
              as="h2"
              size="3xl"
              variant="primary"
              className="mb-6"
            >
              Everything You Need to Know
            </GradientText>
            
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions about our pricing, process, and services.
            </p>
          </AnimatedSection>

          <StaggeredList staggerDelay={0.1} className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-transparent hover:border-primary-200 transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary-600 transition-colors">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}