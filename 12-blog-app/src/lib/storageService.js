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
      let fileToUpload = file; // we will use this variable to hold the file to upload and let the original file unchanged

      // if the file is an image, compress it to WebP before uploading
      if (file.type.startsWith("image/")) {
        fileToUpload = await this.compressImageToWebP(file);
      }

      return await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        fileId: customFileId || ID.unique(),
        file: fileToUpload,
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

  /**
   */
  async compressImageToWebP(
    file,
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.85
  ) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          // calculate new dimensions of the image while maintainting its aspect ratio
          let width = img.width; // setting original width
          let height = img.height; // setting original height

          // resizing the image if it exceeds max dimensions
          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height; // calculating aspect ratio

            // if width is greater than height, scale width to maxWidth and adjust height accordingly
            if (width > height) {
              width = maxWidth; // setting width to maxWidth
              height = width / aspectRatio; // adjusting height based on aspect ratio
            } else {
              // if height is greater than width, scale height to maxHeight and adjust width accordingly
              height = maxHeight; // setting height to maxHeight
              width = height * aspectRatio; // adjusting width based on aspect ratio
            }
          }

          // create a canvas to draw the resized image
          const canvas = document.createElement("canvas");
          canvas.width = width; // setting canvas width
          canvas.height = height; // setting canvas height

          // set canvas context and draw the image, '2d' context is used for drawing 2D shapes and images
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height); // drawing the image on canvas, scaled to new dimensions

          // convert the canvas to a Blob in WebP format with specified quality
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                // check if blob creation was successful
                reject(new Error("Failed to compress image"));
                return; // throw an error and exit if blob is null
              }

              const originalFileName = file.name.replace(/\.[^/.]+$/, ""); // removing original file extension

              const webpFile = new File( // creating new File object in WebP format
                [blob], // passing the blob as array, since File constructor expects an array of parts
                `${originalFileName}.webp`, // setting new file name with .webp extension
                { type: "image/webp" } // setting MIME type to image/webp
              );

              resolve(webpFile); // resolving the promise with the new WebP file
            },
            "image/webp", // specifying the output format as WebP
            quality // setting the quality of the output image
          );
        };

        // if image fails to load, reject the promise with an error
        img.onerror = (error) => {
          reject(
            new Error("Failed to load image for compression: " + error.message)
          );
        };
        img.src = event.target.result; // setting image source to the file data
      };

      // if file reading fails, reject the promise with an error
      reader.onerror = (error) => {
        reject(new Error("Failed to read file: " + error.message));
      };
      reader.readAsDataURL(file); // reading the file as Data URL
    });
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
