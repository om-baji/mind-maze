import { Context } from "hono";
import { redisInstance } from "../utils/redisSingleton";
import { QuizSchema, QuizTypes } from "../models/quizSchema";

export class CacheController {
  static async setQuiz(c: Context) {
    try {
      const { quiz } = await c.req.json();

      const isValid = QuizSchema.safeParse(quiz);

      if(!isValid.success) throw new Error(isValid.error.message);

      const configKey = `config:${isValid.data.id}`

      await redisInstance.setData<string, QuizTypes>(configKey, quiz);

      return c.json({
        message: "Added",
        id: isValid.data.id,
        success: true  
      });
    } catch (error) {
        return c.json({
            message: error instanceof Error ? error.message : String(error),
            success: false
        });
    }
  }

  static async getQuiz(c: Context) {
    try {
      const quizId = c.req.param('id');
      
      if (!quizId) {
        throw new Error("Quiz ID is required");
      }
      
      const quizData = await redisInstance.getData<string>(quizId);
      
      if (!quizData) {
        return c.json({
          message: "Quiz not found",
          success: false
        }, 404);
      }
      
      return c.json({
        data: JSON.parse(quizData),
        success: true
      });
    } catch (error) {
      return c.json({
        message: error instanceof Error ? error.message : String(error),
        success: false
      });
    }
  }

  static async setMetaData(c: Context) {
    try {
      const { userId, email, quizId } = await c.req.json();
      
      if (!userId || !email || !quizId) {
        throw new Error("Missing required fields: userId, email, or quizId");
      }
      
      const metaData = { userId, email };
      const metaKey = `meta:${quizId}`;
      
      await redisInstance.setData<string, typeof metaData>(metaKey, metaData);
      
      return c.json({
        message: "Metadata added",
        quizId,
        success: true
      });
    } catch (error) {
      return c.json({
        message: error instanceof Error ? error.message : String(error),
        success: false
      });
    }
  }

  static async getMetaData(c: Context) {
    try {
      const quizId = c.req.param('id');
      
      if (!quizId) {
        throw new Error("Quiz ID is required");
      }
      
      const metaKey = `meta:${quizId}`;
      const metaData = await redisInstance.getData<string>(metaKey);
      
      if (!metaData) {
        return c.json({
          message: "Metadata not found",
          success: false
        }, 404);
      }
      
      return c.json({
        data: JSON.parse(metaData),
        success: true
      });
    } catch (error) {
      return c.json({
        message: error instanceof Error ? error.message : String(error),
        success: false
      });
    }
  }

  static async setQuestions(c: Context) {
    try {
      const { questions, quizId } = await c.req.json();
      
      if (!questions || !Array.isArray(questions) || !quizId) {
        throw new Error("Invalid questions array or missing quizId");
      }
      
      for (const question of questions) {
        if (!question.question || !question.options || !Array.isArray(question.options) || !question.correct_answer) {
          throw new Error("Invalid question format. Each question must have question, options array, and correct_answer");
        }
      }
      
      const questionsKey = `questions:${quizId}`;
      await redisInstance.setData<string, typeof questions>(questionsKey, questions);
      
      return c.json({
        message: "Questions added",
        quizId,
        count: questions.length,
        success: true
      });
    } catch (error) {
      return c.json({
        message: error instanceof Error ? error.message : String(error),
        success: false
      });
    }
  }

  static async getQuestions(c: Context) {
    try {
      const quizId = c.req.param('id');
      
      if (!quizId) {
        throw new Error("Quiz ID is required");
      }
      
      const questionsKey = `questions:${quizId}`;
      const questions = await redisInstance.getData<string>(questionsKey);
      
      if (!questions) {
        return c.json({
          message: "Questions not found",
          success: false
        }, 404);
      }
      
      return c.json({
        data: JSON.parse(questions),
        success: true
      });
    } catch (error) {
      return c.json({
        message: error instanceof Error ? error.message : String(error),
        success: false
      });
    }
  }
}