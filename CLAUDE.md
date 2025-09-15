# 🤖 Claude Code Development Guide - Innertia Software Solutions Website

This document provides comprehensive guidance for Claude Code instances working on this Next.js project.

## 🏗️ Project Overview

**Company**: Innertia Software Solutions  
**Focus**: AI Automation Systems & Website Development (Namibian company)  
**Tech Stack**: Next.js 14 + TypeScript + Supabase + Docker

## 📋 Quick Reference

### Essential Commands
```bash
# Development
npm run dev                    # Start development server (port 3000)
npm run build                  # Production build
npm run type-check             # TypeScript checking
npm run lint                   # ESLint checking

# Database (Supabase)
npm run db:start               # Start local Supabase
npm run db:stop                # Stop local Supabase
npm run db:types               # Generate TypeScript types
npm run db:reset               # Reset database

# Docker Management
.\docker-dev.bat dev-up        # Start development container (port 3001)
.\docker-dev.bat prod-up       # Start production containers (port 80)
.\docker-dev.bat status        # Check container status
.\docker-dev.bat clean         # Clean up containers

# Testing & Deployment
npm run test:e2e               # Playwright end-to-end tests
vercel                         # Deploy preview
vercel --prod                  # Deploy production
```

### Important Files & Locations
```
C:\Users\Fabrizio\final\
├── app/                       # Next.js App Router pages
│   ├── page.tsx               # Homepage
│   ├── services/page.tsx      # Services page
│   ├── ai-use-cases/page.tsx  # AI Use Cases page
│   ├── pricing/page.tsx       # Pricing page
│   ├── about/page.tsx         # About page
│   └── api/
│       ├── newsletter/route.ts # Newsletter API endpoint
│       └── contact/route.ts   # Contact form API endpoint
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── sections/              # Page sections
│   └── layout/                # Navigation & Footer
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # Production container
├── Dockerfile.dev            # Development container
└── nginx.conf                # Reverse proxy config
```

## 🎯 Key Architecture Decisions

### Database Integration
- **Supabase**: Primary database with Row Level Security (RLS)
- **Tables**: `newsletter_subscribers`, `contacts`, `service_inquiries`
- **API Routes**: `/api/newsletter` and `/api/contact` handle form submissions

### Docker Setup
- **Development**: Port 3001 with hot reload
- **Production**: Port 80 with Nginx reverse proxy
- **Monitoring**: Prometheus on port 9090 (optional)
- **Profiles**: `development`, `production`, `monitoring`

### Component Structure
- **Layout**: Navigation + Footer on all pages
- **Forms**: Newsletter form in footer, contact form on dedicated pages
- **UI**: shadcn/ui components with Tailwind CSS
- **Animations**: Framer Motion for interactions

## 🔧 Common Development Tasks

### Adding New Pages
1. Create page in `app/[page-name]/page.tsx`
2. Add navigation link in `components/layout/navigation.tsx`
3. Include Footer component: `import { Footer } from "@/components/layout/footer"`
4. Test newsletter form functionality across all pages

### Database Operations
```typescript
// Newsletter signup (app/api/newsletter/route.ts)
const { data, error } = await supabase
  .from('newsletter_subscribers')
  .insert([{ email }])
  .select()
```

### Form Validation
- Uses React Hook Form + Zod validation
- Email validation includes duplicate checking
- Success/error states with Framer Motion animations

## 🐛 Common Issues & Solutions

### Missing Footer Components
**Problem**: Pages missing newsletter functionality  
**Solution**: Always add `<Footer />` component to page layouts
```tsx
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <>
      {/* Page content */}
      <Footer />
    </>
  )
}
```

### Docker Container Issues
**Problem**: Containers won't start  
**Solution**: Check status and rebuild
```bash
.\docker-dev.bat status
.\docker-dev.bat clean
.\docker-dev.bat build
```

### Database Connection Issues
**Problem**: Supabase connection failures  
**Solution**: Verify environment variables in `.env` and `.env.local`

### Playwright Testing Issues
**Problem**: "Browser is already in use"  
**Solution**: Ensure proper browser session management in tests

## 🧪 Testing Strategy

### Comprehensive Newsletter Testing
When testing newsletter functionality, ALWAYS test across ALL pages:
1. Homepage (`/`)
2. Services (`/services`) 
3. AI Use Cases (`/ai-use-cases`)
4. Pricing (`/pricing`)
5. About (`/about`)

### Testing Checklist
```typescript
// Example Playwright test structure
for (const page of pages) {
  await browser.goto(page.url)
  await page.fill('input[type="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.locator('.success-message')).toBeVisible()
}
```

## 🚀 Deployment & Environment

### Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ronbvogkeuiaucnozpwb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]
SUPABASE_SERVICE_ROLE_KEY=[service_key]

# Email & Analytics
RESEND_API_KEY=[resend_key]
NOTIFICATION_EMAIL=innertiass@gmail.com
NEXT_PUBLIC_GA_ID=[ga_id]
NEXT_PUBLIC_SITE_URL=https://innertiass.com
```

### Production Checklist
- [ ] TypeScript compilation: `npm run type-check`
- [ ] ESLint checking: `npm run lint`
- [ ] Build validation: `npm run build`
- [ ] Newsletter testing across all pages
- [ ] Database connection verification
- [ ] Docker container functionality
- [ ] Environment variables configured

## 📊 Monitoring & Health Checks

### Application Health
- **Dev Server**: http://localhost:3000
- **Docker Dev**: http://localhost:3001
- **Production**: http://localhost:80
- **Monitoring**: http://localhost:9090 (Prometheus)

### Database Health
```sql
-- Check newsletter subscribers
SELECT COUNT(*) FROM newsletter_subscribers;

-- Recent signups
SELECT * FROM newsletter_subscribers 
ORDER BY created_at DESC LIMIT 10;
```

## 🔐 Security Considerations

### Form Security
- Input sanitization on all forms
- Rate limiting via Nginx configuration
- CSRF protection via Next.js defaults
- Email validation with duplicate prevention

### Container Security
- Non-root user execution in containers
- Alpine Linux base images
- Environment variable isolation
- Security headers in Nginx config

## 🎨 UI/UX Guidelines

### Component Standards
- Use shadcn/ui components consistently
- Maintain Tailwind CSS design system
- Implement proper loading states
- Include error handling with user feedback

### Animation Standards
- Framer Motion for form interactions
- Smooth transitions for success/error states
- Consistent timing and easing functions

## 💡 Development Tips

### Productivity Commands
```bash
# Quick development setup
npm run dev & npm run db:start

# Full Docker development
.\docker-dev.bat dev-up
.\docker-dev.bat dev-logs

# Testing workflow
npm run test:e2e
npm run type-check && npm run lint

# Production simulation
.\docker-dev.bat prod-up
```

### Code Quality
- Always run `npm run type-check` before commits
- Use `npm run lint` for code consistency
- Test newsletter functionality on ALL pages when making changes
- Verify Docker containers after infrastructure changes

## 🚨 Critical Reminders

1. **Newsletter Testing**: ALWAYS test across ALL 5 pages, not just homepage
2. **Footer Components**: Every page MUST include `<Footer />` component
3. **Environment Variables**: Keep `.env.local` separate from `.env` (Docker)
4. **Container Management**: Use provided scripts rather than raw Docker commands
5. **Database Changes**: Test with both local and production Supabase instances

---

**Last Updated**: Based on comprehensive testing and Docker containerization setup  
**Current Status**: All pages tested ✅ | Docker containers ready ✅ | Newsletter functionality verified ✅

*This guide should be updated as the project evolves. Always verify current functionality before making changes.*