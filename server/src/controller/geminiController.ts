import { Context } from "hono";
import { useGemini } from "../utils/gemini";

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