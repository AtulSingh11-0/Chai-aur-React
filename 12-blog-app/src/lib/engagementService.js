import { Client, ID, Query, TablesDB } from "appwrite";
import config from "../config/config";

export class EngagementService {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
  }

  // toggle like for a post by a user
  async toggleLike(post, userId) {
    try {
      // 1. check if the like already exists
      const existingLike = await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteLikesTableId,
        queries: [
          Query.equal("postId", post.$id),
          Query.equal("userId", userId),
        ],
      });

      // 2. if it exists, remove it
      if (existingLike.total > 0) {
        const likeId = existingLike.rows[0].$id; // assuming only one like per user per post

        // delete the existing like
        const deletedLike = await this.tablesDB.deleteRow({
          databaseId: config.appwriteDatabaseId,
          tableId: config.appwriteLikesTableId,
          rowId: likeId,
        });

        console.log("Deleted like:", deletedLike); // for debugging

        // 3. decrement like count on the post
        const updatedLikesCount = Math.max(0, (post.likesCount || 0) - 1);

        await this.tablesDB.updateRow({
          databaseId: config.appwriteDatabaseId,
          tableId: config.appwritePostsTableId,
          rowId: post.$id,
          data: {
            likesCount: updatedLikesCount,
          },
        });

        return { liked: false, updatedLikesCount }; // indicate that the post is now unliked
      } else {
        // 4. if it doesn't exist, create it
        const newLike = await this.tablesDB.createRow({
          databaseId: config.appwriteDatabaseId,
          tableId: config.appwriteLikesTableId,
          rowId: ID.unique(),
          data: {
            postId: post.$id,
            userId,
          },
        });

        console.log(newLike); // for debugging

        // 5. increment like count on the post
        const updatedLikesCount = (post.likesCount || 0) + 1;

        await this.tablesDB.updateRow({
          databaseId: config.appwriteDatabaseId,
          tableId: config.appwritePostsTableId,
          rowId: post.$id,
          data: {
            likesCount: updatedLikesCount,
          },
        });

        return { liked: true, updatedLikesCount }; // indicate that the post is now liked
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      throw err;
    }
  }

  // check if a user has liked a post
  async checkIfUserLiked(postId, userId) {
    try {
      const existingLike = await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteLikesTableId,
        queries: [Query.equal("postId", postId), Query.equal("userId", userId)],
      });

      return existingLike.total > 0;
    } catch (err) {
      console.error("Error checking if user liked post:", err);
      return false;
    }
  }

  // add comment to a post
  async addComment(post, userId, commentText) {
    try {
      // 1. create the comment
      const newComment = await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCommentsTableId,
        rowId: ID.unique(),
        data: {
          commentText,
          postId: post.$id,
          userId,
          // 693e2d9a00294f609908
          username: `Anonymous` + `_${userId.substring(15, 20)}`, // append part of userId for uniqueness
        },
      });

      console.log("New comment added:", newComment); // for debugging

      // 2. increment comment count on the post
      const updatedCommentCount = (post.commentCount || 0) + 1;

      await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwritePostsTableId,
        rowId: post.$id,
        data: {
          commentCount: updatedCommentCount,
        },
      });

      return { newComment, updatedCommentCount };
    } catch (err) {
      console.error("Error adding comment:", err);
      throw err;
    }
  }

  // fetch comments for a post
  async fetchComments(postId) {
    try {
      // fetch comments for the given postId, ordered by creation date descending
      const comments = await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCommentsTableId,
        queries: [Query.equal("postId", postId), Query.orderDesc("$createdAt")],
      });

      return comments.rows; // return the list of comments
    } catch (err) {
      console.error("Error fetching comments:", err);
      throw err;
    }
  }

  // update comment for a post
  async updateComment(commentId, newText) {
    try {
      const updatedComment = await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCommentsTableId,
        rowId: commentId,
        data: {
          commentText: newText,
        },
      });

      return updatedComment;
    } catch (err) {
      console.error("Error updating comment:", err);
      throw err;
    }
  }

  // delete comment for a post
  async deleteComment(post, commentId) {
    try {
      // delete the comment
      const deletedComment = await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCommentsTableId,
        rowId: commentId,
      });

      console.log("Deleted comment:", deletedComment); // for debugging

      // decrement comment count on the post
      const updatedCommentCount = Math.max(0, (post.commentCount || 0) - 1);

      await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwritePostsTableId,
        rowId: post.$id,
        data: {
          commentCount: updatedCommentCount,
        },
      });

      return { deletedComment, updatedCommentCount };
    } catch (err) {
      console.error("Error deleting comment:", err);
      throw err;
    }
  }
}

export default new EngagementService();
