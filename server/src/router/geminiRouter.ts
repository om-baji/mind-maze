import { Hono } from "hono";
import { GeminiCont } from "../controller/geminiController";
import { requireAuth } from "../../middleware/auth.middleware";

const geminiRouter = new Hono();

geminiRouter.post("/question", requireAuth ,GeminiCont.getQuestion);

export default geminiRouter;
