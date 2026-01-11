
/**
 * Supabase Middleware Client Factory
 * 
 * Creates a Supabase client configured for use in Next.js middleware.
 * Handles cookie reading/writing for session management.
 * 
 * Note: This is a utility file. The actual middleware is in /middleware.ts
 */

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client for middleware use
 * Returns both the client and the response object
 */
export const createClient = (request: NextRequest) => {
  // Create an initial response that we'll modify with updated cookies
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase client with proper cookie handling
  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      // Read all cookies from the incoming request
      getAll() {
        return request.cookies.getAll();
      },
      // Write cookies to both request and response
      setAll(cookiesToSet) {
        // Set on request for downstream handlers
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        // Create new response with modified request
        supabaseResponse = NextResponse.next({
          request,
        });
        // Set on response for the browser
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Return both client and response
  return { supabase, response: supabaseResponse };
};
