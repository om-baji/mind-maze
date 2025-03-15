import { Hono } from "hono";
import { GeminiCont } from "../controller/geminiController";

const geminiRouter = new Hono();

geminiRouter.post("/question",GeminiCont.getQuestion);

export default geminiRouter;
