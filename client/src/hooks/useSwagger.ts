import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export function useSwagger() {
  const [swagger, setSwagger] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const getSwagger = async () => {
      try {
        const res = await axiosInstance.get("/api/docs");
        console.log("response : ", res);
        setSwagger(res.data.config);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };

    getSwagger();
  }, []);

  return {
    swagger,
    error,
    isLoading,
  };
}
