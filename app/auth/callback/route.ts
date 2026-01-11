/**
 * Auth Callback Route Handler
 * 
 * This route handles the OAuth/Magic Link callback from Supabase.
 * When a user clicks the magic link in their email, they are redirected here.
 * 
 * Flow:
 * 1. User submits email on /login page
 * 2. Supabase sends magic link email
 * 3. User clicks link, redirected to /auth/callback?code=xxx
 * 4. This handler exchanges the code for a session
 * 5. User is redirected to /posts/admin (or error page on failure)
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Extract the authorization code from the URL query params
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  
  // Get the original URL the user was trying to access (if any)
  const next = requestUrl.searchParams.get("next") ?? "/posts/admin";

  if (code) {
    // Create Supabase client with cookie access
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Exchange the code for a session
    // This sets the auth cookies automatically
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Success! Redirect to the admin page or original destination
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    // Log error for debugging (visible in server logs)
    console.error("Auth callback error:", error.message);
  }

  // If no code or error, redirect to login with error message
  return NextResponse.redirect(
    new URL("/login?error=auth_callback_failed", requestUrl.origin)
  );
}
