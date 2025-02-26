import { Hono, Context } from 'hono'
import userRouter from './router/userRouter'
import geminiRouter from './router/geminiRouter'
import docsRouter from './router/docsRouter'
import { cors } from 'hono/cors'

const app = new Hono()

app.use("*", cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/health", async (c : Context) => {
  return c.json({
    message : "health ok!"
  })
})

app.route("/api/v1", userRouter);
app.route("/api/genAi", geminiRouter);
app.route("/api/docs", docsRouter);

export default app
