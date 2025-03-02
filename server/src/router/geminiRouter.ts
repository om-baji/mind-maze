import { Hono } from "hono";
import { GeminiCont } from "../controller/geminiController";

const geminiRouter = new Hono();

// const clerkMiddleware = async (c: Context, next: Next) => {
//   const auth = ClerkExpressWithAuth();
//   await new Promise((resolve) => auth(c.req.raw, c.res, resolve));
//   await next();
// };

geminiRouter.post("/question", GeminiCont.getQuestion);

export default geminiRouter;
