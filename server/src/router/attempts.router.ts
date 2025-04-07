import { Hono } from "hono";
import { AttemptController } from "../controller/attempts.controller";

const attemptsRouter = new Hono();

attemptsRouter
    .get("/attempts", AttemptController.userAttempts);


export default attemptsRouter;