import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 3,
  windowMs: 15 * 60 * 1000, // 15 minutes
}

// Contact form data validation
interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  source?: string
}

interface SupabaseContactData {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service_interest?: string | null
  message: string
  ip_address?: string
  source: string
  status: 'new'
}

function validateContactForm(data: any): ContactFormData {
  const { name, email, phone, company, service, message, source } = data

  // Required field validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Name is required and must be at least 2 characters')
  }

  if (!email || typeof email !== 'string') {
    throw new Error('Email is required')
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    throw new Error('Message is required and must be at least 10 characters')
  }

  // Phone validation (optional)
  if (phone && typeof phone === 'string' && phone.trim().length > 0) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/
    if (!phoneRegex.test(phone)) {
      throw new Error('Invalid phone number format')
    }
  }

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || undefined,
    company: company?.trim() || undefined,
    service: service?.trim() || undefined,
    message: message.trim(),
    source: source?.trim() || 'website'
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const clientData = rateLimitStore.get(ip)

  if (!clientData || now > clientData.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    })
    return true
  }

  if (clientData.count >= RATE_LIMIT.maxAttempts) {
    return false
  }

  // Increment counter
  rateLimitStore.set(ip, {
    count: clientData.count + 1,
    resetTime: clientData.resetTime
  })
  return true
}

// Simple spam detection
function detectSpam(data: ContactFormData): string[] {
  const warnings: string[] = []
  
  // Check for common spam patterns
  const spamKeywords = ['seo', 'ranking', 'guaranteed', 'cheapest', 'bitcoin', 'crypto', 'loan', 'mortgage']
  const messageText = data.message.toLowerCase()
  
  const spamCount = spamKeywords.filter(keyword => messageText.includes(keyword)).length
  if (spamCount >= 3) {
    warnings.push('High spam keyword count')
  }

  // Check for excessive links
  const linkCount = (data.message.match(/https?:\/\/[^\s]+/g) || []).length
  if (linkCount > 2) {
    warnings.push('Excessive links detected')
  }

  // Check for repeated characters
  if (/(.)\1{10,}/.test(data.message)) {
    warnings.push('Repeated characters detected')
  }

  return warnings
}

async function sendNotificationEmail(data: ContactFormData): Promise<boolean> {
  // In production, integrate with email service (SendGrid, Resend, etc.)
  console.log('📧 New contact form submission:', {
    name: data.name,
    email: data.email,
    company: data.company,
    service: data.service,
    timestamp: new Date().toISOString()
  })

  // TODO: Implement actual email sending
  // Example with Resend:
  /*
  try {
    await resend.emails.send({
      from: 'noreply@innertiass.com',
      to: 'innertiass@gmail.com',
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${data.service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${data.message}</blockquote>
        <p><strong>Source:</strong> ${data.source}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `
    })
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
  */

  return true // Simulate success for now
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIP = headersList.get('x-real-ip')
    const clientIP = forwardedFor?.split(',')[0] || realIP || 'unknown'

    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again in 15 minutes.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const contactData = validateContactForm(body)

    // Spam detection
    const spamWarnings = detectSpam(contactData)
    if (spamWarnings.length > 0) {
      console.warn('🚨 Potential spam detected:', {
        ip: clientIP,
        warnings: spamWarnings,
        data: contactData
      })
      
      // Still process but flag for manual review
    }

    // Send notification email
    const emailSent = await sendNotificationEmail(contactData)
    if (!emailSent) {
      console.error('Failed to send notification email')
      // Continue processing even if email fails
    }

    // Store in Supabase database
    try {
      const supabase = createClient()
      
      const contactRecord: SupabaseContactData = {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        company: contactData.company || null,
        service_interest: contactData.service || null,
        message: contactData.message,
        ip_address: clientIP,
        source: contactData.source || 'website',
        status: 'new'
      }

      const { error: dbError, data } = await supabase
        .from('contact_submissions')
        .insert([contactRecord])
        .select()

      if (dbError) {
        console.error('Supabase insertion error:', dbError)
        throw new Error('Failed to save contact information')
      }

      console.log('✅ Contact saved to database:', data?.[0]?.id)
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Continue processing even if database fails (but log the error)
      // In production, you might want to retry or use a backup storage method
    }

    console.log('✅ Contact form submission processed successfully')

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        data: {
          name: contactData.name,
          email: contactData.email,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: error.message,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}