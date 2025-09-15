import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the pricing page where the contact form is located
    await page.goto('/pricing')
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    
    // Scroll to the contact form section
    await page.locator('text=Get Your Custom Quote Today').scrollIntoViewIfNeeded()
  })

  test('should display contact form with all fields', async ({ page }) => {
    // Check that all form fields are present
    await expect(page.locator('input[id="name"]')).toBeVisible()
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('input[id="phone"]')).toBeVisible()
    await expect(page.locator('input[id="company"]')).toBeVisible()
    await expect(page.locator('select[id="service"]')).toBeVisible()
    await expect(page.locator('textarea[id="message"]')).toBeVisible()
    
    // Check submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toContainText('Send Message')
  })

  test('should show validation errors for required fields', async ({ page }) => {
    // Click submit without filling required fields
    await page.locator('button[type="submit"]').click()
    
    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible()
    await expect(page.locator('text=Email is required')).toBeVisible()
    await expect(page.locator('text=Message is required')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    // Fill name and message but invalid email
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('invalid-email')
    await page.locator('textarea[id="message"]').fill('This is a test message for validation')
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for email validation error
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible()
  })

  test('should validate message length', async ({ page }) => {
    // Fill required fields with short message
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('textarea[id="message"]').fill('Short')
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for message length validation error
    await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible()
  })

  test('should successfully submit valid form data', async ({ page }) => {
    // Fill all required fields with valid data
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('input[id="phone"]').fill('+264 81 123 4567')
    await page.locator('input[id="company"]').fill('Test Company')
    await page.locator('select[id="service"]').selectOption('Website Development')
    await page.locator('textarea[id="message"]').fill('I need a custom website for my business. Please provide a detailed quote with timeline and pricing information.')
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Wait for submission to complete
    await expect(page.locator('button[type="submit"]')).toContainText('Sending Message...')
    
    // Check for success message
    await expect(page.locator('text=Message Sent Successfully!')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('text=Thank you! We\'ll get back to you')).toBeVisible()
    
    // Check that success state is displayed
    await expect(page.locator('button:has-text("Send Another Message")')).toBeVisible()
  })

  test('should handle form submission errors gracefully', async ({ page }) => {
    // Mock API to return error response
    await page.route('/api/contact', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal server error',
          code: 'INTERNAL_ERROR'
        })
      })
    })
    
    // Fill and submit form
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('textarea[id="message"]').fill('This is a test message')
    
    await page.locator('button[type="submit"]').click()
    
    // Check for error message
    await expect(page.locator('text=Internal server error')).toBeVisible({ timeout: 5000 })
  })

  test('should handle rate limiting', async ({ page }) => {
    // Mock API to return rate limit error
    await page.route('/api/contact', (route) => {
      route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Too many requests. Please try again in 15 minutes.',
          code: 'RATE_LIMIT_EXCEEDED'
        })
      })
    })
    
    // Fill and submit form
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('textarea[id="message"]').fill('This is a test message')
    
    await page.locator('button[type="submit"]').click()
    
    // Check for rate limit message
    await expect(page.locator('text=Too many requests')).toBeVisible({ timeout: 5000 })
  })

  test('should clear validation errors when user starts typing', async ({ page }) => {
    // Submit empty form to show validation errors
    await page.locator('button[type="submit"]').click()
    
    // Verify errors are shown
    await expect(page.locator('text=Name is required')).toBeVisible()
    await expect(page.locator('text=Email is required')).toBeVisible()
    
    // Start typing in name field
    await page.locator('input[id="name"]').fill('J')
    
    // Name error should disappear
    await expect(page.locator('text=Name is required')).not.toBeVisible()
    
    // Email error should still be there
    await expect(page.locator('text=Email is required')).toBeVisible()
    
    // Start typing in email field
    await page.locator('input[id="email"]').fill('j@')
    
    // Email required error should disappear
    await expect(page.locator('text=Email is required')).not.toBeVisible()
  })

  test('should show character count for message field', async ({ page }) => {
    const messageField = page.locator('textarea[id="message"]')
    
    // Type some text
    await messageField.fill('Hello world')
    
    // Should show character count
    await expect(page.locator('text=11/1000')).toBeVisible()
    
    // Type more text to test warning color
    const longText = 'x'.repeat(950)
    await messageField.fill(longText)
    
    // Should show warning color when near limit
    await expect(page.locator('text=950/1000')).toBeVisible()
  })

  test('should reset form after successful submission', async ({ page }) => {
    // Fill and submit form successfully
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('textarea[id="message"]').fill('This is a test message for reset functionality')
    
    await page.locator('button[type="submit"]').click()
    
    // Wait for success message
    await expect(page.locator('text=Message Sent Successfully!')).toBeVisible({ timeout: 10000 })
    
    // Wait for form to reset (should happen after 3 seconds)
    await page.waitForTimeout(3500)
    
    // Verify form fields are cleared
    await expect(page.locator('input[id="name"]')).toHaveValue('')
    await expect(page.locator('input[id="email"]')).toHaveValue('')
    await expect(page.locator('textarea[id="message"]')).toHaveValue('')
    
    // Verify form is back to initial state
    await expect(page.locator('button[type="submit"]')).toContainText('Send Message')
  })

  test('should validate phone number format when provided', async ({ page }) => {
    // Fill form with invalid phone number
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('input[id="phone"]').fill('invalid-phone')
    await page.locator('textarea[id="message"]').fill('This is a test message')
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for phone validation error
    await expect(page.locator('text=Please enter a valid phone number')).toBeVisible()
  })

  test('should allow optional fields to be empty', async ({ page }) => {
    // Fill only required fields
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('textarea[id="message"]').fill('This is a test message without optional fields')
    
    // Leave phone, company, and service empty
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Should succeed without validation errors for optional fields
    await expect(page.locator('text=Message Sent Successfully!')).toBeVisible({ timeout: 10000 })
  })
})