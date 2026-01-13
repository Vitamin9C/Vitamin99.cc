
/**
 * Supabase Browser Client Factory
 * 
 * Creates a Supabase client for use in Client Components.
 * This client handles authentication and database operations
 * on the browser side.
 * 
 * Usage:
 *   const supabase = createClient();
 *   const { data } = await supabase.from('tweets').select();
 */

import { createBrowserClient } from "@supabase/ssr";

// Environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client for browser/client-side use
 * Automatically handles cookie-based session management
 */
export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);
