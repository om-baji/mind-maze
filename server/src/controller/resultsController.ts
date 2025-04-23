import { Context } from "hono";
import { RedisSingleton } from "../db/redis.cache";
import { getPrismaClient } from "../db/prisma";

export class ResultsController {
    static async answerKey(c : Context) {
        try {

            const redisClient = RedisSingleton.getInstance(c)
            const prisma = await getPrismaClient(c.env.DATABASE_URL)

            const attemptId = c.req.query('aid');

            const answerKey = `answer:${attemptId}`;

            const cache = await redisClient.get(answerKey)

            if(cache) {
                return c.json({
                    message : "Success",
                    answerMap : cache,
                    success : true
                },200)
            }

            const map = await prisma.attempts.findFirst({
                where : {
                    attemptId
                }
            })

            return c.json({
                message : "Success",
                answerMap : map,
                success : true
            })
            
        } catch (error) {
            return c.json({
                message: "Failed",
                error: error instanceof Error ? error.message : String(error),
                success : false
            }, 500);
        }
    }

    static async evaluate(c: Context) {
        try {
            const prisma = getPrismaClient(c.env.DATABASE_URL);
            const attemptId = c.req.query("aid");
            const payload = await c.req.json(); 
 
            const userMap : string[] = Object.values(payload)

            const attempt = await prisma.attempts.findFirst({
                where: { attemptId }
            });
            
            if (!attempt || !attempt.map) {
                return c.json({ message: "Attempt not found", success: false });
            }
    
            const answerKey = (attempt.map as string); 
    
            let correctCount = 0;
            const results = userMap.map((answer : string, index: number) => {
                const isCorrect = answerKey[index] === answer;
                if (isCorrect) correctCount++;
                return { questionIndex: index, isCorrect };
            });

            await prisma.results.create({
                data : {
                    attemptId : attemptId as string,
                    result : correctCount,
                }
            })
    
            return c.json({
                message: "Success",
                score: correctCount,
                totalQuestions: userMap.length,
                results,
                success: true
            });
        } catch (error) {
            return c.json({
                message: "Failed",
                error: error instanceof Error ? error.message : String(error),
                success: false
            }, 500);
        }
    }
    
}