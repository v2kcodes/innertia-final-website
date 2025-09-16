"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Bot, 
  Video, 
  Mail, 
  Users,
  TrendingUp,
  Calendar,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, FloatingCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList, CountUp } from "@/components/ui/animated-section"

const aiServices = [
  {
    icon: Users,
    title: "Media Department Automation",
    description: "Transform your media operations with AI-powered content creation, scheduling, and performance analytics across all platforms.",
    features: [
      "Automated content creation",
      "Multi-platform scheduling",
      "Performance analytics",
      "Brand consistency AI",
      "Engagement optimization",
      "ROI tracking"
    ],
    benefits: [
      "80% time savings on content creation",
      "300% increase in posting consistency",
      "50% boost in engagement rates"
    ],
    color: "from-primary-500 to-secondary-500",
    demo: "media-demo"
  },
  {
    icon: Video,
    title: "Faceless YouTube AI Agent",
    description: "Generate engaging YouTube content automatically without showing your face. Our AI handles everything from scripts to uploads.",
    features: [
      "AI script generation",
      "Voice synthesis",
      "Video creation",
      "SEO optimization",
      "Auto uploading",
      "Performance monitoring"
    ],
    benefits: [
      "0 hours of manual video creation",
      "100+ videos per month capacity",
      "Professional quality output"
    ],
    color: "from-secondary-500 to-accent-500",
    demo: "youtube-demo"
  },
  {
    icon: Mail,
    title: "Newsletter AI Agent",
    description: "Automated newsletter creation and distribution with AI-generated content tailored to your audience segments.",
    features: [
      "Content generation",
      "Audience segmentation",
      "A/B testing",
      "Send optimization",
      "Performance tracking",
      "Personalization"
    ],
    benefits: [
      "90% time reduction in newsletter prep",
      "40% higher open rates",
      "60% increase in click-through rates"
    ],
    color: "from-accent-500 to-primary-500",
    demo: "newsletter-demo"
  },
  {
    icon: TrendingUp,
    title: "Viral Shorts/Reels Agent",
    description: "AI-powered creation of viral-ready short-form content optimized for maximum reach and engagement.",
    features: [
      "Trend analysis",
      "Content optimization",
      "Hashtag strategy",
      "Timing optimization",
      "Cross-platform posting",
      "Viral prediction"
    ],
    benefits: [
      "500% increase in viral potential",
      "10x faster content production",
      "Algorithm-optimized content"
    ],
    color: "from-primary-500 to-accent-500",
    demo: "shorts-demo"
  }
]


export function AIAutomationSection() {
  const [activeDemo, setActiveDemo] = React.useState<string | null>(null)

  return (
    <section id="ai-automation" className="py-24 bg-gradient-to-br from-white to-muted-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-secondary-100 to-accent-100 rounded-full">
            <Bot className="w-4 h-4 mr-2 text-secondary-600" />
            <span className="text-sm font-medium text-secondary-700">
              AI Automation Services
            </span>
          </div>
          
          <GradientText
            as="h2"
            size="3xl"
            variant="secondary"
            className="mb-6"
          >
            Intelligent Automation That Works 24/7
          </GradientText>
          
          <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
            Our AI agents handle repetitive tasks, create engaging content, and optimize 
            your marketing efforts while you focus on growing your business.
          </p>
        </AnimatedSection>


        {/* AI Services Grid */}
        <StaggeredList staggerDelay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {aiServices.map((service, index) => (
            <FloatingCard 
              key={service.title} 
              className="group cursor-pointer h-full relative overflow-hidden"
              tiltIntensity={8}
            >
              {/* Service Header */}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-6 h-6" />
                  </motion.div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setActiveDemo(activeDemo === service.demo ? null : service.demo)}
                    aria-label={activeDemo === service.demo ? `Pause ${service.title} demo` : `Play ${service.title} demo`}
                  >
                    {activeDemo === service.demo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
                
                <CardTitle className="text-xl mb-3 group-hover:text-secondary-600 transition-colors">
                  {service.title}
                </CardTitle>
                
                <CardDescription className="text-muted-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-muted-800 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={feature} className="flex items-center text-sm text-muted-600">
                        <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-muted-800 mb-3">Expected Results:</h4>
                  <div className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <div key={benefit} className="flex items-start text-sm">
                        <TrendingUp className="w-4 h-4 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demo Indicator */}
                {activeDemo === service.demo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-secondary-200 rounded-lg p-4 bg-gradient-to-r from-secondary-50 to-accent-50"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse mr-2" />
                      <span className="text-sm font-medium text-secondary-700">Demo Mode Active</span>
                    </div>
                    <p className="text-xs text-secondary-600">
                      Interactive demo showing {service.title.toLowerCase()} in action.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      View Full Demo
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </motion.div>
                )}

                {/* CTA */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between group-hover:bg-gradient-to-r group-hover:from-secondary-500 group-hover:to-accent-500 group-hover:text-white transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </FloatingCard>
          ))}
        </StaggeredList>

        {/* CTA Section */}
        <AnimatedSection variant="slideUp" delay={0.8} className="text-center">
          <div className="max-w-3xl mx-auto">
            <GradientText
              as="h3"
              size="2xl"
              variant="secondary"
              className="mb-4"
            >
              Ready to Automate Your Business?
            </GradientText>
            <p className="text-muted-600 mb-8 leading-relaxed">
              Our AI agents are designed to work seamlessly with your existing workflows. 
              Start with a free consultation to discover which automation solutions are perfect for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/pricing">
                <Button
                  variant="default"
                  size="lg"
                  className="group"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              
              <a href="/ai-use-cases">
                <Button
                  variant="outline"
                  size="lg"
                >
                  View Case Studies
                </Button>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}