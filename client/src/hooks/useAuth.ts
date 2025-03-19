import { axiosIntercept } from "@/utils/axios.interceptor";
import { useCallback, useState } from "react";

type Response = {
  message : string,
  user? : {
    id : string,
    name : string,
    email : string
  },
  success : boolean,
  error? : string
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Response | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  // Fetch auth data with debounce to prevent frequent calls
  const fetchAuth = useCallback(async (force = false) => {
    // Implement a simple cache mechanism
    // Only fetch if more than 1 hour has passed or force is true
    const now = Date.now();
    const shouldFetch = force || !lastFetchTime || (now - lastFetchTime > 60 * 60 * 1000);
    
    if (!shouldFetch) return;
    
    setIsLoading(true);
    try {
      const response = await axiosIntercept.get("/me");
      console.log("Auth API called at:", new Date().toISOString());
      setData(response.data);
      setLastFetchTime(now);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error("Auth fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, [lastFetchTime]);

  return { 
    isLoading, 
    error, 
    meta: data?.user, 
    status: data?.success,
    refetch: fetchAuth 
  };
};