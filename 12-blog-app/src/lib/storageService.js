import { Client, ID, Storage } from "appwrite";
import config from "../config/config";

/**
 * Storage Service
 *
 * Handles all file storage operations including uploading, retrieving,
 * deleting files, and generating preview URLs using Appwrite's Storage API.
 * Supports images, documents, videos, and other file types.
 *
 * @class StorageService
 */
class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  /**
   * Get file preview URL
   *
   * Returns a direct URL to view the file. Uses getFileView instead of getFilePreview
   * because Appwrite's free plan blocks image transformations (403 error).
   * The URL can be used directly in <img> tags or as download links.
   *
   * Note: This is a synchronous method that returns a URL string, not a Promise.
   *
   * @param {string} fileId - Unique identifier of the file
   *
   * @returns {string} URL string for use in src attributes
   *
   * @example
   * // Basic usage
   * const previewUrl = storageService.getFilePreviewURL('file-123');
   * <img src={previewUrl} alt="Preview" />
   *
   * @example
   * // Use in React component
   * const ImagePreview = ({ fileId }) => (
   *   <img src={storageService.getFilePreviewURL(fileId)} alt="Preview" />
   * );
   */
  getFilePreviewURL(fileId) {
    try {
      if (!fileId) {
        console.error("No fileId provided to getFilePreviewURL");
        return "";
      }

      // Use getFileView for direct file access (works on free plan)
      // getFilePreview is blocked on free plan due to image transformation restrictions
      const url = this.storage.getFileView({
        bucketId: config.appwriteBucketId,
        fileId: fileId,
      });

      // Return the URL as a string
      return url.href || url.toString() || url;
    } catch (error) {
      console.error("Error generating file view URL:", error, {
        fileId,
        bucketId: config.appwriteBucketId,
      });
      return "";
    }
  }

  /**
   * Get file metadata
   *
   * Retrieves detailed metadata about a file including name, size, mime type,
   * creation date, and other properties. Does not download the actual file content.
   * Returns null if the file doesn't exist.
   *
   * @async
   * @param {string} fileId - Unique identifier of the file
   *
   * @returns {Promise<Object|null>} File metadata object if found, null if not found
   * @property {string} return.$id - File ID
   * @property {string} return.name - Original filename
   * @property {number} return.sizeOriginal - File size in bytes
   * @property {string} return.mimeType - MIME type (e.g., 'image/jpeg')
   * @property {string} return.$createdAt - ISO timestamp of creation
   *
   * @throws {Error} Network or server errors from Appwrite (except 404)
   *
   * @example
   * const fileInfo = await storageService.getFile('file-123');
   * if (fileInfo) {
   *   console.log('File name:', fileInfo.name);
   *   console.log('File size:', fileInfo.sizeOriginal, 'bytes');
   *   console.log('MIME type:', fileInfo.mimeType);
   * }
   */
  async getFile(fileId) {
    try {
      return await this.storage.getFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
    } catch (err) {
      // Return null if file not found (common case)
      if (err.code === 404) {
        return null;
      }
      console.error("Error getting file metadata:", err);
      throw err;
    }
  }

  /**
   * Upload a new file
   *
   * Uploads a file to the storage bucket. Automatically generates a unique ID
   * for the file. Supports all file types up to the bucket's size limit.
   * Returns the created file object with metadata.
   *
   * @async
   * @param {File} file - File object from input element (e.g., from event.target.files[0])
   * @param {string} [customFileId] - Optional custom file ID (auto-generated if not provided)
   * @param {Function} [onProgress] - Optional callback for upload progress
   *
   * @returns {Promise<Object>} Created file object with metadata
   * @property {string} return.$id - Generated file ID
   * @property {string} return.name - Uploaded filename
   * @property {number} return.sizeOriginal - File size in bytes
   * @property {string} return.mimeType - File MIME type
   *
   * @throws {Error} If file exceeds size limit, invalid file type, or network errors
   *
   * @example
   * // Basic upload from file input
   * const handleFileUpload = async (event) => {
   *   const file = event.target.files[0];
   *   try {
   *     const uploadedFile = await storageService.createFile(file);
   *     console.log('File uploaded:', uploadedFile.$id);
   *   } catch (error) {
   *     console.error('Upload failed:', error);
   *   }
   * };
   *
   * @example
   * // Upload with progress tracking
   * const file = event.target.files[0];
   * const uploaded = await storageService.createFile(
   *   file,
   *   null,
   *   (progress) => {
   *     console.log('Upload progress:', progress.percentage + '%');
   *   }
   * );
   *
   * @example
   * // Upload with custom file ID
   * const uploaded = await storageService.createFile(
   *   file,
   *   'my-custom-id-123'
   * );
   */
  async createFile(file, customFileId = null, onProgress = null) {
    try {
      return await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        fileId: customFileId || ID.unique(),
        file,
        permissions: [
          'read("any")', // Allow anyone to read/view the file (for public images)
        ],
        onProgress,
      });
    } catch (err) {
      console.error("Error uploading file:", err);

      // Provide more specific error messages
      if (err.code === 400) {
        throw new Error("Invalid file or file too large");
      }
      if (err.code === 401) {
        throw new Error("Authentication required to upload files");
      }

      throw err;
    }
  }

  /**
   * Delete a file permanently
   *
   * Permanently removes a file from storage. This action cannot be undone.
   * All associated preview URLs will stop working after deletion.
   *
   * @async
   * @param {string} fileId - Unique identifier of the file to delete
   *
   * @returns {Promise<void>}
   *
   * @throws {Error} If file doesn't exist or network errors
   *
   * @example
   * try {
   *   await storageService.deleteFile('file-123');
   *   console.log('File deleted successfully');
   * } catch (error) {
   *   if (error.message === 'File not found') {
   *     console.log('File already deleted');
   *   } else {
   *     console.error('Delete failed:', error);
   *   }
   * }
   *
   * @example
   * // Delete old featured image when updating post
   * if (oldPost.featuredImage) {
   *   await storageService.deleteFile(oldPost.featuredImage);
   * }
   */
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
    } catch (err) {
      console.error("Error deleting file:", err);

      if (err.code === 404) {
        throw new Error("File not found");
      }

      throw err;
    }
  }

  // TODO: Add file validation helpers
  // - validateFileType(file, allowedTypes) - Check if file type is allowed
  // - validateFileSize(file, maxSize) - Check if file size is within limit
  // - isImageFile(mimeType) - Check if file is an image
  // - isVideoFile(mimeType) - Check if file is a video
}

/**
 * Default instance of StorageService
 *
 * Pre-configured singleton instance ready to use throughout the application.
 * Import this instance to use file storage features without creating a new instance.
 *
 * @example
 * import storageService from './storageService';
 *
 * // Upload a file
 * const file = event.target.files[0];
 * const uploaded = await storageService.createFile(file);
 *
 * // Get preview URL
 * const previewUrl = storageService.getFilePreviewURL(uploaded.$id);
 */
export default new StorageService();
