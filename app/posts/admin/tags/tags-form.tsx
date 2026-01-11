/**
 * Tags Form Client Component
 * 
 * Interactive form for managing tags:
 * - Create new tags
 * - Delete existing tags
 * - View post counts per tag
 * 
 * Auto-generates slugs from tag names
 */

"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Type definitions
interface Tag {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}

interface TagsFormProps {
  initialTags: Tag[];
}

/**
 * Generate a URL-safe slug from a string
 */
function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export default function TagsForm({ initialTags }: TagsFormProps) {
  // State
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [newTagName, setNewTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const router = useRouter();

  /**
   * Handle creating a new tag
   */
  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTagName.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const slug = generateSlug(newTagName);

      // Check for duplicates
      const existingTag = tags.find(
        (t) => t.slug === slug || t.name.toLowerCase() === newTagName.toLowerCase()
      );

      if (existingTag) {
        throw new Error("A tag with this name already exists");
      }

      // Create tag
      const { data, error: insertError } = await supabase
        .from("tags")
        .insert({ name: newTagName.trim(), slug })
        .select("id, name, slug")
        .single();

      if (insertError) throw insertError;

      // Update local state
      setTags([...tags, { ...data, postCount: 0 }]);
      setNewTagName("");

      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create tag";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle deleting a tag
   */
  const handleDeleteTag = async (tagId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Delete tag (tweet_tags will cascade delete)
      const { error: deleteError } = await supabase
        .from("tags")
        .delete()
        .eq("id", tagId);

      if (deleteError) throw deleteError;

      // Update local state
      setTags(tags.filter((t) => t.id !== tagId));
      setDeleteConfirm(null);

      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete tag";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Create New Tag Form */}
      <form onSubmit={handleCreateTag} className="flex gap-3">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New tag name..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-white disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !newTagName.trim()}
          className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Adding..." : "Add Tag"}
        </button>
      </form>

      {/* Slug Preview */}
      {newTagName && (
        <p className="text-xs text-neutral-500">
          Slug preview: <code>{generateSlug(newTagName)}</code>
        </p>
      )}

      {/* Tags List */}
      {tags.length === 0 ? (
        <div className="text-center py-8 text-neutral-500">
          <p>No tags yet. Create your first tag above!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg"
            >
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  #{tag.name}
                </span>
                <span className="ml-2 text-sm text-neutral-500">
                  ({tag.slug})
                </span>
                <span className="ml-3 text-xs text-neutral-400">
                  {tag.postCount} {tag.postCount === 1 ? "post" : "posts"}
                </span>
              </div>

              {/* Delete Button / Confirmation */}
              {deleteConfirm === tag.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-500">Delete?</span>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    disabled={isLoading}
                    className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    disabled={isLoading}
                    className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(tag.id)}
                  disabled={isLoading}
                  className="text-xs text-red-500 hover:text-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Usage Info */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          About Tags
        </h3>
        <ul className="text-sm text-neutral-500 space-y-1">
          <li>• Tags help organize your posts by topic</li>
          <li>• Visitors can filter posts by clicking on tags</li>
          <li>• Deleting a tag removes it from all posts</li>
          <li>• Tag slugs are used in URLs (e.g., /posts?tag=my-tag)</li>
        </ul>
      </div>
    </div>
  );
}
