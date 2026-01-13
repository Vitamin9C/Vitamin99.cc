/**
 * Next.js Middleware for Supabase Authentication
 * 
 * This middleware runs on every request to:
 * 1. Refresh the user's session if it exists
 * 2. Pass the session to Server Components via cookies
 * 
 * IMPORTANT: This file must be in the root directory (not in /app)
 */

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request: NextRequest) {
  // Create an initial response that we'll modify with updated cookies
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Create Supabase client with cookie handling for SSR
  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      // Read all cookies from the incoming request
      getAll() {
        return request.cookies.getAll();
      },
      // Write cookies to both the request and response
      // This ensures the session is available to Server Components
      setAll(cookiesToSet) {
        // First, set cookies on the request (for downstream handlers)
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        // Create a new response with the modified request
        supabaseResponse = NextResponse.next({
          request,
        });
        // Then set cookies on the response (for the browser)
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Do not add any logic between createServerClient and getUser()
  // A simple getUser() call is enough to refresh the session if needed
  // See: https://supabase.com/docs/guides/auth/server-side/nextjs
  await supabase.auth.getUser();

  return supabaseResponse;
}

// Configure which routes this middleware should run on
// Exclude static files and API routes that don't need auth
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
