import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://innertiass.com/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Disallow admin areas (if any in future)
Disallow: /admin/
Disallow: /_next/
Disallow: /api/

# Allow important pages
Allow: /
Allow: /services
Allow: /ai-use-cases
Allow: /pricing
Allow: /about
Allow: /blog
Allow: /case-studies

# Host specification for clarity
Host: https://innertiass.com`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  })
}