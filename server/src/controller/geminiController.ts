import { Context } from "hono";
import { useGemini } from "../utils/gemini";

/**
 * @swagger
 * /api/gemini/question:
 *   post:
 *     summary: Generates advanced questions using Gemini AI
 *     description: Generates a specified number of advanced questions for a given subject section using Google's Gemini AI model
 *     tags:
 *       - Gemini
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - section
 *               - limit
 *             properties:
 *               section:
 *                 type: string
 *                 description: The subject section for which questions need to be generated
 *               limit:
 *                 type: number
 *                 description: Number of questions to generate
 *     responses:
 *       200:
 *         description: Successfully generated questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: string
 *                   description: Generated questions text
 *       400:
 *         description: Failed to generate questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed"
 *                 error:
 *                   type: string
 *                   description: Error message
 */

export class GeminiCont {
    static async getQuestion(c : Context){
        try {
            const model = await useGemini(c.env.GEMINI_API_KEY);
            const {section,limit} = await c.req.json();

            const prompt = `Give me ${parseInt(limit)} very advanced, core and really very challenging questions in ${section} subject.`;

            const response = await model.generateContent(prompt);

            return c.json({
                message : "Success",
                data : response.response.text()
            })
        } catch (error) {
            return c.json({
                message : "Failed",
                error : error instanceof Error ? error.message : String(error)
            })
        }
    }
}