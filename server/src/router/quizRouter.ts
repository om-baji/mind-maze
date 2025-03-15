import { Hono } from "hono";
import { QuizController } from "../controller/quizController";

const quizRouter = new Hono();

quizRouter.post("/" ,QuizController.addQuiz);
quizRouter.get("/" ,QuizController.getQuiz);
quizRouter.get("/bulk" ,QuizController.getQuizById);
quizRouter.delete("/" ,QuizController.deleteQuiz);
quizRouter.put("/" ,QuizController.updateQuiz);

export default quizRouter;