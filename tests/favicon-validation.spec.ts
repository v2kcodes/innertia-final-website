import { test, expect } from '@playwright/test';

/**
 * Favicon Validation Tests
 * Validates favicon implementation and browser tab display
 */

test.describe('Favicon Implementation Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to main production website to test favicon
    await page.goto('https://innertiass.com');
    await page.waitForLoadState('networkidle');
  });

  test('should have all required favicon files accessible', async ({ page }) => {
    // Test all favicon file URLs for HTTP 200 responses
    const faviconUrls = [
      '/favicon.ico',
      '/favicon-16x16.png',
      '/favicon-32x32.png',
      '/apple-touch-icon.png',
      '/android-chrome-192x192.png',
      '/android-chrome-512x512.png'
    ];

    for (const url of faviconUrls) {
      const response = await page.goto(page.url().replace(new URL(page.url()).pathname, url));
      expect(response?.status()).toBe(200);
      console.log(`✅ ${url}: ${response?.status()}`);
    }
  });

  test('should have proper favicon HTML head tags', async ({ page }) => {
    // Check favicon link tags in HTML head
    const faviconLink = page.locator('link[rel="icon"][href="/favicon.ico"]');
    await expect(faviconLink).toHaveCount(1);

    const favicon32 = page.locator('link[rel="icon"][type="image/png"][sizes="32x32"]');
    await expect(favicon32).toHaveAttribute('href', '/favicon-32x32.png');

    const favicon16 = page.locator('link[rel="icon"][type="image/png"][sizes="16x16"]');
    await expect(favicon16).toHaveAttribute('href', '/favicon-16x16.png');

    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleTouchIcon).toHaveAttribute('href', '/apple-touch-icon.png');
    await expect(appleTouchIcon).toHaveAttribute('sizes', '180x180');

    console.log('✅ All favicon HTML head tags are properly configured');
  });

  test('should have manifest.json properly referenced', async ({ page }) => {
    // Check manifest link
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', '/site.webmanifest');

    // Test manifest file accessibility
    const manifestResponse = await page.goto(page.url().replace(new URL(page.url()).pathname, '/site.webmanifest'));
    expect(manifestResponse?.status()).toBe(200);

    console.log('✅ Manifest.json properly referenced and accessible');
  });

  test('should have proper theme color meta tag', async ({ page }) => {
    // Check theme color matches brand color
    const themeColorMeta = page.locator('meta[name="theme-color"]');
    await expect(themeColorMeta).toHaveAttribute('content', '#FF6B35');

    console.log('✅ Theme color properly set to brand color #FF6B35');
  });

  test('should display favicon in browser tab', async ({ page }) => {
    // Check page title exists (favicon should be visible next to it)
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('Innertia Software Solutions');

    // Verify favicon is loaded by checking for no 404 errors
    let faviconErrors = 0;
    page.on('response', (response) => {
      if (response.url().includes('favicon') && response.status() === 404) {
        faviconErrors++;
        console.log(`❌ Favicon 404 error: ${response.url()}`);
      }
    });

    // Wait for any favicon requests to complete
    await page.waitForTimeout(3000);

    expect(faviconErrors).toBe(0);
    console.log('✅ No favicon 404 errors detected - favicon should be visible in browser tab');
  });

});

test.describe('Cross-Browser Favicon Tests', () => {

  ['chromium', 'firefox', 'webkit'].forEach(browserName => {
    test(`should load favicon correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      test.skip(currentBrowser !== browserName, `Skipping ${browserName} test`);

      await page.goto('https://innertiass.com');
      await page.waitForLoadState('networkidle');

      // Check favicon links exist
      const faviconLinks = await page.locator('link[rel*="icon"]').count();
      expect(faviconLinks).toBeGreaterThan(0);

      // Test favicon file accessibility
      const faviconResponse = await page.goto('https://innertiass.com/favicon.ico');
      expect(faviconResponse?.status()).toBe(200);

      console.log(`✅ Favicon working correctly in ${browserName}`);
    });
  });

});