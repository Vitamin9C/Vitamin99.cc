/**
 * Login Page Component
 * 
 * Provides magic link authentication for the admin user.
 * Only the designated admin email can access posting features.
 * All other visitors can browse posts without logging in.
 * 
 * Features:
 * - Email input for magic link request
 * - Loading state during submission
 * - Success/error message display
 * - Redirect if already authenticated
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export const metadata = {
  title: "Login | Microblog",
  description: "Sign in with magic link to access admin features",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  // Check if user is already logged in
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If already authenticated, redirect to admin
  if (user) {
    redirect("/posts/admin");
  }

  // Get any error/success messages from URL params
  const params = await searchParams;
  const error = params.error;
  const message = params.message;

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Enter your email to receive a magic link
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
            {error === "auth_callback_failed"
              ? "Authentication failed. Please try again."
              : error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="p-4 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
            {message}
          </div>
        )}

        {/* Login Form (Client Component for interactivity) */}
        <LoginForm />

        {/* Info Text */}
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-500">
          Only authorized administrators can post content.
          <br />
          All visitors can browse posts without logging in.
        </p>
      </div>
    </section>
  );
}
