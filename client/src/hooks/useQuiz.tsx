import { formValues } from "@/models/formSchema";
import { questionAtom } from "@/store/questions.atom";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useQuiz(quizConfig: formValues) {
    const [isPending, setIsPending] = useState(false);
    const [questions, setQuestions] = useAtom(questionAtom);
    const [error, setError] = useState<string | null>(null);

    const stableQuizConfig = useMemo(() => ({ ...quizConfig }), [quizConfig]);

    const generateQuiz = useCallback(async () => {
        setIsPending(true);
        try {
            const res = await axiosInstance.post("/api/gemini/question", {
                section: stableQuizConfig.subject,
                limit: parseInt(stableQuizConfig.numQuestions, 10),
                level : stableQuizConfig.difficulty
            });

            setQuestions(JSON.parse(res.data.data));
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setIsPending(false);
        }
    }, [stableQuizConfig]);

    useEffect(() => {
        generateQuiz();
    }, [generateQuiz]);

    return {
        isPending,
        questions, 
        error,
    };
}
