
/**
 * Supabase Server Client Factory
 * 
 * Creates a Supabase client for use in Server Components, 
 * Server Actions, and Route Handlers.
 * 
 * This client uses cookies for session management and works
 * seamlessly with the middleware for session refresh.
 * 
 * Usage:
 *   const cookieStore = await cookies();
 *   const supabase = createClient(cookieStore);
 *   const { data } = await supabase.from('tweets').select();
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client for server-side use
 * @param cookieStore - The cookie store from next/headers
 * @returns Supabase client configured for server use
 */
export const createClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>>
) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      // Read all cookies from the store
      getAll() {
        return cookieStore.getAll();
      },
      // Attempt to set cookies (may fail in Server Components)
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
