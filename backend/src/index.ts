import { Hono } from 'hono'
import {cors} from 'hono/cors'
import { Bindings } from 'hono/types'
import { userRouter } from './Routes/User'
import { todoRouter } from './Routes/Todo'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  }
}>()

app.use('/api/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/todo', todoRouter)

export default app
