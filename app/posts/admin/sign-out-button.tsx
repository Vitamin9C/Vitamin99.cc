/**
 * Sign Out Button Client Component
 * 
 * Handles user sign out with loading state.
 * Uses Supabase client to clear the session.
 */

"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /**
   * Handle sign out
   */
  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      const supabase = createClient();
      await supabase.auth.signOut();

      // Redirect to home page after sign out
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-50 transition-colors"
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </button>
  );
}
