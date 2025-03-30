import { formValues } from "@/models/formSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const quizStore = create<formValues>()(
    persist(
        (set) => ({
            id: '',
            title: '',
            description: '',
            subject: '',
            numQuestions: '',
            difficulty: '',
            timeLimit: 1,
            passingScore: 50,

            updateFormData: (key: keyof formValues, value: formValues[keyof formValues]) => {
                set((state) => ({
                    ...state,
                    [key]: value,
                }));
            },

            resetFormData: () => {
                set({
                    id: '',
                    title: '',
                    description: '',
                    subject: '',
                    numQuestions: '',
                    difficulty: '',
                    timeLimit: 1,
                    passingScore: 50,
                });
            },
        }),
        {
            name: "quiz-storage",
        }
    )
);
