import { Hono } from "hono";
import { QuizController } from "../controller/quizController";
import { requireAuth } from "../../middleware/auth.middleware";

const quizRouter = new Hono();

quizRouter.post("/", requireAuth ,QuizController.addQuiz);
quizRouter.get("/", requireAuth ,QuizController.getQuiz);
quizRouter.get("/bulk", requireAuth ,QuizController.getQuizById);
quizRouter.delete("/", requireAuth ,QuizController.deleteQuiz);
quizRouter.put("/", requireAuth ,QuizController.updateQuiz);

export default quizRouter;