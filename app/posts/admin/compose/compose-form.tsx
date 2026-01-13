/**
 * Compose Form Client Component
 * 
 * Interactive form for creating/editing tweets with:
 * - Content textarea with character count
 * - Tag selection (multi-select)
 * - Publish/Draft toggle
 * - Scheduled publishing
 * - Media upload (placeholder)
 * - Delete functionality
 * 
 * Uses Supabase client for database operations
 */

"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Type definitions
interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface ExistingTweet {
  id: string;
  content: string | null;
  media_attachments: unknown[];
  parent_tweet_id: string | null;
  is_published: boolean;
  published_at: string | null;
}

interface ComposeFormProps {
  existingTweet: ExistingTweet | null;
  parentTweetId: string | null;
  allTags: Tag[];
  selectedTagIds: number[];
}

/**
 * Maximum character limit for posts (like Twitter)
 */
const MAX_CONTENT_LENGTH = 500;

export default function ComposeForm({
  existingTweet,
  parentTweetId,
  allTags,
  selectedTagIds: initialSelectedTagIds,
}: ComposeFormProps) {
  // Form state
  const [content, setContent] = useState(existingTweet?.content || "");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    initialSelectedTagIds
  );
  const [isPublished, setIsPublished] = useState(
    existingTweet?.is_published || false
  );
  const [scheduledDate, setScheduledDate] = useState<string>("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const router = useRouter();
  const isEditing = !!existingTweet;

  // Initialize scheduled date from existing tweet
  useEffect(() => {
    if (existingTweet?.published_at) {
      // Convert to local datetime-local format
      const date = new Date(existingTweet.published_at);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      setScheduledDate(localDate.toISOString().slice(0, 16));
    }
  }, [existingTweet]);

  /**
   * Handle tag selection toggle
   */
  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  /**
   * Handle form submission (create or update)
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Not authenticated");
      }

      // Prepare tweet data
      const publishedAt = isPublished
        ? scheduledDate
          ? new Date(scheduledDate).toISOString()
          : new Date().toISOString()
        : null;

      const tweetData = {
        content: content.trim(),
        is_published: isPublished && !scheduledDate, // Only publish now if no scheduled date
        published_at: publishedAt,
        parent_tweet_id: parentTweetId,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      };

      let tweetId = existingTweet?.id;

      if (isEditing && tweetId) {
        // Update existing tweet
        const { error: updateError } = await supabase
          .from("tweets")
          .update(tweetData)
          .eq("id", tweetId);

        if (updateError) throw updateError;

        // Update tags: delete all existing tags first
        const { error: deleteError } = await supabase
          .from("tweet_tags")
          .delete()
          .eq("tweet_id", tweetId);

        if (deleteError) throw deleteError;
      } else {
        // Create new tweet
        const { data: newTweet, error: insertError } = await supabase
          .from("tweets")
          .insert(tweetData)
          .select("id")
          .single();

        if (insertError) throw insertError;
        tweetId = newTweet.id;
      }

      // Insert tags (for both new and updated tweets)
      if (selectedTagIds.length > 0 && tweetId) {
        const tagInserts = selectedTagIds.map((tagId) => ({
          tweet_id: tweetId,
          tag_id: tagId,
        }));

        const { error: tagError } = await supabase
          .from("tweet_tags")
          .insert(tagInserts);

        if (tagError) throw tagError;
      }

      // Success - redirect to admin list
      router.push("/posts/admin");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle tweet deletion
   */
  const handleDelete = async () => {
    if (!existingTweet) return;

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Delete tweet (tags will be deleted via cascade)
      const { error: deleteError } = await supabase
        .from("tweets")
        .delete()
        .eq("id", existingTweet.id);

      if (deleteError) throw deleteError;

      // Success - redirect to admin list
      router.push("/posts/admin");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete post";
      setError(errorMessage);
      setShowDeleteConfirm(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate remaining characters
  const remainingChars = MAX_CONTENT_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Content Textarea */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          disabled={isLoading}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-800 dark:text-white disabled:opacity-50 resize-none"
        />
        {/* Character Count */}
        <div className="mt-1 flex justify-end">
          <span
            className={`text-xs ${
              isOverLimit
                ? "text-red-500"
                : remainingChars < 50
                ? "text-yellow-500"
                : "text-neutral-400"
            }`}
          >
            {remainingChars} characters remaining
          </span>
        </div>
      </div>

      {/* Tags Selection */}
      {allTags.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                disabled={isLoading}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  selectedTagIds.includes(tag.id)
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                } disabled:opacity-50`}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Publish Options */}
      <div className="space-y-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        {/* Publish Toggle */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="is_published"
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Publish immediately
          </label>
          <button
            type="button"
            id="is_published"
            role="switch"
            aria-checked={isPublished}
            onClick={() => setIsPublished(!isPublished)}
            disabled={isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isPublished
                ? "bg-neutral-900 dark:bg-neutral-100"
                : "bg-neutral-300 dark:bg-neutral-600"
            } disabled:opacity-50`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 transition-transform ${
                isPublished ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Schedule Date (only shown if publishing) */}
        {isPublished && (
          <div>
            <label
              htmlFor="scheduled_date"
              className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1"
            >
              Schedule for later (optional)
            </label>
            <input
              type="datetime-local"
              id="scheduled_date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              disabled={isLoading}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-white disabled:opacity-50"
            />
            {scheduledDate && (
              <p className="mt-1 text-xs text-neutral-500">
                Will be published at {new Date(scheduledDate).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* Status Info */}
        <p className="text-xs text-neutral-500">
          {isPublished
            ? scheduledDate
              ? "Post will be scheduled for later"
              : "Post will be published immediately"
            : "Post will be saved as a draft"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        {/* Delete Button (only when editing) */}
        {isEditing && !showDeleteConfirm && (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isLoading}
            className="text-sm text-red-500 hover:text-red-600 disabled:opacity-50"
          >
            Delete post
          </button>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-red-500">Are you sure?</span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Yes, delete
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isLoading}
              className="text-sm px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Spacer if no delete button */}
        {!isEditing && <div />}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isOverLimit || !content.trim()}
          className="px-6 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </span>
          ) : isEditing ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </button>
      </div>
    </form>
  );
}
