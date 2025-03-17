import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function fetchSwagger() {
  try {
    const res = await axiosInstance.get("/swaggerConfig");
    if (!res.data || !res.data.config) {
      throw new Error("Invalid Swagger configuration received");
    }
    return res.data.config;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch Swagger config");
  }
}

export function useSwagger() {
  return useQuery({
    queryKey: ["swagger"],
    queryFn: fetchSwagger,
    retry: false,
  });
}
