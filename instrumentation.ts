import * as Sentry from "@sentry/nextjs"

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry configuration
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      environment: process.env.NODE_ENV,

      // Error filtering for server
      beforeSend(event, hint) {
        // Filter out development errors
        if (process.env.NODE_ENV === 'development') {
          console.log('Sentry Server Event:', event);
          return null; // Don't send dev errors to Sentry
        }

        return event;
      },

      // Server-specific tags
      initialScope: {
        tags: { component: "server" }
      }
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime Sentry configuration
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      environment: process.env.NODE_ENV,

      // Edge runtime specific configuration
      integrations: [],

      // Edge-specific tags
      initialScope: {
        tags: { component: "edge" }
      }
    });
  }
}