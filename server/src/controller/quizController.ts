import { Context } from "hono";
import { QuizSchema } from "../models/quizSchema";
import { getPrismaClient } from "../utils/db";

/**
 * @swagger
 * /quiz:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete a quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update a quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       500:
 *         description: Server error
 * 
 *   get:
 *     summary: Get a quiz by id
 *     tags: [Quiz]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Server error
 */

export class QuizController {
  static async addQuiz(c: Context) {
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
