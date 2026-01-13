/**
 * Admin Dashboard Page
 * 
 * Lists all tweets/posts for the admin including:
 * - Published posts
 * - Drafts
 * - Scheduled posts
 * 
 * Features:
 * - Quick status indicators
 * - Edit/delete actions
 * - Sign out button
 * - Stats overview
 * 
 * Route: /posts/admin
 * Protected: Admin only
 */

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, isAdmin } from "@/utils/auth";
import SignOutButton from "./sign-out-button";

export const metadata = {
  title: "Admin Dashboard | Posts",
  description: "Manage your posts and drafts",
};

// Type for tweet data
interface TweetData {
  id: string;
  content: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  view_count: number;
  like_count: number;
  parent_tweet_id: string | null;
}

/**
 * Format date to readable string
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get status badge for a tweet
 */
function getStatusBadge(tweet: TweetData): {
  label: string;
  className: string;
} {
  if (!tweet.is_published) {
    return {
      label: "Draft",
      className:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
    };
  }

  if (tweet.published_at) {
    const publishDate = new Date(tweet.published_at);
    if (publishDate > new Date()) {
      return {
        label: "Scheduled",
        className:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
      };
    }
  }

  return {
    label: "Published",
    className:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
  };
}

export default async function AdminPage() {
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

  // Fetch all tweets (including drafts) for this user
  const { data: tweets, error } = await supabase
    .from("tweets")
    .select(
      `
      id,
      content,
      is_published,
      published_at,
      created_at,
      view_count,
      like_count,
      parent_tweet_id
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Calculate stats
  const totalPosts = tweets?.length || 0;
  const publishedPosts =
    tweets?.filter((t) => t.is_published && new Date(t.published_at!) <= new Date())
      .length || 0;
  const draftPosts = tweets?.filter((t) => !t.is_published).length || 0;
  const scheduledPosts =
    tweets?.filter(
      (t) => t.is_published && t.published_at && new Date(t.published_at) > new Date()
    ).length || 0;
  const totalViews =
    tweets?.reduce((sum, t) => sum + (t.view_count || 0), 0) || 0;

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Logged in as {user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/posts/admin/compose"
            className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm"
          >
            New Post
          </Link>
          <SignOutButton />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <p className="text-sm text-neutral-500">Total Posts</p>
          <p className="text-2xl font-bold">{totalPosts}</p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <p className="text-sm text-neutral-500">Published</p>
          <p className="text-2xl font-bold text-green-600">{publishedPosts}</p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <p className="text-sm text-neutral-500">Drafts</p>
          <p className="text-2xl font-bold text-yellow-600">{draftPosts}</p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <p className="text-sm text-neutral-500">Total Views</p>
          <p className="text-2xl font-bold">{totalViews}</p>
        </div>
      </div>

      {/* Scheduled Posts Alert */}
      {scheduledPosts > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            📅 You have {scheduledPosts} scheduled{" "}
            {scheduledPosts === 1 ? "post" : "posts"}
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg mb-6">
          Error loading posts: {error.message}
        </div>
      )}

      {/* Empty State */}
      {!error && (!tweets || tweets.length === 0) && (
        <div className="text-center py-12 text-neutral-500">
          <p className="mb-4">No posts yet. Start writing!</p>
          <Link
            href="/posts/admin/compose"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create your first post
          </Link>
        </div>
      )}

      {/* Posts Table */}
      {tweets && tweets.length > 0 && (
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {tweets.map((tweet: TweetData) => {
                const status = getStatusBadge(tweet);
                return (
                  <tr
                    key={tweet.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                  >
                    {/* Content Preview */}
                    <td className="px-4 py-4">
                      <div className="max-w-md">
                        <p className="text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2">
                          {tweet.content || "(No content)"}
                        </p>
                        {tweet.parent_tweet_id && (
                          <span className="text-xs text-neutral-500">
                            ↳ Reply
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs rounded-full ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-sm text-neutral-500">
                      {tweet.published_at
                        ? formatDate(tweet.published_at)
                        : formatDate(tweet.created_at)}
                    </td>

                    {/* Views */}
                    <td className="px-4 py-4 text-sm text-neutral-500">
                      {tweet.view_count}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/posts/${tweet.id}`}
                          className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                          View
                        </Link>
                        <Link
                          href={`/posts/admin/compose?edit=${tweet.id}`}
                          className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-sm font-medium text-neutral-500 mb-4">
          Quick Links
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/posts"
            className="text-sm px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            View Public Feed
          </Link>
          <Link
            href="/posts/admin/tags"
            className="text-sm px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            Manage Tags
          </Link>
        </div>
      </div>
    </section>
  );
}
