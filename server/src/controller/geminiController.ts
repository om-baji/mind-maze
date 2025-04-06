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
      const { section, limit, level,attemptId ,userId } = await c.req.json();
      const questionLimit = Number(limit) || 1;
      

      const cacheKey = `questions:${attemptId}`;
      const cache = await redisClient.get(cacheKey);

      if (cache) {
        return c.json({ message: "Success", data: cache });
      }

      const prompt = `Generate ${questionLimit} high-quality, ${level}-level multiple-choice questions for the subject ${section}.  
      - Ensure they are conceptually deep, thought-provoking, and require critical thinking.  
      - Each question should test fundamental understanding and application of concepts.  
      - Avoid overly simplistic or fact-based recall questions; focus on problem-solving and reasoning.  
      - Provide four answer options, ensuring that distractors are plausible and not obviously incorrect.  
      - Keep all options similar in length and complexity. ` 
      
      const response = await model.generateContent(prompt);
      const questions = response.response.text();

      const withAns = JSON.parse(questions);

      const map = JSON.parse(getAnswerMap(JSON.parse(questions)))

      await prisma.attempts.create({
        data  : {
          attemptId,
          map,
          userId
        }
      })

      const sanitizedQuestions = withAns.map((q: Question) => {
        const { correct_answer, ...rest } = q;
        return rest;
      });
      
      const answerKey = `answers:${attemptId}`

      await redisClient.set(answerKey,map);
      await redisClient.expire(answerKey,RedisSingleton.getTtl())

      await redisClient.set(cacheKey, JSON.stringify(questions));
      await redisClient.expire(cacheKey, RedisSingleton.getTtl());
      
      return c.json({ message: "Success", data: sanitizedQuestions });
    } catch (error) {
      return c.json({
        message: "Failed",
        error: error instanceof Error ? error.message : String(error),
      }, 500);
    }
  }
}

const getAnswerMap = (questions: Question[]) => {
  if (!Array.isArray(questions)) {
    console.error("getAnswerMap received a non-array value:", questions);
    return JSON.stringify([]);
  }

  const answerArray: string[] = new Array(questions.length);

  questions.forEach((question: Question, index) => {
    if (!question.correct_answer || !Array.isArray(question.options)) {
      console.warn(`Question at index ${index} is missing correct_answer or options:`, question);
      return;
    }

    const normalizedCorrectAnswer = question.correct_answer.replace(/\s+/g, " ").trim();

    const normalizedOptions = question.options.map((option) =>
      option.replace(/\s+/g, " ").trim()
    );

    const correctIndex = normalizedOptions.findIndex(
      (option) => option.toLowerCase() === normalizedCorrectAnswer.toLowerCase()
    );

    if (correctIndex === -1) {
      console.warn(
        `Question at index ${index} has a correct_answer that doesn't match any option:`,
        question.correct_answer,
        question.options
      );
    } else {
      answerArray[index] = normalizedOptions[correctIndex]; 
    }
  });

  return JSON.stringify(answerArray);
};

