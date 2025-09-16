'use client'

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted-50 to-muted-100">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-muted-900 mb-2">
                Something went wrong!
              </h1>
              <p className="text-muted-600 mb-6">
                We've been notified about this issue and are working to fix it.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => reset()}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              >
                Try again
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to Homepage
              </Button>

              <Button
                variant="ghost"
                onClick={() => Sentry.showReportDialog()}
                className="w-full text-sm"
              >
                Report Feedback
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-3 bg-muted-100 rounded-lg text-xs text-muted-600">
                <div className="text-left">
                  <strong>Error:</strong> {error.message}
                  {error.digest && (
                    <div className="mt-1">
                      <strong>Digest:</strong> {error.digest}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}