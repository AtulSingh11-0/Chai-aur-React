// Post Status Enum
export const PostStatus = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  DRAFT: "draft",
  ARCHIVED: "archived",
});

// Helper function to validate status
export const isValidPostStatus = (status) => {
  return Object.values(PostStatus).includes(status);
};

// Get all available statuses
export const getAllPostStatuses = () => {
  return Object.values(PostStatus);
};
