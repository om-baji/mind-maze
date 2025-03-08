import { Hono } from "hono";
import { ResultsController } from "../controller/resultsController";

const resultsRouter = new Hono();

resultsRouter.get("/answerKey", ResultsController.answerKey);

export default resultsRouter;