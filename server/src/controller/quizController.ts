import { Context } from "hono";
import { QuizSchema } from "../models/quizSchema";
import { getPrismaClient } from "../db/prisma";

export class QuizController {
  static async addQuiz(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);

      const body = await c.req.json();

      const { id } = c.req.query();

      console.log(id)

      const isValid = QuizSchema.safeParse(body);

      if (!isValid.success) throw new Error(isValid.error.message);

      const {
        timeLimit,
        title,
        difficulty,
        description,
        numQuestions,
        passingScore,
        subject,
      } = isValid.data;

      await prisma.quiz.create({
        data: {
          title,
          numQuestions: parseInt(numQuestions),
          description,
          passingScore,
          timeLimit: timeLimit || 10,
          difficulty,
          subject,
          userId: id,
        },
      });

      return c.json(
        {
          message: "Quiz created",
          success: true,
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          message: error instanceof Error ? error.message : String(error),
          success: false,
        },
        500
      );
    }
  }

  static async deleteQuiz(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);
      const { id } = c.req.query();
      await prisma.quiz.delete({
        where: {
          id,
        },
      });
      return c.json({ message: "Quiz deleted", success: true });
    } catch (error) {
      return c.json(
        {
          message: error instanceof Error ? error.message : String(error),
          success: false,
        },
        500
      );
    }
  }

  static async updateQuiz(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);
      const body = await c.req.json();
      const { id } = c.req.query();

      const isValid = QuizSchema.safeParse(body);
      if (!isValid.success) throw new Error(isValid.error.message);

      const {
        timeLimit,
        title,
        difficulty,
        description,
        numQuestions,
        passingScore,
        subject,
      } = isValid.data;

      await prisma.quiz.update({
        where: {
          id,
        },
        data: {
          title,
          numQuestions: parseInt(numQuestions),
          description,
          passingScore,
          timeLimit: timeLimit || 10,
          difficulty,
          subject,
        },
      });

      return c.json({ message: "Quiz updated", success: true });
    } catch (error) {
      return c.json(
        {
          message: error instanceof Error ? error.message : String(error),
          success: false,
        },
        500
      );
    }
  }

  static async getQuiz(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);
      const { id } = c.req.query();
      const quiz = await prisma.quiz.findUnique({
        where: {
          id,
        },
      });
      if (!quiz) throw new Error("Quiz not found");
      return c.json({ data: quiz, success: true });
    } catch (error) {
      return c.json(
        {
          message: error instanceof Error ? error.message : String(error),
          success: false,
        },
        500
      );
    }
  }

  static async getQuizById(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);
      const { user } = c.req.query();
      const quiz = await prisma.quiz.findMany({
        where: {
          userId: user,
        },
      });
      if (!quiz) throw new Error("Quiz not found");
      return c.json({ data: quiz, success: true });
    } catch (error) {
      return c.json(
        {
          message: error instanceof Error ? error.message : String(error),
          success: false,
        },
        500
      );
    }
  }
}
