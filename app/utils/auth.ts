/**
 * Authentication Utility Functions
 * 
 * Provides helper functions for common auth operations:
 * - getCurrentUser: Get the authenticated user
 * - isAdmin: Check if user is the admin
 * - signOut: Log out the current user
 * 
 * IMPORTANT: Update ADMIN_EMAIL to your actual email address
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * User type from Supabase Auth
 * Simplified version of the full User type
 */
export interface User {
  id: string;
  email?: string;
  app_metadata: Record<string, unknown>;
  user_metadata: Record<string, unknown>;
  aud: string;
  created_at: string;
}

/**
 * The admin email address that is allowed to create/edit posts
 * TODO: Move this to environment variable for better security
 */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "your-email@example.com";

/**
 * Get the currently authenticated user
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // "Auth session missing" is not an error - it just means no user is logged in
  if (error && error.message !== "Auth session missing") {
    console.error("Error getting user:", error.message);
  }

  return user;
}

/**
 * Check if the given user (or current user) is the admin
 * Only the admin can create/edit/delete posts
 */
export async function isAdmin(user?: User | null): Promise<boolean> {
  // If no user provided, get the current user
  const currentUser = user ?? (await getCurrentUser());

  if (!currentUser?.email) {
    return false;
  }

  return currentUser.email === ADMIN_EMAIL;
}

/**
 * Sign out the current user
 * Clears the session and cookies
 */
export async function signOut(): Promise<{ error: Error | null }> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    return { error };
  }

  return { error: null };
}

/**
 * Type definitions for Tweet data
 */
export interface Tweet {
  id: string;
  user_id: string;
  content: string | null;
  media_attachments: MediaAttachment[];
  parent_tweet_id: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
  metadata: Record<string, unknown>;
}

export interface MediaAttachment {
  type: "image" | "video" | "link";
  url: string;
  alt?: string;
  thumbnail?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface TweetWithTags extends Tweet {
  tags: Tag[];
  replies?: TweetWithTags[];
}
