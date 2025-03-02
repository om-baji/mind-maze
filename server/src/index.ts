import { Hono, Context } from 'hono'
import userRouter from './router/userRouter'
import geminiRouter from './router/geminiRouter'
import docsRouter from './router/docsRouter'
import { cors } from 'hono/cors'
import quizRouter from './router/quizRouter'
import cacheRouter from './router/cacheRouter'

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

app.route("/api/v1", userRouter);
app.route("/api/gemini", geminiRouter);
app.route("/api/docs", docsRouter);
app.route("/api/quiz",quizRouter);
app.route("/api/cache",cacheRouter);

export default app
