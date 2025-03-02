export class MemoryCache {
  private static cache: Record<string, { data: any; expiry: number | null }> = {};
  
  static set(key: string, value: any, ttlSeconds?: number): void {
    const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
    this.cache[key] = { data: value, expiry };
  }
  
  static get(key: string): any | null {
    const item = this.cache[key];
    
    if (!item) return null;
    
    if (item.expiry && Date.now() > item.expiry) {
      delete this.cache[key];
      return null;
    }
    
    return item.data;
  }
  
  static delete(key: string): void {
    delete this.cache[key];
  }
  
  static clear(): void {
    this.cache = {};
  }
}