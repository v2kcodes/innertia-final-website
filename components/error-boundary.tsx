"use client"

import * as React from "react"
import * as Sentry from "@sentry/nextjs"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryState {
  hasError: boolean
  eventId?: string
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    })

    this.setState({ eventId })

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback

      if (Fallback) {
        return (
          <Fallback
            error={new Error('An error occurred')}
            reset={() => this.setState({ hasError: false, eventId: undefined })}
          />
        )
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted-50 to-muted-100">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-muted-900 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-600 mb-6">
                We've been notified about this issue and are working to fix it.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Reload Page
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to Homepage
              </Button>

              {this.state.eventId && (
                <Button
                  variant="ghost"
                  onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId! })}
                  className="w-full text-sm"
                >
                  Report Feedback
                </Button>
              )}
            </div>

            {process.env.NODE_ENV === 'development' && this.state.eventId && (
              <div className="mt-4 p-3 bg-muted-100 rounded-lg text-xs text-muted-600">
                Event ID: {this.state.eventId}
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}