import { Context } from "hono";
import { useGemini } from "../utils/gemini";
import { RedisSingleton } from "../utils/redisSingleton";

export class GeminiCont {
  static async getQuestion(c: Context) {
    try {
      const model = await useGemini(c.env.GEMINI_API_KEY);
      const redisClient = RedisSingleton.getInstance(c);

      const { section, limit, level } = await c.req.json();
      const questionLimit = Number(limit) || 1;
      const cacheKey = `questions:${section}:${questionLimit}:${level}`;
      const cache = await redisClient.get(cacheKey);

      if (cache) {
        return c.json({ message: "Success", data: cache });
      }

      const prompt = `Generate ${questionLimit} high-quality ${level} level questions for the ${section} subject. Ensure they are conceptually deep, thought-provoking, and require critical thinking to solve.`;

      const response = await model.generateContent(prompt);
      const questions = response.response.text();

      await redisClient.set(cacheKey, JSON.stringify(questions));
      await redisClient.expire(cacheKey, RedisSingleton.getTtl());

      return c.json({ message: "Success", data: questions });
    } catch (error) {
      return c.json({
        message: "Failed",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
