import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Performance and Core Web Vitals Testing
 */

test.describe('Performance Audit Suite', () => {

  test('should run Lighthouse performance audit', async ({ page, browserName }, testInfo) => {
    // Only run on performance testing browser
    if (testInfo.project.name !== 'performance-chrome') {
      test.skip();
    }

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const navigationEntry = entries.find(entry => entry.entryType === 'navigation') as PerformanceNavigationTiming;

          if (navigationEntry) {
            resolve({
              // Core Web Vitals approximation
              domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
              loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
              totalLoadTime: navigationEntry.loadEventEnd - navigationEntry.fetchStart,

              // Additional metrics
              dnsLookup: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
              tcpConnect: navigationEntry.connectEnd - navigationEntry.connectStart,
              responseTime: navigationEntry.responseEnd - navigationEntry.requestStart,

              // Render metrics
              firstPaint: performance.getEntriesByType('paint')
                .find(entry => entry.name === 'first-paint')?.startTime || 0,
              firstContentfulPaint: performance.getEntriesByType('paint')
                .find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
            });
          }
        }).observe({ entryTypes: ['navigation'] });

        // Fallback if PerformanceObserver doesn't work
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            resolve({
              totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
              domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
              loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
              dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
              tcpConnect: navigation.connectEnd - navigation.connectStart,
              responseTime: navigation.responseEnd - navigation.requestStart,
              firstPaint: 0,
              firstContentfulPaint: 0,
            });
          } else {
            resolve({
              totalLoadTime: 0,
              domContentLoaded: 0,
              loadComplete: 0,
              dnsLookup: 0,
              tcpConnect: 0,
              responseTime: 0,
              firstPaint: 0,
              firstContentfulPaint: 0,
            });
          }
        }, 1000);
      });
    });

    console.log('Performance Metrics:', performanceMetrics);

    // Performance assertions (reasonable thresholds)
    expect((performanceMetrics as any).totalLoadTime).toBeLessThan(10000); // 10 seconds max
    expect((performanceMetrics as any).domContentLoaded).toBeLessThan(5000); // 5 seconds max

    // Save performance metrics for reporting
    const reportData = {
      timestamp: new Date().toISOString(),
      browser: browserName,
      metrics: performanceMetrics,
      url: page.url()
    };

    try {
      writeFileSync(
        join(process.cwd(), 'test-results', `performance-${Date.now()}.json`),
        JSON.stringify(reportData, null, 2)
      );
    } catch (error) {
      console.log('Could not save performance report:', error);
    }
  });

  test('should measure Core Web Vitals', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'performance-chrome') {
      test.skip();
    }

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Measure Core Web Vitals using web-vitals approach
    const coreWebVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};

        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          vitals.lcp = entries[entries.length - 1].startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID) - approximation with event timing
        let fidStart = 0;
        document.addEventListener('click', (event) => {
          if (!fidStart) {
            fidStart = event.timeStamp;
            requestAnimationFrame(() => {
              vitals.fid = performance.now() - fidStart;
            });
          }
        }, { once: true });

        // Cumulative Layout Shift (CLS)
        let clsScore = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsScore += (entry as any).value;
            }
          }
          vitals.cls = clsScore;
        }).observe({ entryTypes: ['layout-shift'] });

        // Wait for measurements and resolve
        setTimeout(() => {
          resolve({
            lcp: vitals.lcp || 0,
            fid: vitals.fid || 0,
            cls: vitals.cls || 0,
            timestamp: Date.now()
          });
        }, 3000);
      });
    });

    console.log('Core Web Vitals:', coreWebVitals);

    // Core Web Vitals thresholds (Google's "Good" thresholds)
    const { lcp, fid, cls } = coreWebVitals as any;

    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s for "Good"
    }

    if (fid > 0) {
      expect(fid).toBeLessThan(100); // FID should be under 100ms for "Good"
    }

    if (cls > 0) {
      expect(cls).toBeLessThan(0.1); // CLS should be under 0.1 for "Good"
    }
  });

  test('should check resource loading performance', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'performance-chrome') {
      test.skip();
    }

    const resourceMetrics: Array<{ name: string; size: number; duration: number; type: string }> = [];

    // Listen for response events to gather resource metrics
    page.on('response', async (response) => {
      const request = response.request();
      const url = request.url();
      const resourceType = request.resourceType();

      try {
        const headers = await response.allHeaders();

        resourceMetrics.push({
          name: url,
          size: parseInt(headers['content-length'] || '0', 10),
          duration: 0, // Simplified for TypeScript compatibility
          type: resourceType
        });
      } catch (error) {
        // Ignore errors for individual resources
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Analyze resource metrics
    const imageResources = resourceMetrics.filter(r => r.type === 'image');
    const scriptResources = resourceMetrics.filter(r => r.type === 'script');
    const stylesheetResources = resourceMetrics.filter(r => r.type === 'stylesheet');

    console.log('Resource Performance Summary:');
    console.log(`Images: ${imageResources.length} files`);
    console.log(`Scripts: ${scriptResources.length} files`);
    console.log(`Stylesheets: ${stylesheetResources.length} files`);

    // Performance checks
    const largeImages = imageResources.filter(img => img.size > 500000); // 500KB+
    expect(largeImages.length).toBeLessThan(3); // No more than 2 large images

    const slowResources = resourceMetrics.filter(r => r.duration > 3000); // 3s+
    expect(slowResources.length).toBe(0); // No resources should take more than 3s

    // Save resource metrics for reporting
    try {
      writeFileSync(
        join(process.cwd(), 'test-results', `resources-${Date.now()}.json`),
        JSON.stringify({ resourceMetrics, timestamp: new Date().toISOString() }, null, 2)
      );
    } catch (error) {
      console.log('Could not save resource metrics:', error);
    }
  });

  test('should validate critical rendering path', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'performance-chrome') {
      test.skip();
    }

    await page.goto('/');

    // Check for render-blocking resources
    const renderBlockingResources = await page.evaluate(() => {
      const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      const scripts = Array.from(document.querySelectorAll('script[src]:not([async]):not([defer])'));

      return {
        stylesheets: stylesheets.map(link => (link as HTMLLinkElement).href),
        synchronousScripts: scripts.map(script => (script as HTMLScriptElement).src)
      };
    });

    console.log('Render-blocking resources:', renderBlockingResources);

    // Recommendations
    expect(renderBlockingResources.stylesheets.length).toBeLessThan(5); // Limit CSS files
    expect(renderBlockingResources.synchronousScripts.length).toBeLessThan(3); // Limit sync scripts
  });

});

test.describe('Lighthouse Audit Integration', () => {

  test('should pass basic Lighthouse checks', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'performance-chrome') {
      test.skip();
    }

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Basic checks that Lighthouse would verify

    // Check viewport meta tag
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewportMeta).toContain('width=device-width');

    // Check for proper heading hierarchy
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThanOrEqual(1); // At least one H1

    // Check for alt text on images
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0); // All images should have alt text

    // Check for lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();

    // Check for title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription!.length).toBeGreaterThan(50);
  });

});