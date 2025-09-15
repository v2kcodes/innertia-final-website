import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WhatsAppWidget } from '@/components/ui/whatsapp-widget'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Innertia Software Solutions | AI Automation & Web Development Namibia',
  description: 'Leading AI automation and website development company in Namibia. Specializing in Faceless YouTube AI, Newsletter automation, and custom web solutions.',
  keywords: 'AI automation Namibia, website development, software solutions Africa, YouTube automation, newsletter AI',
  authors: [{ name: 'Innertia Software Solutions' }],
  creator: 'Innertia Software Solutions',
  publisher: 'Innertia Software Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://innertiass.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Innertia Software Solutions | AI Automation & Web Development',
    description: 'Transform your business with AI automation and custom web development solutions. Specializing in YouTube AI, Newsletter automation, and more.',
    url: 'https://innertiass.com',
    siteName: 'Innertia Software Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Innertia Software Solutions - AI Automation & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innertia Software Solutions | AI Automation & Web Development',
    description: 'Transform your business with AI automation and custom web development solutions.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Innertia Software Solutions',
              url: 'https://innertiass.com',
              logo: 'https://innertiass.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+264-81-755-7690',
                contactType: 'sales',
                areaServed: ['NA', 'ZA', 'BW', 'ZW'],
                availableLanguage: 'English',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'NA',
              },
              sameAs: [
                'https://www.instagram.com/innertiass?igsh=cTJqcmUwbTdteGg4',
                'https://www.facebook.com/share/17AMcUwEna/?mibextid=wwXIfr',
              ],
              service: [
                {
                  '@type': 'Service',
                  name: 'Website Development',
                  description: 'Custom website development and design services',
                },
                {
                  '@type': 'Service',
                  name: 'AI Automation Systems',
                  description: 'AI-powered automation solutions for businesses',
                },
                {
                  '@type': 'Service',
                  name: 'Faceless YouTube AI Agent',
                  description: 'Automated YouTube content creation and management',
                },
                {
                  '@type': 'Service',
                  name: 'Newsletter AI Agent',
                  description: 'Automated newsletter creation and distribution',
                },
              ],
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}