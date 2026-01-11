/**
 * Admin Compose Page
 * 
 * Allows the admin to create and edit tweets/posts.
 * Features:
 * - Create new posts
 * - Edit existing posts (via ?edit=<id>)
 * - Reply to posts (via ?reply_to=<id>)
 * - Draft saving
 * - Scheduled publishing
 * - Tag selection
 * - Media upload (placeholder)
 * 
 * Route: /posts/admin/compose
 * Protected: Admin only
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, isAdmin } from "@/utils/auth";
import ComposeForm from "./compose-form";

export const metadata = {
  title: "Compose Post | Admin",
  description: "Create or edit a post",
};

export default async function ComposePage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; reply_to?: string }>;
}) {
  // Check authentication and admin status
  const user = await getCurrentUser();
  const userIsAdmin = await isAdmin(user);

  // Redirect non-admins to login
  if (!user || !userIsAdmin) {
    redirect("/login");
  }

  // Get URL parameters
  const params = await searchParams;
  const editId = params.edit;
  const replyToId = params.reply_to;

  // Create Supabase client
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Type definitions for Supabase query results
  interface ExistingTweetData {
    id: string;
    content: string | null;
    media_attachments: unknown[];
    parent_tweet_id: string | null;
    is_published: boolean;
    published_at: string | null;
    tweet_tags: { tag_id: number; tags: { id: number; name: string; slug: string } }[];
  }

  interface ParentTweetData {
    id: string;
    content: string | null;
  }

  // Fetch existing tweet if editing
  let existingTweet: ExistingTweetData | null = null;
  if (editId) {
    const { data } = await supabase
      .from("tweets")
      .select(
        `
        id,
        content,
        media_attachments,
        parent_tweet_id,
        is_published,
        published_at,
        tweet_tags (
          tag_id,
          tags (
            id,
            name,
            slug
          )
        )
      `
      )
      .eq("id", editId)
      .single();

    existingTweet = data as ExistingTweetData | null;
  }

  // Fetch parent tweet if replying
  let parentTweet: ParentTweetData | null = null;
  if (replyToId) {
    const { data } = await supabase
      .from("tweets")
      .select("id, content")
      .eq("id", replyToId)
      .single();

    parentTweet = data as ParentTweetData | null;
  }

  // Fetch all tags for selection
  const { data: allTags } = await supabase
    .from("tags")
    .select("id, name, slug")
    .order("name");

  // Extract selected tag IDs from existing tweet
  const selectedTagIds =
    existingTweet?.tweet_tags?.map((tt) => tt.tag_id) || [];

  return (
    <section className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {editId ? "Edit Post" : replyToId ? "Reply to Post" : "New Post"}
        </h1>
        <Link
          href="/posts/admin"
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          Cancel
        </Link>
      </div>

      {/* Reply Context */}
      {parentTweet && (
        <div className="mb-6 p-4 border-l-2 border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 rounded-r-lg">
          <span className="text-xs uppercase tracking-wide text-neutral-500">
            Replying to:
          </span>
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3">
            {parentTweet.content}
          </p>
        </div>
      )}

      {/* Compose Form (Client Component for interactivity) */}
      <ComposeForm
        existingTweet={existingTweet}
        parentTweetId={replyToId || existingTweet?.parent_tweet_id || null}
        allTags={allTags || []}
        selectedTagIds={selectedTagIds}
      />
    </section>
  );
}
