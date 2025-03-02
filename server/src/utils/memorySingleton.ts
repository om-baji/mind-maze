export class MemoryCache {
    private static cache = new Map<string, { data: any; expiry: number | null }>();
  
    static set(key: string, value: any, ttlSeconds?: number): void {
      const expiry = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
      this.cache.set(key, { data: value, expiry });
    }
  
    static get(key: string): any | null {
      const item = this.cache.get(key);
      if (!item) return null;
  
      if (item.expiry && Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }
      return item.data;
    }
  
    static delete(key: string): void {
      this.cache.delete(key);
    }
  
    static clear(): void {
      this.cache.clear();
    }
  }
  