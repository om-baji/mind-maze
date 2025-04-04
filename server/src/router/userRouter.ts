import { Hono } from "hono";
import { UserController } from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { rateLimiter } from "../middleware/rate.limitter";

export const userRouter = new Hono()
  .post("/login", rateLimiter, UserController.login)
  .post("/register", rateLimiter, UserController.postUser)
  .get("/user", rateLimiter, UserController.getUserById)
  .get("/user/:email", rateLimiter, UserController.getUserByEmail)
  .post("/logout", rateLimiter, authMiddleware, UserController.logout)
  .delete("/deleteUser", rateLimiter, UserController.deleteUser)
  .get("/refresh", rateLimiter, UserController.refresh)
  .get("/me", rateLimiter, authMiddleware, UserController.me)
  .get("/stats", rateLimiter,authMiddleware,UserController.stats)