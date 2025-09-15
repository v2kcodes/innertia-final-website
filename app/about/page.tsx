"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Users,
  Target,
  Lightbulb,
  Award,
  Code,
  Bot,
  Zap,
  Globe,
  Heart,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight
} from "lucide-react"

import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, FloatingCard } from "@/components/ui/card"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList, CountUp } from "@/components/ui/animated-section"
import { CTASection } from "@/components/sections/cta-section"
import { LogoCarousel } from "@/components/ui/logo-carousel"


const timeline = [
  {
    year: "2022",
    title: "The Vision",
    description: "Founded in Namibia with a mission to democratize AI automation for African businesses",
    icon: Lightbulb,
    color: "from-primary-500 to-secondary-500"
  },
  {
    year: "2023",
    title: "First AI Solutions",
    description: "Launched our first AI automation systems, helping local businesses increase efficiency by 200%",
    icon: Bot,
    color: "from-secondary-500 to-accent-500"
  },
  {
    year: "2024",
    title: "Rapid Growth",
    description: "Expanded to serve 25+ clients across Africa, delivering custom web solutions and AI automation",
    icon: TrendingUp,
    color: "from-accent-500 to-primary-500"
  },
  {
    year: "2025",
    title: "Global Vision",
    description: "Scaling our impact with advanced AI agents and expanding to serve businesses worldwide",
    icon: Globe,
    color: "from-primary-500 to-accent-500"
  }
]

const coreValues = [
  {
    icon: Heart,
    title: "Client-First Approach",
    description: "Your success is our success. We build long-term partnerships, not just projects.",
    color: "from-primary-500 to-secondary-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation at Core",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions that future-proof your business.",
    color: "from-secondary-500 to-accent-500"
  },
  {
    icon: Shield,
    title: "Quality & Reliability",
    description: "Every solution undergoes rigorous testing. We deliver robust systems you can depend on.",
    color: "from-accent-500 to-primary-500"
  },
  {
    icon: Globe,
    title: "African Roots, Global Vision",
    description: "Proudly Namibian, serving businesses across Africa and beyond with world-class solutions.",
    color: "from-primary-500 to-accent-500"
  }
]

const technologies = [
  { name: "Next.js", category: "Web Framework", proficiency: 95 },
  { name: "AI/ML", category: "Automation", proficiency: 90 },
  { name: "TypeScript", category: "Programming", proficiency: 92 },
  { name: "Supabase", category: "Backend", proficiency: 88 },
  { name: "Python", category: "AI Development", proficiency: 85 },
  { name: "Node.js", category: "Backend", proficiency: 90 }
]

const team = [
  {
    name: "Development Team",
    role: "Full-Stack & AI Engineers",
    description: "Expert developers specializing in modern web technologies and AI automation systems",
    skills: ["Next.js", "TypeScript", "Python", "AI/ML"],
    icon: Code
  },
  {
    name: "AI Specialists",
    role: "Machine Learning Engineers", 
    description: "AI experts who design and implement custom automation solutions for your business needs",
    skills: ["Machine Learning", "Automation", "Data Analysis", "API Integration"],
    icon: Bot
  },
  {
    name: "Strategy Team",
    role: "Business & Technical Consultants",
    description: "Strategic advisors who understand both technology and business to design optimal solutions",
    skills: ["Business Strategy", "Technical Architecture", "Project Management", "Client Relations"],
    icon: Target
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-muted-900 via-muted-800 to-black text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                <Heart className="w-4 h-4 mr-2 text-accent-400" />
                <span className="text-sm font-medium">
                  Our Story & Mission
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
                  Leading AI Automation Company in Namibia
                </GradientText>
              </AnimatedSection>

              <AnimatedSection variant="slideUp" delay={0.4}>
                <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Expert AI automation and web development team based in Namibia, pioneering digital transformation solutions 
                  that help businesses across Africa achieve global competitiveness through innovative technology.
                </p>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-24 bg-gradient-to-br from-muted-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
              <Clock className="w-4 h-4 mr-2 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Our Journey
              </span>
            </div>
            
            <GradientText
              as="h2"
              size="3xl"
              variant="primary"
              className="mb-6"
            >
              Our Mission & Vision: Transforming African Business
            </GradientText>
            
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              Every great company starts with a vision. Here's how we've grown from 
              a simple idea to a leading AI automation company.
            </p>
          </AnimatedSection>

          <StaggeredList staggerDelay={0.3} className="max-w-4xl mx-auto">
            {timeline.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Content */}
                <div className="flex-1">
                  <Card className="border-2 border-transparent hover:border-primary-200 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${milestone.color} text-white mr-4 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300`}>
                          <milestone.icon className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-medium text-primary-600 mb-1">
                          {milestone.year}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary-600 transition-colors mb-3">
                        {milestone.title}
                      </CardTitle>
                      <CardDescription className="text-muted-600 leading-relaxed text-base">
                        {milestone.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Year Badge */}
                <div className="flex-shrink-0">
                  <motion.div
                    className={`w-24 h-24 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {milestone.year}
                  </motion.div>
                  
                  {/* Connector Line */}
                  {index < timeline.length - 1 && (
                    <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-primary-300 to-transparent mx-auto mt-6" />
                  )}
                </div>
              </motion.div>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-br from-white to-muted-50">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-secondary-100 to-accent-100 rounded-full">
              <Star className="w-4 h-4 mr-2 text-secondary-600" />
              <span className="text-sm font-medium text-secondary-700">
                What Drives Us
              </span>
            </div>
            
            <GradientText
              as="h2"
              size="3xl"
              variant="secondary"
              className="mb-6"
            >
              Our Core Values & Principles
            </GradientText>
            
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide every decision we make and every solution we build.
            </p>
          </AnimatedSection>

          <StaggeredList staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            {coreValues.map((value, index) => (
              <FloatingCard 
                key={value.title}
                className="group cursor-pointer h-full"
                tiltIntensity={6}
              >
                <CardHeader className="pb-4">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${value.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 w-fit`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <value.icon className="w-6 h-6" />
                  </motion.div>
                  
                  <CardTitle className="text-xl mb-3 group-hover:text-secondary-600 transition-colors">
                    {value.title}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-600 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </FloatingCard>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-gradient-to-br from-muted-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-accent-100 to-primary-100 rounded-full">
              <Code className="w-4 h-4 mr-2 text-accent-600" />
              <span className="text-sm font-medium text-accent-700">
                Our Technology
              </span>
            </div>
            
            <GradientText
              as="h2"
              size="3xl"
              variant="accent"
              className="mb-6"
            >
              Cutting-Edge Technology Stack
            </GradientText>
            
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              We use the latest technologies and frameworks to build robust, scalable solutions 
              that stand the test of time.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto mb-16">
            <StaggeredList staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <Card key={tech.name} className="border-2 border-transparent hover:border-accent-200 transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg group-hover:text-accent-600 transition-colors">
                          {tech.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-500">
                          {tech.category}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">
                          {tech.proficiency}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-muted-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-primary-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredList>
          </div>

          {/* Technology Partners */}
          <AnimatedSection variant="slideUp" delay={0.6}>
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-muted-800 mb-4">
                Powered by Industry Leaders
              </h3>
            </div>
            <LogoCarousel className="opacity-60" />
          </AnimatedSection>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-white to-muted-50">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
              <Users className="w-4 h-4 mr-2 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Our Team
              </span>
            </div>
            
            <GradientText
              as="h2"
              size="3xl"
              variant="primary"
              className="mb-6"
            >
              Expert Development Team & Proven Track Record
            </GradientText>
            
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate professionals who bring your AI automation dreams to reality.
            </p>
          </AnimatedSection>

          <StaggeredList staggerDelay={0.2} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <FloatingCard 
                key={member.name}
                className="group cursor-pointer h-full text-center"
                tiltIntensity={8}
              >
                <CardHeader className="pb-4">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300 mx-auto"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <member.icon className="w-10 h-10" />
                  </motion.div>
                  
                  <CardTitle className="text-xl mb-2 group-hover:text-primary-600 transition-colors">
                    {member.name}
                  </CardTitle>
                  
                  <CardDescription className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </CardDescription>

                  <p className="text-muted-600 leading-relaxed text-sm mb-4">
                    {member.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </FloatingCard>
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