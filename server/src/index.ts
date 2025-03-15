import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import docsRouter from './router/docsRouter'
import geminiRouter from './router/geminiRouter'
import quizRouter from './router/quizRouter'
import resultsRouter from './router/resultsRouter'
import { userRouter } from './router/userRouter'

const app = new Hono()

app.use('*', cors({
  origin: ['http://localhost:5173', '*'],
  allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  credentials: true,
  maxAge: 600,
}))

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
      .route("/", docsRouter)
      .route("/quiz",quizRouter)
      .route("/results",resultsRouter)

export default app
