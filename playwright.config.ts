import { defineConfig, devices } from '@playwright/test';

/**
 * Enhanced Playwright Configuration for Comprehensive Cross-Browser Testing
 * Includes accessibility auditing, performance monitoring, and device testing
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. */
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],

  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.CI ? 'https://innertiass.com' : 'http://localhost:3002',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers and devices */
  projects: [

    // Desktop Browsers - Standard Resolutions
    {
      name: 'chromium-desktop-1920',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'chromium-desktop-1366',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 }
      },
    },
    {
      name: 'firefox-desktop-1920',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'webkit-desktop-1920',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'edge-desktop-1920',
      use: {
        ...devices['Desktop Edge'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    // Mobile Devices
    {
      name: 'mobile-chrome-pixel5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari-iphone12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'mobile-safari-iphone13',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'mobile-chrome-large-phone',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 414, height: 896 }
      },
    },

    // Tablets
    {
      name: 'tablet-chrome-portrait',
      use: {
        ...devices['iPad Pro 11'],
        viewport: { width: 768, height: 1024 }
      },
    },
    {
      name: 'tablet-chrome-landscape',
      use: {
        ...devices['iPad Pro 11 landscape'],
        viewport: { width: 1024, height: 768 }
      },
    },
    {
      name: 'tablet-safari-ipad',
      use: { ...devices['iPad Pro'] },
    },

    // Small Tablets / Large Phones
    {
      name: 'small-tablet-portrait',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 }
      },
    },

    // Accessibility Testing (Chrome with specific settings)
    {
      name: 'accessibility-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Enable accessibility features
        launchOptions: {
          args: [
            '--enable-automation',
            '--disable-extensions',
            '--force-prefers-reduced-motion',
            '--enable-features=VaapiVideoDecoder'
          ]
        }
      },
    },

    // Performance Testing
    {
      name: 'performance-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            '--enable-automation',
            '--disable-extensions',
            '--no-sandbox',
            '--disable-dev-shm-usage'
          ]
        }
      },
    },

    // Dark Mode Testing
    {
      name: 'dark-mode-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        colorScheme: 'dark'
      },
    },
    {
      name: 'dark-mode-mobile',
      use: {
        ...devices['iPhone 12'],
        colorScheme: 'dark'
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: process.env.CI ? undefined : {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000, // 2 minutes
  // },
});