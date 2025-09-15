"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  MessageCircle, 
  Lightbulb, 
  Code, 
  Rocket,
  CheckCircle,
  ArrowRight,
  Clock,
  Users
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList } from "@/components/ui/animated-section"

const processSteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: "Discovery & Consultation",
    description: "We start with a comprehensive consultation to understand your business goals, target audience, and project requirements.",
    duration: "1-2 days",
    deliverables: ["Project scope document", "Technical requirements", "Timeline & budget"],
    color: "from-primary-500 to-secondary-500"
  },
  {
    step: 2,
    icon: Lightbulb,
    title: "Strategy & Planning",
    description: "Our team creates a detailed project plan, wireframes, and technical architecture tailored to your specific needs.",
    duration: "3-5 days",
    deliverables: ["Project roadmap", "Wireframes", "Technical specifications", "Design mockups"],
    color: "from-secondary-500 to-accent-500"
  },
  {
    step: 3,
    icon: Code,
    title: "Development & Implementation",
    description: "We bring your project to life using cutting-edge technologies, with regular updates and milestone reviews.",
    duration: "2-6 weeks",
    deliverables: ["Development milestones", "Regular progress updates", "Testing & QA", "Beta version"],
    color: "from-accent-500 to-primary-500"
  },
  {
    step: 4,
    icon: Rocket,
    title: "Launch & Optimization",
    description: "We deploy your solution, monitor performance, and provide ongoing support to ensure optimal results.",
    duration: "1 week+",
    deliverables: ["Live deployment", "Performance monitoring", "Training materials", "Ongoing support"],
    color: "from-primary-500 to-accent-500"
  }
]

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced developers and designers dedicated to your success"
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect deadlines and deliver projects on schedule"
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous testing and quality checks at every stage"
  }
]

export function ProcessSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-muted-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
            <Rocket className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Our Process
            </span>
          </div>
          
          <GradientText
            as="h2"
            size="3xl"
            variant="primary"
            className="mb-6"
          >
            From Concept to Launch
          </GradientText>
          
          <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
            Our proven development process ensures your project is delivered on time, 
            within budget, and exceeds your expectations.
          </p>
        </AnimatedSection>

        {/* Process Steps */}
        <StaggeredList staggerDelay={0.2} className="space-y-8 mb-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {/* Step Content */}
              <div className="flex-1">
                <Card className="border-2 border-transparent hover:border-primary-200 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${step.color} text-white mr-4 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary-600 mb-1">
                          Step {step.step}
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary-600 transition-colors">
                          {step.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-muted-600 leading-relaxed text-base">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="inline-flex items-center px-3 py-1 bg-primary-100 rounded-full text-sm text-primary-700">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.duration}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-muted-800 mb-3">Key Deliverables:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {step.deliverables.map((deliverable) => (
                          <div key={deliverable} className="flex items-start text-sm text-muted-600">
                            <CheckCircle className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                            {deliverable}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step Number Visual */}
              <div className="flex-shrink-0">
                <motion.div
                  className={`w-24 h-24 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.step}
                </motion.div>
                
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-primary-300 to-transparent mx-auto mt-6" />
                )}
              </div>
            </motion.div>
          ))}
        </StaggeredList>

        {/* Why Choose Us */}
        <AnimatedSection variant="slideUp" delay={0.8}>
          <div className="text-center mb-12">
            <GradientText
              as="h3"
              size="2xl"
              variant="primary"
              className="mb-4"
            >
              Why Choose Innertia?
            </GradientText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="p-6 rounded-xl bg-white border border-muted-200 group-hover:border-primary-300 group-hover:shadow-lg transition-all duration-300">
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <reason.icon className="w-6 h-6" />
                  </motion.div>
                  
                  <h4 className="font-semibold text-muted-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {reason.title}
                  </h4>
                  <p className="text-muted-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection variant="slideUp" delay={1.2} className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-muted-800 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-600 mb-8">
              Let's discuss your requirements and create a custom solution that drives results.
            </p>
            
            <a href="/pricing">
              <Button
                variant="default"
                size="lg"
                className="group"
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}