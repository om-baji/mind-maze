import { Context } from "hono";
import { getPrismaClient } from "../db/prisma";
import { RedisSingleton } from "../db/redis.cache";
import { MemoryCache } from "../db/memory.cache";

export class AttemptController {
    static async userAttempts(c : Context) {
        try {
            const prisma = getPrismaClient(c.env.DATABASE_URL)
            const redisClient = RedisSingleton.getInstance(c)
            
            const userId = c.req.query("id");

            const cacheKey = `attempts:${userId}`

            const cache = MemoryCache.getMemory(cacheKey) ?? await redisClient.get(cacheKey)

            if(cache) {
                c.json({
                    message : "Success",
                    success : true,
                    attempts : cache
                })
            }

            const attempts = await prisma.attempts.findFirst({
                where : {
                    userId
                },
            })

            if(!attempts) throw new Error("Attempts not found!")

            await redisClient.set(cacheKey,attempts)
            MemoryCache.setAttempt(cacheKey,attempts)

            return c.json({
                success : true,
                message : "Fetched attempts successfully!",
                attempts
            })
            
        } catch (error) {
            return c.json({
                success : false,
                error : error instanceof Error ? error.message : String(error),
                message : "Something went wrong!"
            }, 500)
        }
    }
}