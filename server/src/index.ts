import { Hono, Context } from 'hono'
import userRouter from './router/userRouter'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.get("/health", async (c : Context) => {
  return c.json({
    message : "health ok!"
  })
})

app.route("/api/v1", userRouter);

export default app
