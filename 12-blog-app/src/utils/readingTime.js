export const calculateReadingTime = (htmlContent) => {
  const averageReadingSpeedInWordsPerMinute = 200; // average reading speed

  // 1. strip HTML tags to plain text
  const plainTextContent = htmlContent.replace(/<[^>]*>?/gm, "");

  // 2. count words
  const wordCount = plainTextContent.trim().split(/\s+/).length;

  // 3. calculate reading time in minutes
  const readingTimeInMinutes = Math.ceil(
    wordCount / averageReadingSpeedInWordsPerMinute
  );

  // 4. return reading time
  return readingTimeInMinutes;
};
