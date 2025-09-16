import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

/**
 * Cross-Browser Compatibility Tests
 * Validates website functionality across all browsers and devices
 */

test.describe('Cross-Browser Compatibility Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test.describe('Basic Page Load & Navigation', () => {

    test('should load homepage without errors', async ({ page }) => {
      // Check page title
      await expect(page).toHaveTitle(/Innertia Software Solutions/);

      // Check main heading is visible
      const mainHeading = page.getByRole('heading', { level: 1 });
      await expect(mainHeading).toBeVisible();

      // Check no console errors
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      // Allow some time for any console errors to appear
      await page.waitForTimeout(2000);

      // Filter out known favicon errors (will be fixed in deployment)
      const criticalErrors = errors.filter(error =>
        !error.includes('favicon') &&
        !error.includes('404')
      );

      expect(criticalErrors).toHaveLength(0);
    });

    test('should navigate between pages', async ({ page }) => {
      // Test Services page navigation
      await page.getByRole('link', { name: 'Services' }).first().click();
      await page.waitForURL('**/services');
      await expect(page).toHaveTitle(/Services/);

      // Test About page navigation
      await page.getByRole('link', { name: 'About' }).first().click();
      await page.waitForURL('**/about');
      await expect(page).toHaveTitle(/About/);

      // Test Pricing page navigation
      await page.getByRole('link', { name: 'Pricing' }).first().click();
      await page.waitForURL('**/pricing');
      await expect(page).toHaveTitle(/Pricing/);

      // Test AI Use Cases page navigation
      await page.getByRole('link', { name: 'AI Use Cases' }).first().click();
      await page.waitForURL('**/ai-use-cases');
      await expect(page).toHaveTitle(/AI Use Cases/);
    });

  });

  test.describe('Responsive Design & Mobile Navigation', () => {

    test('should display mobile navigation on small screens', async ({ page, isMobile }) => {
      if (isMobile) {
        // Check mobile menu button exists
        const mobileMenuButton = page.getByRole('button', { name: /menu|navigation/i });
        await expect(mobileMenuButton).toBeVisible();

        // Click to open mobile menu
        await mobileMenuButton.click();

        // Check mobile navigation menu appears
        const mobileNav = page.getByRole('navigation', { name: /mobile/i });
        await expect(mobileNav).toBeVisible();

        // Test navigation items in mobile menu
        await expect(page.getByRole('menuitem', { name: 'Home' })).toBeVisible();
        await expect(page.getByRole('menuitem', { name: 'Services' })).toBeVisible();
        await expect(page.getByRole('menuitem', { name: 'About' })).toBeVisible();
      }
    });

    test('should display desktop navigation on large screens', async ({ page, isMobile }) => {
      if (!isMobile) {
        // Check desktop navigation items are visible
        await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Services' }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
      }
    });

  });

  test.describe('Interactive Elements', () => {

    test('should handle WhatsApp contact functionality', async ({ page }) => {
      // Find WhatsApp button
      const whatsappButton = page.getByRole('button', { name: /whatsapp/i }).first();
      if (await whatsappButton.isVisible()) {
        await whatsappButton.click();

        // Check if dropdown or contact options appear
        const contactOptions = page.locator('[role="menu"], [role="menuitem"]');
        const hasContactOptions = await contactOptions.first().isVisible({ timeout: 3000 }).catch(() => false);

        if (hasContactOptions) {
          expect(await contactOptions.count()).toBeGreaterThan(0);
        }
      }
    });

    test('should handle contact forms', async ({ page }) => {
      // Look for contact forms
      const emailInputs = page.locator('input[type="email"]');
      const emailInputCount = await emailInputs.count();

      if (emailInputCount > 0) {
        const emailInput = emailInputs.first();
        await emailInput.fill('test@example.com');
        await expect(emailInput).toHaveValue('test@example.com');
      }
    });

    test('should handle theme switching', async ({ page }) => {
      // Look for theme toggle button
      const themeButton = page.getByRole('button', { name: /theme|dark|light/i });
      if (await themeButton.isVisible()) {
        await themeButton.click();

        // Check if theme changes (look for theme-related classes)
        await page.waitForTimeout(500);
        const htmlElement = page.locator('html');
        const hasThemeClass = await htmlElement.evaluate(el =>
          el.classList.contains('dark') || el.classList.contains('light')
        );
        expect(hasThemeClass).toBeTruthy();
      }
    });

  });

  test.describe('Performance & Loading', () => {

    test('should load core images', async ({ page }) => {
      // Check logo loads
      const logoImages = page.locator('img[alt*="logo" i], img[src*="logo"]');
      const logoCount = await logoImages.count();

      for (let i = 0; i < logoCount; i++) {
        const logo = logoImages.nth(i);
        if (await logo.isVisible()) {
          // Wait for image to load
          await expect(logo).toHaveAttribute('src', /.+/);
        }
      }
    });

    test('should have reasonable load times', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      // Page should load within 10 seconds
      expect(loadTime).toBeLessThan(10000);
    });

  });

  test.describe('SEO & Meta Tags', () => {

    test('should have proper meta tags', async ({ page }) => {
      // Check title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);

      // Check meta description
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);

      // Check viewport meta tag
      const viewportMeta = page.locator('meta[name="viewport"]');
      await expect(viewportMeta).toHaveAttribute('content', /width=device-width/);
    });

    test('should have proper favicon references', async ({ page }) => {
      // Check favicon link exists
      const faviconLink = page.locator('link[rel="icon"], link[rel="shortcut icon"]');
      await expect(faviconLink).toHaveAttribute('href', /.+/);

      // Check apple-touch-icon
      const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
      await expect(appleTouchIcon).toHaveAttribute('href', /.+/);
    });

  });

});

test.describe('Device-Specific Tests', () => {

  test.describe('Mobile Devices', () => {
    test.use({ ...require('@playwright/test').devices['iPhone 12'] });

    test('should handle touch interactions', async ({ page }) => {
      await page.goto('/');

      // Test touch scrolling
      await page.touchscreen.tap(200, 300);
      await page.evaluate(() => window.scrollBy(0, 500));

      // Check page scrolled
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(0);
    });

  });

  test.describe('Tablet Devices', () => {
    test.use({ ...require('@playwright/test').devices['iPad Pro'] });

    test('should adapt layout for tablet', async ({ page }) => {
      await page.goto('/');

      // Check viewport size is tablet-appropriate
      const viewportSize = page.viewportSize();
      expect(viewportSize?.width).toBeGreaterThan(600);
    });

  });

});

/**
 * Accessibility Tests (run on accessibility-chrome project)
 */
test.describe('Accessibility Testing', () => {

  test('should pass axe accessibility audit', async ({ page }, testInfo) => {
    // Only run on accessibility testing browser
    if (testInfo.project.name !== 'accessibility-chrome') {
      test.skip();
    }

    await page.goto('/');
    await injectAxe(page);

    // Run accessibility check
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true }
    });
  });

  test('should have proper keyboard navigation', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'accessibility-chrome') {
      test.skip();
    }

    await page.goto('/');

    // Test Tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

});