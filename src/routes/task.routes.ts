import { Router } from "express";
import {
  createTasks,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.route("/").get(getAllTask).post(createTasks);
router.route("/:id").delete(deleteTask).patch(updateTask)

export default router;
