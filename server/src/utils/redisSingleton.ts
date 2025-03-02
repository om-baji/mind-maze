import { createClient } from "redis";

class RedisSingleton {
  private static instance: RedisSingleton;
  private client;

  private constructor() {
    this.client = createClient();
    this.client.connect();
  }

  static getInstance(): RedisSingleton {
    if (!RedisSingleton.instance) {
      RedisSingleton.instance = new RedisSingleton();
    }
    return RedisSingleton.instance;
  }

  async setData<T, U>(key: T, value: U) {
    await this.client.set(String(key), JSON.stringify(value));
  }

  async getData<T>(key: T): Promise<string | null> {
    return await this.client.get(String(key));
  }
}

export const redisInstance = RedisSingleton.getInstance();
