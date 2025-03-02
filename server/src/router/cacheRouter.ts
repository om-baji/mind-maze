import { Hono } from "hono";
import { CacheController } from "../controller/cacheController";

const cacheRouter = new Hono();

cacheRouter.post("/meta", CacheController.setMetaData);
cacheRouter.post("/quiz",CacheController.setQuiz);
cacheRouter.post("/questions",CacheController.setQuestions);

cacheRouter.get("/meta/:id",CacheController.getMetaData);
cacheRouter.get("/quiz/:id",CacheController.getQuiz);
cacheRouter.get("/questions/:id",CacheController.getQuestions);

export default cacheRouter;