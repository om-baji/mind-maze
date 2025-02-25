import { Hono } from "hono";
import { UserWebhook } from "../controller/webhook";

const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
    }
}>()

userRouter.post("/webhook", UserWebhook.userWebhook);

export default userRouter;