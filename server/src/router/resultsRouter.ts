import { Hono } from "hono";
import { ResultsController } from "../controller/resultsController";

const resultsRouter = new Hono();

resultsRouter.get("/answerKey", ResultsController.answerKey)
             .post("/evaluate", ResultsController.evaluate)

export default resultsRouter;