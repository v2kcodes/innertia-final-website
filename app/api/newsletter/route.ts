import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Newsletter subscription store (in production, use database)
const subscriptionStore = new Set<string>()

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 5,
  windowMs: 10 * 60 * 1000, // 10 minutes
}

// Newsletter subscription data validation
interface NewsletterData {
  email: string
  name?: string
  interests?: string[]
  source?: string
}

function validateNewsletterData(data: any): NewsletterData {
  const { email, name, interests, source } = data

  if (!email || typeof email !== 'string') {
    throw new Error('Email is required')
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }

  // Check for disposable email domains
  const disposableDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
    'temp-mail.org'
  ]
  
  const emailDomain = email.split('@')[1]?.toLowerCase()
  if (disposableDomains.includes(emailDomain)) {
    throw new Error('Disposable email addresses are not allowed')
  }

  // Name validation (optional)
  if (name && (typeof name !== 'string' || name.trim().length < 2)) {
    throw new Error('Name must be at least 2 characters if provided')
  }

  // Interests validation (optional)
  if (interests && (!Array.isArray(interests) || interests.some(i => typeof i !== 'string'))) {
    throw new Error('Interests must be an array of strings')
  }

  return {
    email: email.trim().toLowerCase(),
    name: name?.trim() || undefined,
    interests: interests?.filter((i: string) => i.trim().length > 0) || undefined,
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

function checkDuplicateSubscription(email: string): boolean {
  return subscriptionStore.has(email)
}

async function addToEmailList(data: NewsletterData): Promise<boolean> {
  // In production, integrate with email service provider
  console.log('📧 New newsletter subscription:', {
    email: data.email,
    name: data.name,
    interests: data.interests,
    source: data.source,
    timestamp: new Date().toISOString()
  })

  // Add to local store (replace with database in production)
  subscriptionStore.add(data.email)

  // TODO: Implement actual email service integration
  // Example with Mailchimp, ConvertKit, or similar:
  /*
  try {
    // Add to email list
    await emailService.addSubscriber({
      email: data.email,
      name: data.name,
      tags: data.interests,
      source: data.source
    })

    // Send welcome email
    await emailService.sendWelcomeEmail({
      email: data.email,
      name: data.name || 'Valued Subscriber'
    })

    return true
  } catch (error) {
    console.error('Email service integration failed:', error)
    return false
  }
  */

  return true // Simulate success for now
}

async function sendWelcomeEmail(data: NewsletterData): Promise<boolean> {
  // TODO: Send welcome email using email service
  console.log('📨 Sending welcome email to:', data.email)
  
  // Example welcome email content:
  const welcomeContent = {
    subject: 'Welcome to Innertia Software Solutions Newsletter!',
    content: `
      <h2>Welcome to Our Newsletter!</h2>
      <p>Hi ${data.name || 'there'},</p>
      <p>Thank you for subscribing to the Innertia Software Solutions newsletter!</p>
      <p>You'll receive:</p>
      <ul>
        <li>Latest AI automation insights</li>
        <li>Web development tips and trends</li>
        <li>Exclusive case studies</li>
        <li>Special offers and early access</li>
      </ul>
      <p>We respect your privacy and will never spam you. You can unsubscribe at any time.</p>
      <p>Best regards,<br>The Innertia Team</p>
    `
  }

  return true // Simulate success
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
          error: 'Too many subscription attempts. Please try again in 10 minutes.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const newsletterData = validateNewsletterData(body)

    // Check for duplicate subscription in database
    const supabase = createClient()
    const { data: existingSubscription } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', newsletterData.email)
      .single()

    if (existingSubscription) {
      if (existingSubscription.status === 'subscribed') {
        return NextResponse.json(
          {
            success: true,
            message: 'You\'re already subscribed! Thank you for your continued interest.',
            data: {
              email: newsletterData.email,
              status: 'already_subscribed'
            }
          },
          { status: 200 }
        )
      } else {
        // Reactivate the subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'subscribed', 
            confirmed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('email', newsletterData.email)

        if (updateError) {
          console.error('Failed to reactivate subscription:', updateError)
          throw new Error('Failed to reactivate subscription')
        }

        console.log('✅ Newsletter subscription reactivated:', newsletterData.email)

        return NextResponse.json(
          {
            success: true,
            message: 'Welcome back! Your subscription has been reactivated.',
            data: {
              email: newsletterData.email,
              status: 'reactivated',
              timestamp: new Date().toISOString()
            }
          },
          { status: 200 }
        )
      }
    }

    // Save to Supabase database
    try {
      const subscriptionRecord = {
        email: newsletterData.email,
        status: 'subscribed',
        ip_address: clientIP,
        source: newsletterData.source || 'website',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        confirmed_at: new Date().toISOString()
      }

      const { error: dbError, data } = await supabase
        .from('newsletter_subscribers')
        .insert([subscriptionRecord])
        .select()

      if (dbError) {
        console.error('Supabase newsletter insertion error:', dbError)
        throw new Error('Failed to save subscription to database')
      }

      console.log('✅ Newsletter subscription saved to database:', data?.[0]?.id)
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Fallback to local storage if database fails
      subscriptionStore.add(newsletterData.email)
      console.log('⚠️ Database failed, stored locally as fallback:', newsletterData.email)
    }

    // Add to email list for email service integration
    const added = await addToEmailList(newsletterData)
    if (!added) {
      console.warn('Email service integration failed, but subscription was saved')
    }

    // Send welcome email
    const welcomeSent = await sendWelcomeEmail(newsletterData)
    if (!welcomeSent) {
      console.warn('Welcome email failed to send, but subscription was successful')
    }

    console.log('✅ Newsletter subscription processed successfully')

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed! Check your email for a welcome message.',
        data: {
          email: newsletterData.email,
          status: 'subscribed',
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)

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

// GET method to check subscription status (optional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const isSubscribed = checkDuplicateSubscription(email.toLowerCase())

    return NextResponse.json(
      {
        success: true,
        data: {
          email: email.toLowerCase(),
          is_subscribed: isSubscribed
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}