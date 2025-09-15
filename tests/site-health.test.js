/**
 * Comprehensive Site Health Test Suite for Innertia Software Solutions
 * Run with: npm test
 */

const { test, expect } = require('@playwright/test');

const PAGES = [
  { name: 'Homepage', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Pricing', url: '/pricing' },
  { name: 'About', url: '/about' },
  { name: 'AI Use Cases', url: '/ai-use-cases' }
];

const VIEWPORTS = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 }
];

// Test each page on multiple viewports
PAGES.forEach(page => {
  VIEWPORTS.forEach(viewport => {
    test(`${page.name} loads correctly on ${viewport.name}`, async ({ page: browserPage }) => {
      // Set viewport
      await browserPage.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Navigate to page
      await browserPage.goto(page.url);
      
      // Check page loaded
      await expect(browserPage).toHaveTitle(/Innertia Software Solutions/);
      
      // Check no JavaScript errors
      const errors = [];
      browserPage.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Wait for page to be fully loaded
      await browserPage.waitForLoadState('networkidle');
      
      // Check critical elements are visible
      await expect(browserPage.locator('nav')).toBeVisible();
      await expect(browserPage.locator('footer')).toBeVisible();
      
      // Check no critical JavaScript errors
      expect(errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('manifest') &&
        !error.includes('DevTools')
      ).length).toBe(0);
    });
  });
});

// SEO and Accessibility Tests
test.describe('SEO and Accessibility', () => {
  test('All pages have proper meta tags', async ({ page }) => {
    for (const pageData of PAGES) {
      await page.goto(pageData.url);
      
      // Check title exists and is descriptive
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      
      // Check meta description exists
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content');
    }
  });
  
  test('All images have alt text', async ({ page }) => {
    for (const pageData of PAGES) {
      await page.goto(pageData.url);
      await page.waitForLoadState('networkidle');
      
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });
  
  test('Proper heading hierarchy', async ({ page }) => {
    for (const pageData of PAGES) {
      await page.goto(pageData.url);
      
      // Check H1 exists and is unique
      const h1s = page.locator('h1');
      const h1Count = await h1s.count();
      expect(h1Count).toBe(1);
      
      // Check H1 is descriptive
      const h1Text = await h1s.textContent();
      expect(h1Text.length).toBeGreaterThan(10);
    }
  });
});

// Performance Tests
test.describe('Performance', () => {
  test('Pages load within performance budget', async ({ page }) => {
    for (const pageData of PAGES) {
      const startTime = Date.now();
      
      await page.goto(pageData.url);
      await page.waitForLoadState('domcontentloaded');
      
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    }
  });
  
  test('Images are optimized', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      // Check Next.js image optimization
      if (src) {
        expect(src).toMatch(/\/_next\/image\?/);
      }
      
      // Check lazy loading
      const loading = await img.getAttribute('loading');
      expect(loading).toBe('lazy');
    }
  });
});

// Functional Tests
test.describe('Functionality', () => {
  test('Navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    const navLinks = [
      { text: 'Services', url: '/services' },
      { text: 'Pricing', url: '/pricing' },
      { text: 'About', url: '/about' },
      { text: 'AI Use Cases', url: '/ai-use-cases' }
    ];
    
    for (const link of navLinks) {
      await page.click(`text=${link.text}`);
      await expect(page).toHaveURL(link.url);
      await page.goBack();
    }
  });
  
  test('Contact forms are functional', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check contact form exists
    const form = page.locator('form, [role="form"]');
    if (await form.count() > 0) {
      await expect(form).toBeVisible();
      
      // Check required form fields
      const nameField = page.locator('input[placeholder*="name" i], input[name*="name" i]');
      const emailField = page.locator('input[type="email"], input[placeholder*="email" i]');
      
      if (await nameField.count() > 0) {
        await expect(nameField).toBeVisible();
      }
      if (await emailField.count() > 0) {
        await expect(emailField).toBeVisible();
      }
    }
  });
  
  test('WhatsApp contact links work', async ({ page }) => {
    await page.goto('/');
    
    // Check WhatsApp links
    const whatsappLinks = page.locator('a[href*="wa.me"], button:has-text("WhatsApp")');
    const linkCount = await whatsappLinks.count();
    
    if (linkCount > 0) {
      for (let i = 0; i < linkCount; i++) {
        await expect(whatsappLinks.nth(i)).toBeVisible();
      }
    }
  });
});

// Mobile-Specific Tests
test.describe('Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
  });
  
  test('Mobile navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Check if mobile menu exists and works
    const menuButton = page.locator('button:has([class*="hamburger"]), button:has(svg)').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // Check navigation items are visible
      await expect(page.locator('nav a, [role="navigation"] a')).toBeVisible();
    }
  });
  
  test('Content is readable on mobile', async ({ page }) => {
    for (const pageData of PAGES) {
      await page.goto(pageData.url);
      
      // Check text is not too small
      const bodyText = page.locator('body');
      const fontSize = await bodyText.evaluate(el => {
        return parseInt(window.getComputedStyle(el).fontSize);
      });
      
      expect(fontSize).toBeGreaterThanOrEqual(14); // Minimum readable font size
    }
  });
});