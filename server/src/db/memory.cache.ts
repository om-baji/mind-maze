import { AttemptData, MapData, statsData, UserMapData } from "../utils/types";

export class MemoryCache {
  private static memory = new Map<string, MapData | UserMapData | number>();
  private static statsMemory = new Map<string,statsData>();
  private static attemtMemory = new Map<string,AttemptData>();

  static setMemory(key: string, value: MapData | UserMapData) {
    this.memory.set(key, value);
  }

  static setAttempt(key : string, value : AttemptData) {
    this.attemtMemory.set(key,value)
  }

  static getAttempt(key : string) {
    return this.attemtMemory.get(key)
  }

  static setIp(key : string,value : number) {
    this.memory.set(key,value);
  }

  static getIp(key : string) : number {
    const data = this.memory.get(key);
    if(!data || typeof data != "number") return 0;
    return data;
  }

  static setStats(key : string, value : statsData) {
    this.statsMemory.set(key,value)
  }

  static getStats(key : string) {
    const stats = this.statsMemory.get(key);

    return stats as statsData;
  }

  static getMemory(key: string) {
    const item = this.memory.get(key);

    if (!item) return null;

    if(typeof item === "number") return item

    if (item.expiry && Date.now() > item.expiry) {
      this.memory.delete(key);
      return null;
    }

    if ("data" in item) {
      return item.data;
    }
    return item;
  }
  

  static clear() {
    this.memory.clear();
  }

  static delete(key: string) {
    this.memory.delete(key);
  }
}
