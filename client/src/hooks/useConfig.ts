import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getConfig = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/quiz/bulk?user=${userId}`);

    return res.data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export function useConfig(userId: string) {
  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["config", userId],
    queryFn: () => getConfig(userId),
    staleTime: 1000 * 60 * 5,
  });

  return {
    isPending: isLoading,
    config,
    error,
  };
}
