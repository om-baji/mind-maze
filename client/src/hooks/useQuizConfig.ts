import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getConfig = async (token: string, userId: string) => {
  try {
    const res = await axiosInstance.get(`/quiz/bulk?user=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export function useQuizConfig(userId: string | null, token: string) {
  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userId", userId],
    queryFn: () => getConfig(token as string, userId as string),
    staleTime: 1000 * 60 * 5,
  });

  return {
    isPending: isLoading,
    config,
    error,
  };
}
