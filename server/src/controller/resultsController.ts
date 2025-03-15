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
              });
        }
    }
}