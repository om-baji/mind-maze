import { clerkMiddleware } from '@hono/clerk-auth'
import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import docsRouter from './router/docsRouter'
import geminiRouter from './router/geminiRouter'
import quizRouter from './router/quizRouter'
import userRouter from './router/userRouter'
import resultsRouter from './router/resultsRouter'

const app = new Hono()

app.use('*', cors({
  origin: ['http://localhost:5173', '*'],
  allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  credentials: true,
  maxAge: 600,
}))

app.use("*",clerkMiddleware())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/health", async (c : Context) => {
  return c.json({
    message : "health ok!"
  })
})

app
  .basePath("/api/v1")
      .route("/", userRouter)
      .route("/gemini", geminiRouter)
      .route("/docs", docsRouter)
      .route("/quiz",quizRouter)
      .route("/results",resultsRouter)

export default app
