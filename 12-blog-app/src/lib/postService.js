import { ID, TablesDB, Client, Query } from "appwrite";
import config from "../config/config";
import { PostStatus } from "../constants/enums/postStatus";
import { calculateReadingTime } from "../utils/readingTime";

/**
 * Post Service
 *
 * Handles all post-related CRUD operations including creating, reading,
 * updating, and deleting blog posts using Appwrite's TablesDB API.
 *
 * @class PostService
 */
export class PostService {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
  }

  /**
   * Get all posts with optional filtering
   *
   * Retrieves a list of posts from the database. By default, only returns
   * posts with ACTIVE status. You can provide custom queries to search, filter,
   * sort, or paginate the results.
   *
   * @async
   * @param {Array} [queries=[Query.equal("status", PostStatus.ACTIVE)]] - Array of Appwrite Query objects for filtering
   *
   * @returns {Promise<Object>} Object containing posts array and metadata (total count, etc.)
   *
   * @throws {Error} Database or network errors from Appwrite
   *
   * @example
   * // Get all active posts
   * const posts = await postService.getAllPosts();
   *
   * @example
   * // Get all posts (including drafts)
   * const allPosts = await postService.getAllPosts([]);
   *
   * @example
   * // Get posts with custom queries
   * const recentPosts = await postService.getAllPosts([
   *   Query.equal("status", PostStatus.ACTIVE),
   *   Query.orderDesc("publishedDate"),
   *   Query.limit(10)
   * ]);
   *
   * @example
   * // Search active posts by title, and sort by published date
   * const searchResults = await postService.getAllPosts([
   *   Query.equal("status", PostStatus.ACTIVE),
   *   Query.search("title", "JavaScript"),
   *   Query.orderDesc("publishedDate")
   * ]);
   */
  async getAllPosts(
    queries = [Query.equal("status", PostStatus.ACTIVE)],
    limit = 12,
    offset = 0
  ) {
    return await this.tablesDB.listRows({
      databaseId: config.appwriteDatabaseId,
      tableId: config.appwriteTableId,
      queries: [...queries, Query.limit(limit), Query.offset(offset)],
    });
  }

  /**
   * Get a single post by its ID
   *
   * Retrieves detailed information about a specific post using its unique ID.
   * Returns null if the post doesn't exist (404 error).
   *
   * @async
   * @param {string} postId - Unique identifier of the post
   *
   * @returns {Promise<Object|null>} Post object if found, null if not found
   *
   * @throws {Error} Database or network errors from Appwrite (except 404)
   *
   * @example
   * try {
   *   const post = await postService.getPostById('post-123');
   *   if (post) {
   *     console.log('Post title:', post.title);
   *   } else {
   *     console.log('Post not found');
   *   }
   * } catch (error) {
   *   console.error('Error:', error);
   * }
   */
  async getPostById(postId) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: postId,
      });
    } catch (err) {
      // Return null if post not found (common case)
      if (err.code === 404) {
        return null;
      }
      console.error("Error fetching post by ID:", err);
      throw err;
    }
  }

  /**
   * Get a post by its slug
   *
   * Retrieves a post using its URL-friendly slug instead of the document ID.
   * Useful for SEO-friendly URLs like /posts/my-awesome-post
   *
   * @async
   * @param {string} slug - URL slug of the post
   * @returns {Promise<Object|null>} Post object if found, null if not found
   * @throws {Error} Database or network errors from Appwrite
   *
   * @example
   * const post = await postService.getPostBySlug('my-awesome-post');
   */
  async getPostBySlug(slug) {
    try {
      const response = await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries: [Query.equal("slug", slug), Query.limit(1)],
      });

      // Handle different possible response formats
      if (response && response.rows && response.rows.length > 0) {
        return response.rows[0];
      }

      return null;
    } catch (err) {
      console.error("Error fetching post by slug:", err);
      return null; // Return null instead of throwing to prevent app crashes
    }
  }

  /**
   * Create a new blog post
   *
   * Creates a new post with the provided data. Automatically generates a unique
   * ID combining a random UUID with the provided slug. If status is set to ACTIVE,
   * the publishedDate is automatically set to the current timestamp.
   *
   * @async
   * @param {Object} params - Post creation parameters
   * @param {string} params.slug - URL-friendly slug for the post (e.g., "my-first-post")
   * @param {string} params.title - Post title
   * @param {string} params.content - Post content (HTML or markdown)
   * @param {Array<string>} [params.tags=[]] - Array of tag strings
   * @param {string} [params.status=PostStatus.DRAFT] - Post status (DRAFT or ACTIVE)
   * @param {string|null} [params.featuredImage=null] - URL or ID of featured image
   * @param {string|null} [params.publishedDate=null] - ISO date string (auto-set if status is ACTIVE)
   *
   * @returns {Promise<Object>} The created post object
   *
   * @throws {Error} Database or network errors from Appwrite
   *
   * @example
   * const newPost = await postService.createPost({
   *   slug: 'my-awesome-post',
   *   title: 'My Awesome Post',
   *   content: '<p>This is the content...</p>',
   *   tags: ['javascript', 'tutorial'],
   *   status: PostStatus.ACTIVE,
   *   featuredImage: 'https://example.com/image.jpg'
   * });
   */
  async createPost({
    slug,
    title,
    content,
    authorId,
    status = PostStatus.DRAFT,
    featuredImage = null,
    publishedDate = null,
  }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: ID.unique(),
        data: {
          slug,
          title,
          content,
          authorId,
          status,
          featuredImage,
          publishedDate:
            status === PostStatus.ACTIVE
              ? new Date().toISOString()
              : publishedDate,
          readingTime: calculateReadingTime(content),
        },
      });
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
  }

  /**
   * Update an existing post
   *
   * Updates a post with new data. Only the fields provided in updatedData
   * will be modified; other fields remain unchanged. Returns the updated post.
   *
   * @async
   * @param {string} postId - Unique identifier of the post to update
   * @param {Object} updatedData - Object containing fields to update
   * @param {string} [updatedData.title] - New title
   * @param {string} [updatedData.content] - New content
   * @param {Array<string>} [updatedData.tags] - New tags array
   * @param {string} [updatedData.status] - New status
   * @param {string} [updatedData.featuredImage] - New featured image
   * @param {string} [updatedData.publishedDate] - New published date
   *
   * @returns {Promise<Object>} The updated post object
   *
   * @throws {Error} Database or network errors from Appwrite
   *
   * @example
   * const updated = await postService.updatePost('post-123', {
   *   title: 'Updated Title',
   *   status: PostStatus.ACTIVE,
   *   publishedDate: new Date().toISOString()
   * });
   *
   * @example
   * // Publish a draft post
   * await postService.updatePost('draft-post-id', {
   *   status: PostStatus.ACTIVE,
   *   publishedDate: new Date().toISOString()
   * });
   */
  async updatePost(postId, updatedData) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: postId,
        data: {
          ...updatedData,
          publishedDate:
            updatedData.status === PostStatus.ACTIVE
              ? new Date().toISOString()
              : updatedData.publishedDate,
          readingTime: updatedData.content
            ? calculateReadingTime(updatedData.content)
            : undefined,
        },
      });
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    }
  }

  /**
   * Delete a post permanently
   *
   * Permanently removes a post from the database. This action cannot be undone.
   * Consider implementing a soft delete (updating status to DELETED) instead
   * if you need to recover posts later.
   *
   * @async
   * @param {string} postId - Unique identifier of the post to delete
   *
   * @returns {Promise<void>}
   *
   * @throws {Error} Database or network errors from Appwrite
   *
   * @example
   * try {
   *   await postService.deletePost('post-123');
   *   console.log('Post deleted successfully');
   * } catch (error) {
   *   console.error('Failed to delete post:', error);
   * }
   *
   * @example
   * // Soft delete alternative (recommended)
   * await postService.updatePost('post-123', {
   *   status: PostStatus.DELETED
   * });
   */
  async deletePost(postId) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: postId,
      });
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err;
    }
  }

  // TODO: Add advanced post operations
  // - getDraftPosts() - Get all draft posts for current user

  // TODO: Add validation methods
  // - isSlugUnique(slug) - Check if slug already exists
}

/**
 * Default instance of PostService
 *
 * Pre-configured singleton instance ready to use throughout the application.
 * Import this instance to use post management features without creating a new instance.
 *
 * @example
 * import postService from './postService';
 *
 * const posts = await postService.getAllPosts();
 */
export default new PostService();
