const config = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),

  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwritePostsTableId: String(import.meta.env.VITE_APPWRITE_POSTS_TABLE_ID),
  appwriteLikesTableId: String(import.meta.env.VITE_APPWRITE_LIKES_TABLE_ID),
  appwriteCommentsTableId: String(
    import.meta.env.VITE_APPWRITE_COMMENTS_TABLE_ID
  ),

  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteApiKey: String(import.meta.env.VITE_APPWRITE_API_KEY),

  tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

export default config;
