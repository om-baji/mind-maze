import { formValues } from "@/models/formSchema";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function fetchQuiz(quizConfig: formValues,userId : string) {
  try {
    const attemptId = `${userId}:${Date.now()}:${btoa(userId).slice(0, 6)}`;
    const res = await axiosInstance.post(
      "/gemini/question",
      {
        section: quizConfig.subject,
        limit: parseInt(quizConfig.numQuestions, 10),
        level: quizConfig.difficulty,
        attemptId
      },
    );
    return JSON.parse(res.data.data);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export function useQuiz(quizConfig: formValues, userId : string) {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz", quizConfig],
    queryFn: () => fetchQuiz(quizConfig, userId),
    staleTime: 1000 * 60 * 5,
    retry : 1
  });

  return {
    isPending: isLoading,
    questions,
    error,
  };
}
