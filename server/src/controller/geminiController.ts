import { createId } from "@paralleldrive/cuid2";
import { Context } from "hono";
import { getPrismaClient } from "../db/prisma";
import { useGemini } from "../utils/gemini";
import { RedisSingleton } from "../db/redis.cache";
import { Question } from "../utils/types";

export class GeminiCont {
  static async getQuestion(c: Context) {
    try {
      const prisma = await getPrismaClient(c.env.DATABASE_URL)
      const model = await useGemini(c.env.GEMINI_API_KEY);
      const redisClient = RedisSingleton.getInstance(c);
      let attemptId;
      const { section, limit, level,attemptId : attempt } = await c.req.json();
      const questionLimit = Number(limit) || 1;
      
      attemptId = attemptId ? attempt : createId();

      const cacheKey = `questions:${attemptId}`;
      const cache = await redisClient.get(cacheKey);

      if (cache) {
        return c.json({ message: "Success", data: cache });
      }

      const prompt = `Generate ${questionLimit} high-quality ${level} level questions for the ${section} subject. Ensure they are conceptually deep, thought-provoking, and require critical thinking to solve.`;

      const response = await model.generateContent(prompt);
      const questions = response.response.text();

      const map = JSON.parse(getAnswerMap(JSON.parse(questions)))

      await prisma.attempts.create({
        data  : {
          attemptId,
          map
        }
      })

      const answerKey = `answers:${attemptId}`

      await redisClient.set(answerKey,map);
      await redisClient.expire(answerKey,RedisSingleton.getTtl())

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

const getAnswerMap = (questions : Question[]) => {
  const mpp = new Map<number, string>();

  questions.map((question : Question, index) => mpp.set(index, question.correct_option));

  return JSON.stringify(Object.fromEntries(mpp));
}
