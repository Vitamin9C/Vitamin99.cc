/**
 * Tags Management Page
 * 
 * Allows the admin to create, edit, and delete tags.
 * Tags are used to categorize posts for filtering.
 * 
 * Route: /posts/admin/tags
 * Protected: Admin only
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, isAdmin } from "@/utils/auth";
import TagsForm from "./tags-form";

export const metadata = {
  title: "Manage Tags | Admin",
  description: "Create and manage post tags",
};

export default async function TagsPage() {
  // Check authentication and admin status
  const user = await getCurrentUser();
  const userIsAdmin = await isAdmin(user);

  // Redirect non-admins to login
  if (!user || !userIsAdmin) {
    redirect("/login");
  }

  // Create Supabase client
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch all tags with post counts
  const { data: tags, error } = await supabase
    .from("tags")
    .select(
      `
      id,
      name,
      slug,
      tweet_tags (
        tweet_id
      )
    `
    )
    .order("name");

  // Transform data to include post count
  const tagsWithCounts =
    tags?.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      postCount: tag.tweet_tags?.length || 0,
    })) || [];

  return (
    <section className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Manage Tags</h1>
        <Link
          href="/posts/admin"
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg mb-6">
          Error loading tags: {error.message}
        </div>
      )}

      {/* Tags Form (Client Component) */}
      <TagsForm initialTags={tagsWithCounts} />
    </section>
  );
}
