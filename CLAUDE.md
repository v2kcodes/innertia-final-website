# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Innertia Software Solutions website - A production-ready Next.js 14 website for a Namibian AI automation and web development company. Successfully deployed to Vercel with Supabase backend integration.

**Tech Stack**: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion + Supabase + Docker + Vercel

## Essential Commands

```bash
# Development
npm run dev                    # Development server (port 3000)
npm run build                  # Production build
npm run type-check             # TypeScript validation
npm run lint                   # ESLint checking

# Database
npm run db:start               # Start local Supabase
npm run db:types               # Generate TypeScript types
npm run db:reset               # Reset database

# Deployment
vercel --prod                  # Deploy to production

# Docker (optional)
docker-compose --profile development up  # Development container
```

## Key Files

- `app/` - Next.js App Router pages (all include Footer component)
- `components/ui/` - Reusable components (Button, Card, AnimatedSection, etc.)
- `components/layout/footer.tsx` - Contains newsletter form (required on all pages)
- `lib/motion-helpers.tsx` - Type-safe Framer Motion wrappers (**critical for builds**)
- `app/api/` - Newsletter and contact form API routes

## Architecture & Critical Components

### Framer Motion TypeScript Integration
**CRITICAL**: This project uses custom motion helpers to resolve TypeScript conflicts between React and Framer Motion event handlers.

- **Location**: `lib/motion-helpers.tsx`
- **Usage**: Always use `MotionDiv`, `MotionButton`, `MotionSection`, `MotionSpan` instead of direct `motion.*` components
- **Purpose**: Eliminates `onAnimationStart`, `onDragStart` conflicts that cause build failures
- **Pattern**: `<MotionDiv>` instead of `<motion.div>`

### Supabase Integration
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Tables**: `newsletter_subscribers`, `contacts`, `service_inquiries`
- **API**: Custom Next.js API routes (`/api/newsletter`, `/api/contact`)
- **Types**: Auto-generated TypeScript types via `npm run db:types`

### Page Structure
Every page follows this pattern:
```tsx
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <>
      {/* Page content */}
      <Footer /> {/* REQUIRED - contains newsletter form */}
    </>
  )
}
```

## Development Workflow

### Before Making Changes
1. **Type Check**: `npm run type-check` (catches motion component issues)
2. **Build Test**: `npm run build` (production build validation)
3. **Newsletter Test**: Verify footer newsletter form on ALL 5 pages

### Adding Animations
ALWAYS use motion helpers, never direct motion components:
```tsx
// ❌ WRONG - Causes TypeScript build errors
<motion.div whileHover={{ scale: 1.1 }}>

// ✅ CORRECT - Uses type-safe wrapper
<MotionDiv whileHover={{ scale: 1.1 }}>
```

### Database Operations
```typescript
// API route pattern (see app/api/newsletter/route.ts)
const { data, error } = await supabase
  .from('newsletter_subscribers')
  .insert([{ email }])
  .select()
```

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

### Framer Motion TypeScript Errors
**Problem**: Build fails with event handler conflicts
**Solution**: Use motion helpers instead of direct motion components
```tsx
// Replace motion.div with MotionDiv
import { MotionDiv } from "@/lib/motion-helpers"
```

### Missing Newsletter Forms
**Problem**: Pages missing newsletter functionality
**Solution**: Ensure `<Footer />` component included on every page

### Database Connection Issues
**Problem**: Supabase connection failures
**Solution**: Verify environment variables match Supabase project settings

## 🧪 Testing Strategy

### Newsletter Testing Protocol
**CRITICAL**: Newsletter form exists in footer on ALL pages. When making changes, test across:
- `/` (Homepage)
- `/services`
- `/ai-use-cases`
- `/pricing`
- `/about`

### Production Build Testing
```bash
# Full build validation sequence
npm run type-check && npm run lint && npm run build
```

## Deployment

### Production Deployment
```bash
# Verify build first
npm run build

# Deploy to Vercel
vercel --prod
```

### Environment Variables (Vercel)
```env
NEXT_PUBLIC_SUPABASE_URL=https://ronbvogkeuiaucnozpwb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]
SUPABASE_SERVICE_ROLE_KEY=[service_key]
RESEND_API_KEY=[resend_key]
NOTIFICATION_EMAIL=innertiass@gmail.com
NEXT_PUBLIC_GA_ID=[ga_id]
NEXT_PUBLIC_SITE_URL=https://innertiass.com
```

### Pre-deployment Checklist
- [ ] Motion helpers used (no direct motion.* components)
- [ ] All pages include Footer component
- [ ] TypeScript compilation passes
- [ ] Production build succeeds
- [ ] Newsletter forms tested on all pages

## Local Development

### Development Servers
- **Next.js Dev**: `npm run dev` → http://localhost:3000
- **Docker Dev**: `docker-compose --profile development up` → http://localhost:3001
- **Supabase Local**: `npm run db:start` → http://localhost:54323

### Database Management
```bash
# Start/stop local Supabase
npm run db:start
npm run db:stop

# Generate TypeScript types
npm run db:types

# Reset database
npm run db:reset
```

## Critical Patterns

### Motion Component Usage
```tsx
// Import motion helpers
import { MotionDiv, MotionButton } from "@/lib/motion-helpers"

// Use in components
<MotionDiv
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.05 }}
>
  Content
</MotionDiv>
```

### Page Layout Pattern
```tsx
import { Footer } from "@/components/layout/footer"

export default function PageName() {
  return (
    <>
      {/* Page content */}
      <Footer /> {/* Required on all pages */}
    </>
  )
}
```

## Troubleshooting

### Build Failures
1. Check for direct `motion.*` usage → Replace with motion helpers
2. Verify Footer component on all pages
3. Run `npm run type-check` to catch TypeScript issues

### Common Errors
- `Type 'onAnimationStart'...` → Use MotionDiv instead of motion.div
- Missing newsletter form → Add Footer component
- Supabase connection issues → Check environment variables

## Repository Status
**Live Site**: https://final-qckntdb67-varens-projects-07c27581.vercel.app
**GitHub**: Connected and deployed via Vercel
**Database**: Supabase production instance connected
**Build Status**: ✅ Passing (all TypeScript conflicts resolved)