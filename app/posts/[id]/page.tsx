/**
 * Single Post Page with Full Thread Context
 * 
 * Displays a tweet/post with:
 * - All ancestor posts (parent, grandparent, etc.) above
 * - The current post highlighted
 * - All replies (descendants) below
 * - Mastodon-style clean layout
 * 
 * Route: /posts/[id]
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser, isAdmin } from "@/utils/auth";
import type { Tag } from "@/utils/auth";
import type { Metadata } from "next";

// Types for the page
interface MediaAttachment {
  type: "image" | "video" | "link";
  url: string;
  alt?: string;
}

interface TweetData {
  id: string;
  content: string | null
  media_attachments: MediaAttachment[];
  parent_tweet_id: string | null;
  is_published: boolean;
  published_at: string | null;
  view_count: number;
  like_count: number;
  tweet_tags: { tags: { id: number; name: string; slug: string } | { id: number; name: string; slug: string }[] }[];
}

interface ReplyData {
  id: string;
  content: string | null;
  published_at: string | null;
  view_count: number;
  media_attachments: MediaAttachment[];
  tweet_tags: { tags: { id: number; name: string; slug: string } | { id: number; name: string; slug: string }[] }[];
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: tweet } = await supabase
    .from("tweets")
    .select("content")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!tweet) {
    return {
      title: "Post Not Found",
    };
  }

  // Truncate content for meta description
  const description = tweet.content
    ? tweet.content.slice(0, 160) + (tweet.content.length > 160 ? "..." : "")
    : "A post";

  return {
    title: `${description.slice(0, 60)} | Posts`,
    description,
  };
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
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Recursively fetch all ancestors of a tweet
 */
async function fetchAncestors(
  supabase: ReturnType<typeof createClient>,
  tweetId: string
): Promise<TweetData[]> {
  const ancestors: TweetData[] = [];
  let currentId: string | null = tweetId;

  while (currentId) {
    const { data: parent } = await supabase
      .from("tweets")
      .select(
        `
        id,
        content,
        media_attachments,
        parent_tweet_id,
        is_published,
        published_at,
        view_count,
        like_count,
        tweet_tags (
          tags (
            id,
            name,
            slug
          )
        )
      `
      )
      .eq("id", currentId)
      .eq("is_published", true)
      .single();

    if (!parent) break;

    // Add this parent to the ancestors array
    ancestors.push(parent as unknown as TweetData);
    
    // Move to the next parent
    currentId = parent.parent_tweet_id;
  }

  return ancestors;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const user = await getCurrentUser();
  const userIsAdmin = await isAdmin(user);

  // Fetch the main tweet
  const { data: tweet, error } = await supabase
    .from("tweets")
    .select(
      `
      id,
      content,
      media_attachments,
      parent_tweet_id,
      is_published,
      published_at,
      view_count,
      like_count,
      tweet_tags (
        tags (
          id,
          name,
          slug
          )
        )
      `
    )
    .eq("id", id)
    .single();

  if (error || !tweet) {
    notFound();
  }

  if (!tweet.is_published && !userIsAdmin) {
    notFound();
  }

  const tweetData = tweet as unknown as TweetData;

  // Increment view count (only for non-admin users)
  if (!userIsAdmin) {
    supabase.rpc("increment_view_count", { tweet_id: id }).then(() => {});
  }

  // Fetch all ancestors (parent chain)
  const ancestors = tweet.parent_tweet_id
    ? await fetchAncestors(supabase, tweet.parent_tweet_id)
    : [];

  // Fetch all replies (direct children only, can be extended for nested)
  const { data: replies } = await supabase
    .from("tweets")
    .select(
      `
      id,
      content,
      published_at,
      view_count,
      media_attachments,
      tweet_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `
    )
    .eq("parent_tweet_id", id)
    .eq("is_published", true)
    .order("published_at", { ascending: true });

  // Render a single tweet
  const renderTweet = (
    t: TweetData | ReplyData,
    isMain = false,
    isAncestor = false
  ) => {
    // Handle both single tag object and array of tags in Supabase response
    const tweetTags = "tweet_tags" in t && t.tweet_tags
      ? t.tweet_tags
          .map((tt) => (Array.isArray(tt.tags) ? tt.tags[0] : tt.tags))
          .filter(Boolean)
      : [];

    return (
      <article
        key={t.id}
        className={`border-b border-neutral-200 dark:border-neutral-800 ${
          isMain
            ? "bg-white dark:bg-neutral-900 shadow-sm"
            : isAncestor
            ? "opacity-90 hover:opacity-100"
            : "hover:bg-neutral-50 dark:hover:bg-neutral-900/30"
        } transition-all`}
      >
        <div className={`p-4 ${isAncestor ? 'ml-6 pl-4 border-l-2 border-neutral-300 dark:border-neutral-700' : ''}`}>
          {/* Header with timestamp and edit */}
          <div className="flex items-center justify-between mb-2">
            {t.published_at && (
              <Link
                href={`/posts/${t.id}`}
                className="text-neutral-500 text-sm hover:underline"
              >
                <time dateTime={t.published_at}>
                  {formatRelativeTime(t.published_at)}
                </time>
              </Link>
            )}
            {userIsAdmin && isMain && (
              <Link
                href={`/posts/admin/compose?edit=${t.id}`}
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 text-sm"
              >
                Edit
              </Link>
            )}
          </div>

          {/* Content */}
          <div className="mb-2">
            <p className="text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap leading-normal text-[15px]">
              {t.content}
            </p>
          </div>

          {/* Tags */}
          {tweetTags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {tweetTags.map((tag: Tag) => (
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

          {/* Media */}
          {t.media_attachments &&
            Array.isArray(t.media_attachments) &&
            t.media_attachments.length > 0 && (
              <div className="mb-3 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className={`grid gap-0.5 ${t.media_attachments.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {t.media_attachments.map((media: MediaAttachment, idx: number) => (
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

          {/* Stats for main tweet */}
          {isMain && (
            <div className="flex items-center gap-4 py-3 border-y border-neutral-200 dark:border-neutral-800 text-sm">
              <span className="text-neutral-500">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{t.view_count}</span> views
              </span>
              {"like_count" in t && t.like_count > 0 && (
                <span className="text-neutral-500">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{t.like_count}</span> likes
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-3">
            <Link
              href={isMain ? `/posts/admin/compose?reply_to=${t.id}` : `/posts/${t.id}`}
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-600/10 transition-colors">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section className="max-w-2xl">
      {/* Back Navigation */}
      <div className="mb-4 px-4">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Thread Container */}
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        {/* Main Tweet - the selected/focused post shown first */}
        {renderTweet(tweetData, true, false)}

        {/* Ancestors (parent chain) - shown below for context, faded and indented */}
        {ancestors.length > 0 && (
          <div className="border-t-2 border-blue-200 dark:border-blue-900/30">
            <div className="px-4 py-2 text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-900/30">
              Replies to
            </div>
            {ancestors.map((ancestor) => renderTweet(ancestor, false, true))}
          </div>
        )}

        {/* Replies - shown below */}
        {replies && replies.length > 0 && (
          <>
            <div className="border-t-2 border-green-200 dark:border-green-900/30">
              <div className="px-4 py-2 text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-900/30">
                Replies
              </div>
              {replies.map((reply: ReplyData) => renderTweet(reply, false, false))}
            </div>
          </>
        )}
      </div>

      {/* Admin: Add Reply */}
      {userIsAdmin && (
        <div className="mt-6 px-4">
          <Link
            href={`/posts/admin/compose?reply_to=${tweetData.id}`}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply
          </Link>
        </div>
      )}
    </section>
  );
}
