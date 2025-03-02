import { z } from "zod";

export const formSchema = z.object({
  id : z.string().optional(),
  title: z.string().min(2, {
    message: "Quiz title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  numQuestions: z.string({
    required_error: "Please select number of questions.",
  }),
  difficulty: z.string({
    required_error: "Please select difficulty level.",
  }),
  timeLimit: z.number().min(1, {
    message: "Time limit must be at least 1 minute.",
  }).optional(),
  passingScore: z.number().min(0).max(100),
});

export type formValues = z.infer<typeof formSchema>