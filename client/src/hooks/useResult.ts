import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getResults = async (
  userMap: Record<number, string>,
  attemptId: string
): Promise<any | null> => {
  try {
    const { data } = await axiosInstance.post(`/results/evaluate?aid=${attemptId}`, userMap, {
      headers: { "Content-Type": "application/json" },
    });    

    return data;
  } catch (error) {
    console.error("Error fetching results:", error);
    return null;
  }
};

export function useResult(userMap: Record<number, string>, attemptId: string) {
  return useQuery({
    queryKey: ["result", attemptId],
    queryFn: () => getResults(userMap, attemptId),
    retry: 1,
    enabled : false
  });
}
