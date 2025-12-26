import config from "../config/config";
import { GoogleGenAI } from "@google/genai";

export class AIService {
  gemini;

  constructor() {
    this.gemini = new GoogleGenAI({
      apiKey: config.googleGenAiApiKey,
    });
  }

  async generateBlogSummary(post, retries = 3) {
    try {
      const cleanedPostContent = this.stripHtmlTags(post.content);
      const truncatedPostContent = this.truncateContent(
        cleanedPostContent,
        3000
      );

      const prompt = `
      Generate a concise and engaging summary for the following blog post titled "${post.title}".
      Requirements:
        - Capture the main points and key takeaways
        - Make it compelling to entice readers
        - Length: 50-70 words
        - Write in an engaging, professional tone
        - the summary should be in plain text without any markdown or special formatting
      Content:
        "${truncatedPostContent}"`;

      const response = await this.gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        config: {
          temperature: 0.8,
          maxOutputTokens: 150,
          topP: 0.9,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });

      const summary =
        response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!summary || summary.trim().length === 0) {
        throw new Error("Empty summary generated");
      }

      return summary.trim();
    } catch (err) {
      return this.handleSummaryErrors(err, post, retries);
    }
  }

  handleSummaryErrors(err, post, retries) {
    // handle rate limit errors with retry
    if (err.status === 429 && retries > 0) {
      const waitTime = (4 - retries) * 10000; // 10s, 20s, 30s
      console.log(
        `Rate limited. Retrying in ${
          waitTime / 10000
        }s... (${retries} retries left)`
      );
      return new Promise((resolve) => setTimeout(resolve, waitTime)).then(() =>
        this.generateBlogSummary(post, retries - 1)
      );
    }

    // fallback for other errors
    console.error("Generate blog summary error:", err.message || err);

    // return a simple fallback summary instead of throwing an error
    return this.createFallbackSummary(post);
  }

  stripHtmlTags(content) {
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  truncateContent(content, maxLength) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  }

  createFallbackSummary(post) {
    const plainTextContent = this.stripHtmlTags(post.content);
    const words = plainTextContent.split(/\s+/).splice(0, 70);
    return words.join(" ") + (words.length >= 70 ? "..." : "");
  }
}

export default new AIService();
