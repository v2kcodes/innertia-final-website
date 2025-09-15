"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Video,
  Mail,
  BarChart3,
  Zap,
  Globe,
  Bot,
  ArrowRight,
  ChevronRight,
  Star,
  Quote,
  CheckCircle,
  Filter,
  Sparkles
} from "lucide-react"

import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, FloatingCard } from "@/components/ui/card"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedSection, StaggeredList, CountUp } from "@/components/ui/animated-section"
import { CTASection } from "@/components/sections/cta-section"

const industries = [
  { id: "all", name: "All Industries", icon: Globe },
  { id: "ecommerce", name: "E-commerce", icon: Users },
  { id: "content", name: "Content Creation", icon: Video },
  { id: "marketing", name: "Marketing", icon: Mail },
  { id: "analytics", name: "Analytics", icon: BarChart3 }
]

const caseStudies = [
  {
    id: "youtube-automation",
    industry: "content",
    title: "Faceless YouTube Channel Automation",
    client: "Content Creator Network",
    description: "Automated YouTube content creation for a network of educational channels, generating consistent high-quality videos without human intervention.",
    challenge: "Manual video creation was taking 40+ hours per week, limiting content output and growth potential.",
    solution: "Implemented our Faceless YouTube AI Agent with automated script generation, voice synthesis, and video creation pipeline.",
    implementation: "3 weeks",
    featured: true,
    beforeStats: {
      videos: 4,
      hours: 40,
      views: 50000,
      revenue: 500
    },
    afterStats: {
      videos: 25,
      hours: 5,
      views: 500000,
      revenue: 8000
    },
    metrics: [
      { label: "Video Production", before: "4 videos/month", after: "25 videos/month", improvement: "525%" },
      { label: "Time Investment", before: "40 hours/week", after: "5 hours/week", improvement: "87%" },
      { label: "Monthly Views", before: "50K views", after: "500K views", improvement: "900%" },
      { label: "Monthly Revenue", before: "$500", after: "$8,000", improvement: "1500%" }
    ],
    testimonial: {
      quote: "This AI system transformed our entire content strategy. We went from struggling to produce 4 videos a month to easily creating 25 high-quality videos with minimal effort.",
      author: "Content Network Manager"
    },
    tags: ["YouTube Automation", "Content Creation", "AI Video", "Voice Synthesis"]
  },
  {
    id: "newsletter-automation",
    industry: "marketing", 
    title: "Newsletter Automation System",
    client: "Digital Marketing Agency",
    description: "Automated newsletter creation and distribution system that generates personalized content for 10,000+ subscribers across multiple client accounts.",
    challenge: "Managing newsletters for 50+ clients was consuming 60% of team resources with inconsistent quality and timing.",
    solution: "Deployed our Newsletter AI Agent with content generation, audience segmentation, and automated scheduling.",
    implementation: "4 weeks",
    featured: false,
    beforeStats: {
      clients: 15,
      hours: 120,
      openRate: 18,
      revenue: 15000
    },
    afterStats: {
      clients: 50,
      hours: 20,
      openRate: 42,
      revenue: 75000
    },
    metrics: [
      { label: "Client Capacity", before: "15 clients", after: "50 clients", improvement: "233%" },
      { label: "Weekly Hours", before: "120 hours/week", after: "20 hours/week", improvement: "83%" },
      { label: "Open Rate", before: "18%", after: "42%", improvement: "133%" },
      { label: "Monthly Revenue", before: "$15K", after: "$75K", improvement: "400%" }
    ],
    testimonial: {
      quote: "The AI newsletter system allowed us to scale from 15 to 50 clients without hiring additional staff. The quality and engagement rates are better than our manual work.",
      author: "Agency Owner"
    },
    tags: ["Email Marketing", "Newsletter", "Automation", "Personalization"]
  },
  {
    id: "ecommerce-automation",
    industry: "ecommerce",
    title: "E-commerce Media Department Automation", 
    client: "Online Fashion Retailer",
    description: "Complete automation of social media management, product photography, and content creation for a growing e-commerce brand.",
    challenge: "Inconsistent social media presence and high costs for product photography were limiting brand growth and engagement.",
    solution: "Implemented our Media Department AI with automated content creation, product image enhancement, and social media scheduling.",
    implementation: "6 weeks",
    featured: true,
    beforeStats: {
      posts: 12,
      engagement: 2.5,
      sales: 50000,
      costs: 8000
    },
    afterStats: {
      posts: 120,
      engagement: 12.8,
      sales: 250000,
      costs: 2000
    },
    metrics: [
      { label: "Monthly Posts", before: "12 posts", after: "120 posts", improvement: "900%" },
      { label: "Engagement Rate", before: "2.5%", after: "12.8%", improvement: "412%" },
      { label: "Monthly Sales", before: "$50K", after: "$250K", improvement: "400%" },
      { label: "Marketing Costs", before: "$8K/month", after: "$2K/month", improvement: "75%" }
    ],
    testimonial: {
      quote: "Our social media went from sporadic posts to a professional, consistent brand presence. The AI-generated content performs better than what we created manually.",
      author: "E-commerce Brand Manager"
    },
    tags: ["Social Media", "E-commerce", "Content Automation", "Brand Management"]
  },
  {
    id: "viral-content",
    industry: "content",
    title: "Viral Shorts/Reels Generation System",
    client: "Social Media Influencer",
    description: "AI-powered system for creating viral-ready short-form content optimized for TikTok, Instagram Reels, and YouTube Shorts.",
    challenge: "Creating consistent viral content was unpredictable and time-consuming, with only 10% of content achieving significant reach.",
    solution: "Deployed our Viral Shorts AI Agent with trend analysis, content optimization, and cross-platform distribution.",
    implementation: "2 weeks",
    featured: false,
    beforeStats: {
      shorts: 20,
      viralRate: 10,
      followers: 50000,
      income: 3000
    },
    afterStats: {
      shorts: 150,
      viralRate: 65,
      followers: 500000,
      income: 25000
    },
    metrics: [
      { label: "Monthly Shorts", before: "20 shorts", after: "150 shorts", improvement: "650%" },
      { label: "Viral Rate", before: "10%", after: "65%", improvement: "550%" },
      { label: "Follower Growth", before: "50K", after: "500K", improvement: "900%" },
      { label: "Monthly Income", before: "$3K", after: "$25K", improvement: "733%" }
    ],
    testimonial: {
      quote: "The AI system cracked the viral code for me. 65% of my content now goes viral compared to 10% before. My income increased 8x in just 6 months.",
      author: "Social Media Influencer"
    },
    tags: ["Viral Content", "Short-form Video", "Social Media", "Trend Analysis"]
  }
]

export default function AIUseCasesPage() {
  const [activeIndustry, setActiveIndustry] = React.useState("all")
  const [selectedCase, setSelectedCase] = React.useState<string | null>(null)

  const filteredCases = React.useMemo(() => {
    if (activeIndustry === "all") return caseStudies
    return caseStudies.filter(study => study.industry === activeIndustry)
  }, [activeIndustry])

  const featuredCases = caseStudies.filter(study => study.featured)

  return (
    <div className="min-h-screen bg-background">
        <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-muted-900 via-muted-800 to-black text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30m-20 0a20 20 0 1 1 40 0a20 20 0 1 1 -40 0'/%3E%3Cpath d='M30 10m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0'/%3E%3Cpath d='M30 50m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                <BarChart3 className="w-4 h-4 mr-2 text-accent-400" />
                <span className="text-sm font-medium">
                  Real Success Stories
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
                  AI Automation Success Stories & Real-World Applications
                </GradientText>
              </AnimatedSection>

              <AnimatedSection variant="slideUp" delay={0.4}>
                <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Discover how businesses across different industries have achieved measurable transformation 
                  with our AI automation solutions. Real success stories, quantifiable ROI, lasting impact.
                </p>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-12 bg-gradient-to-br from-muted-50 to-white border-b border-muted-200">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 mb-4 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
              <Filter className="w-4 h-4 mr-2 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Filter by Industry
              </span>
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.button
                key={industry.id}
                className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeIndustry === industry.id
                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                    : "bg-white border-2 border-muted-200 text-muted-700 hover:border-primary-300 hover:text-primary-600"
                }`}
                onClick={() => setActiveIndustry(industry.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <industry.icon className="w-4 h-4 mr-2" />
                {industry.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-gradient-to-br from-white to-muted-50">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <GradientText
              as="h2"
              size="3xl"
              variant="primary"
              className="mb-6"
            >
              Industry Case Studies & Measurable Results
            </GradientText>
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              Detailed case studies showing the real-world impact of our AI automation solutions.
            </p>
          </AnimatedSection>

          <StaggeredList staggerDelay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredCases.map((study, index) => (
              <FloatingCard 
                key={study.id}
                className="group cursor-pointer h-full relative overflow-hidden"
                tiltIntensity={6}
                onClick={() => setSelectedCase(study.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-sm text-primary-600 font-medium mb-2">
                        {study.client}
                      </div>
                      <CardTitle className="text-xl mb-3 group-hover:text-primary-600 transition-colors">
                        {study.title}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardDescription className="text-muted-600 leading-relaxed mb-6">
                    {study.description}
                  </CardDescription>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {study.metrics[0].improvement}
                      </div>
                      <div className="text-xs text-muted-600">
                        {study.metrics[0].label}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg">
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {study.metrics[1].improvement}
                      </div>
                      <div className="text-xs text-muted-600">
                        {study.metrics[1].label}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted-100 text-muted-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-accent-500 group-hover:text-white transition-all duration-300"
                  >
                    View Full Case Study
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </FloatingCard>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* All Case Studies */}
      <section className="py-24 bg-gradient-to-br from-muted-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <GradientText
              as="h2"
              size="3xl"
              variant="secondary"
              className="mb-6"
            >
              Complete Transformation Stories Collection
            </GradientText>
            <p className="text-xl text-muted-600 max-w-3xl mx-auto leading-relaxed">
              Browse through our complete collection of AI automation success stories 
              across different industries and use cases.
            </p>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StaggeredList staggerDelay={0.1} className="space-y-6 max-w-4xl mx-auto">
                {filteredCases.map((study, index) => (
                  <Card 
                    key={study.id}
                    className="border-2 border-transparent hover:border-secondary-200 transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedCase(study.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-secondary-600 font-medium mr-3">
                              {study.client}
                            </span>
                            <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                              {study.implementation} implementation
                            </span>
                          </div>
                          <CardTitle className="text-xl mb-3 group-hover:text-secondary-600 transition-colors">
                            {study.title}
                          </CardTitle>
                          <CardDescription className="text-muted-600 leading-relaxed">
                            {study.description}
                          </CardDescription>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-400 group-hover:text-secondary-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {study.metrics.slice(0, 4).map((metric, metricIndex) => (
                          <div key={metric.label} className="text-center">
                            <div className="text-lg font-bold gradient-text mb-1">
                              {metric.improvement}
                            </div>
                            <div className="text-xs text-muted-600">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Client Quote */}
                      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 p-4 rounded-lg border-l-4 border-secondary-500">
                        <div className="flex items-start">
                          <Quote className="w-4 h-4 text-secondary-500 mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-700 italic leading-relaxed mb-2">
                              {study.testimonial.quote}
                            </p>
                            <p className="text-xs text-muted-500 font-medium">
                              — {study.testimonial.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredList>
            </motion.div>
          </AnimatePresence>

          {filteredCases.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Bot className="w-16 h-16 text-muted-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-700 mb-2">
                No case studies found
              </h3>
              <p className="text-muted-600">
                Try selecting a different industry filter to see more success stories.
              </p>
            </motion.div>
          )}
        </div>
      </section>


      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}