import { Redis } from "@upstash/redis";
import { Context } from "hono";

export class RedisSingleton {
  private static instance: Redis | null = null;
  private static DEFAULT_TTL = 3600;

  private constructor() {}

  static getInstance(c: Context): Redis {
    if (!this.instance) {
      const url = c.env?.UPSTASH_REDIS_REST_URL;
      const token = c.env?.UPSTASH_REDIS_REST_TOKEN;

      if (!url || !token) {
        throw new Error("Missing Redis environment variables");
      }

      this.instance = new Redis({ url, token });
    }
    return this.instance;
  }
  
  static getTtl(): number {
    return this.DEFAULT_TTL;
  }
}