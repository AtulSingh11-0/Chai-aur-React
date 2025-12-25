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
      const prompt = `Generate a concise and engaging summary for the following blog post titled "${
        post.title
      }". The summary should capture the main points and entice readers to read the full article. within 50-70 words. Here is the content: ${post.content.replace(
        /<[^>]*>?/gm,
        ""
      )}`;

      const response = await this.gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 1.2,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });

      return response.text;
    } catch (err) {
      // handle rate limit errors with retry
      if (err.status === 429 && retries > 0) {
        const waitTime = 12000; // lets wait for 12 seconds
        console.log(`Rate limited. Retrying in ${waitTime / 1000}s... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        return this.generateBlogSummary(post, retries - 1);
      }

      console.error("Generate blog summary error:", err);
      throw err;
    }
  }
}

export default new AIService();
