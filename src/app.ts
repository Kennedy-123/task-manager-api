import Express from "express";
import task from "./routes/task.routes";
const app = Express();

app.use(Express.json())
app.use('/api/v1/tasks', task)

export default app