import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function fetchSwagger(token: string) {
  try {
    const res = await axiosInstance.get("/docs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.config;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export function useSwagger(token : string) {
  
  const {
    data: swagger,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["swagger"],
    queryFn: () => fetchSwagger(token as string),
    enabled: !!token,
  });

  return {
    swagger,
    isLoading,
    error,
  };
}
