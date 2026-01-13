
/**
 * Posts Listing Page (Microblog Feed)
 * 
 * Displays all published tweets/posts in reverse chronological order.
 * Features:
 * - Public viewing (no auth required)
 * - Tag filtering via URL params
 * - Threading support (shows top-level posts with reply counts)
 * - View count tracking
 * - Admin quick-access link when authenticated
 * 
 * URL Parameters:
 * - ?tag=slug - Filter posts by tag slug
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { getCurrentUser, isAdmin } from "@/utils/auth";
import type { Tag } from "@/utils/auth";

// Metadata for SEO
export const metadata = {
  title: "Posts | Microblog",
  description: "Thoughts, ideas, and updates",
};

/**
 * Format a date string to a human-readable format
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

// Type for tweet data from Supabase query
interface TweetQueryResult {
  id: string;
  content: string | null;
  media_attachments: { type: string; url: string; alt?: string }[];
  parent_tweet_id: string | null;
  published_at: string | null;
  view_count: number;
  like_count: number;
  tweet_tags: { tags: { id: number; name: string; slug: string } }[];
  parent?: { id: string; content: string | null } | null;
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  // Get cookie store and create Supabase client
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Check if current user is admin (for showing admin link)
  const user = await getCurrentUser();
  const userIsAdmin = await isAdmin(user);

  // Get tag filter from URL params
  const params = await searchParams;
  const tagFilter = params.tag;

  // Build the query for published tweets (including replies)
  let query = supabase
    .from("tweets")
    .select(
      `
      id,
      content,
      media_attachments,
      parent_tweet_id,
      published_at,
      view_count,
      like_count,
      tweet_tags (
        tags (
          id,
          name,
          slug
        )
      ),
      parent:tweets!parent_tweet_id (
        id,
        content
      )
    `
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  // Apply tag filter if provided
  if (tagFilter) {
    // First get the tag ID
    const { data: tagData } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", tagFilter)
      .single();

    if (tagData) {
      // Get tweet IDs that have this tag
      const { data: tweetTagsData } = await supabase
        .from("tweet_tags")
        .select("tweet_id")
        .eq("tag_id", tagData.id);

      const tweetIds = tweetTagsData?.map((tt) => tt.tweet_id) || [];

      if (tweetIds.length > 0) {
        query = query.in("id", tweetIds);
      } else {
        // No tweets with this tag
        query = query.eq("id", "00000000-0000-0000-0000-000000000000");
      }
    }
  }

  // Execute query
  const { data: tweets, error } = await query;

  // Get all tags for the filter sidebar
  const { data: allTags } = await supabase
    .from("tags")
    .select("*")
    .order("name");

  // Get reply counts for each tweet
  const tweetIds = tweets?.map((t) => t.id) || [];
  const { data: replyCounts } = await supabase
    .from("tweets")
    .select("parent_tweet_id")
    .in("parent_tweet_id", tweetIds)
    .eq("is_published", true);

  // Create a map of tweet ID to reply count
  const replyCountMap: Record<string, number> = {};
  replyCounts?.forEach((reply) => {
    if (reply.parent_tweet_id) {
      replyCountMap[reply.parent_tweet_id] =
        (replyCountMap[reply.parent_tweet_id] || 0) + 1;
    }
  });

  return (
    <section>
      {/* Header with Admin Link */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
        {userIsAdmin && (
          <Link
            href="/posts/admin"
            className="text-sm px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            Admin
          </Link>
        )}
      </div>

      {/* Tag Filter Pills */}
      {allTags && allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/posts"
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              !tagFilter
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            All
          </Link>
          {allTags.map((tag: Tag) => (
            <Link
              key={tag.id}
              href={`/posts?tag=${tag.slug}`}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                tagFilter === tag.slug
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
          Error loading posts: {error.message}
        </div>
      )}

      {/* Empty State */}
      {!error && (!tweets || tweets.length === 0) && (
        <div className="text-center py-12 text-neutral-500">
          <p>No posts yet.</p>
          {userIsAdmin && (
            <Link
              href="/posts/admin/compose"
              className="inline-block mt-4 text-sm underline hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              Write your first post →
            </Link>
          )}
        </div>
      )}

      {/* Posts Feed - Mastodon Style */}
      <div className="space-y-0 border-t border-neutral-200 dark:border-neutral-800">
        {(tweets as TweetQueryResult[] | null)?.map((tweet) => {
          // Extract tags from the nested structure
          const tags = tweet.tweet_tags?.map((tt) => tt.tags).filter(Boolean) || [];
          const replyCount = replyCountMap[tweet.id] || 0;

          return (
            <article
              key={tweet.id}
              className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors"
            >
              <div className="p-4">
                {/* Header with timestamp */}
                <div className="flex items-center justify-between mb-2">
                  {tweet.published_at && (
                    <Link
                      href={`/posts/${tweet.id}`}
                      className="text-neutral-500 text-sm hover:underline"
                    >
                      <time dateTime={tweet.published_at}>
                        {formatRelativeTime(tweet.published_at)}
                      </time>
                    </Link>
                  )}
                </div>

                {/* Reply indicator - only show for actual replies */}
                {tweet.parent_tweet_id && tweet.parent && (
                  <Link
                    href={`/posts/${tweet.parent.id}`}
                    className="mb-2 flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Replying to previous post
                  </Link>
                )}

                {/* Content */}
                <Link href={`/posts/${tweet.id}`} className="block">
                  <p className="text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap leading-normal text-[15px]">
                    {tweet.content}
                  </p>
                </Link>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tags.map((tag: Tag) => (
                      <Link
                        key={tag.id}
                        href={`/posts?tag=${tag.slug}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Media Attachments Preview */}
                {tweet.media_attachments &&
                  Array.isArray(tweet.media_attachments) &&
                  tweet.media_attachments.length > 0 && (
                    <div className="mt-3 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                      <div className={`grid gap-0.5 ${tweet.media_attachments.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {tweet.media_attachments
                          .slice(0, 4)
                          .map((media: { type: string; url: string; alt?: string }, idx: number) => (
                            <div
                              key={idx}
                              className="aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden"
                            >
                              {media.type === "image" && (
                                <img
                                  src={media.url}
                                  alt={media.alt || ""}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              {media.type === "video" && (
                                <video
                                  src={media.url}
                                  controls
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                {/* Action Buttons */}
                <div className="mt-3">
                  <Link
                    href={`/posts/${tweet.id}`}
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    <div className="p-2 rounded-full group-hover:bg-blue-600/10 transition-colors">
                      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </div>
                    {replyCount > 0 && <span className="text-sm">{replyCount}</span>}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
