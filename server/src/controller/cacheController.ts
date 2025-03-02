import { Context } from "hono";
import { QuizTypes } from "../models/quizSchema";
import { RedisSingleton } from "../utils/redisSingleton";
import { MemoryCache } from "../utils/memorySingleton";

export class CacheController {
  static async setQuiz(c: Context) {
    try {
      const { quiz } = await c.req.json<{ quiz: QuizTypes }>();
      const redis = RedisSingleton.getInstance(c);

      const configKey = `config:${quiz.id}`;

      await redis.set(configKey, JSON.stringify(quiz));

      MemoryCache.set(configKey, quiz, RedisSingleton.getTtl());

      return c.json({ message: "Added", id: quiz.id, success: true });
    } catch (error) {
      return c.json({ message: (error as Error).message, success: false });
    }
  }

  static async getQuiz(c: Context) {
    try {
      const quizId = c.req.param("id");
      if (!quizId) throw new Error("Quiz ID is required");

      const configKey = `config:${quizId}`;

      let quizData = MemoryCache.get(configKey);

      if (!quizData) {
        const redis = RedisSingleton.getInstance(c);
        const redisData = await redis.get<string>(configKey);

        if (!redisData) {
          return c.json({ message: "Quiz not found", success: false }, 404);
        }

        quizData = JSON.parse(redisData);
        MemoryCache.set(configKey, quizData, RedisSingleton.getTtl());
      }

      return c.json({ data: quizData, success: true });
    } catch (error) {
      return c.json({ message: (error as Error).message, success: false });
    }
  }

  static async setMetaData(c: Context) {
    try {
      const { userId, email, quizId } = await c.req.json<{
        userId: string;
        email: string;
        quizId: string;
      }>();
      if (!userId || !email || !quizId) throw new Error("Missing fields");

      const metaKey = `meta:${quizId}`;
      const metaData = { userId, email };

      const redis = RedisSingleton.getInstance(c);
      await redis.set(metaKey, JSON.stringify(metaData));

      MemoryCache.set(metaKey, metaData, RedisSingleton.getTtl());

      return c.json({ message: "Metadata added", quizId, success: true });
    } catch (error) {
      return c.json({ message: (error as Error).message, success: false });
    }
  }

  static async getMetaData(c: Context) {
    try {
      const quizId = c.req.param("id");
      if (!quizId) throw new Error("Quiz ID is required");

      const metaKey = `meta:${quizId}`;

      let metaData = MemoryCache.get(metaKey);

      if (!metaData) {
        const redis = RedisSingleton.getInstance(c);
        const redisData = await redis.get<string>(metaKey);

        if (!redisData) {
          return c.json({ message: "Metadata not found", success: false }, 404);
        }

        metaData = JSON.parse(redisData);
        MemoryCache.set(metaKey, metaData, RedisSingleton.getTtl());
      }

      return c.json({ data: metaData, success: true });
    } catch (error) {
      return c.json({ message: (error as Error).message, success: false });
    }
  }

  static async setQuestions(c: Context) {
    try {
      const { questions, quizId } = await c.req.json<{
        questions: any[];
        quizId: string;
      }>();
      if (!questions || !Array.isArray(questions) || !quizId) {
        throw new Error("Invalid input");
      }

      const questionsKey = `questions:${quizId}`;

      const redis = RedisSingleton.getInstance(c);
      await redis.set(questionsKey, JSON.stringify(questions));

      MemoryCache.set(questionsKey, questions, RedisSingleton.getTtl());

      return c.json({ message: "Questions added", quizId, success: true });
    } catch (error) {
      return c.json({ message: (error as Error).message, success: false });
    }
  }

  static async getQuestions(c: Context) {
    try {
      const quizId = c.req.param("id");
      if (!quizId) throw new Error("Quiz ID is required");

      const questionsKey = `questions:${quizId}`;

      let questions = MemoryCache.get(questionsKey);

      if (!questions) {
        const redis = RedisSingleton.getInstance(c);
        const redisData = await redis.get<string>(questionsKey);

        if (!redisData) {
          return c.json(
            { message: "Questions not found", success: false },
            404
          );
        }

        questions = JSON.parse(redisData);
        MemoryCache.set(questionsKey, questions, RedisSingleton.getTtl());
      }

      return c.json({ data: questions, success: true });
    } catch (error) {
      return c.json({ message: (error as Error).message, success: false });
    }
  }

  static async invalidateCache(c: Context) {
    try {
      const { quizId } = await c.req.json<{ quizId: string }>();
      if (!quizId) throw new Error("Quiz ID is required");

      MemoryCache.delete(`config:${quizId}`);
      MemoryCache.delete(`meta:${quizId}`);
      MemoryCache.delete(`questions:${quizId}`);

      return c.json({ message: "Cache invalidated", quizId, success: true });
    } catch (error) {
      return c.json({ message: (error as Error).message, success: false });
    }
  }
}
