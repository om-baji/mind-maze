import { formValues } from "@/models/formSchema";
import { axiosInstance } from "@/utils/axiosInstance";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useQuizConfig(userId: string) {
  const [config, setConfig] = useState<formValues[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getConfig = useCallback(async () => {
    setIsPending(true);
    try {
      const res = await axiosInstance.get(`/api/quiz/bulk?user=${userId}`);

      setConfig(res.data.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsPending(false);
    }
  }, [userId]);

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  const quizConfig = useMemo(() => config, [config]);

  return {
    quizConfig,
    isPending,
    error,
  };
}
