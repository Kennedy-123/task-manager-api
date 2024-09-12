import { Request, Response } from "express";
import { Task } from "../models/task.model";
import { createTaskResBody } from "../types/createTaskResBody.type";

// get all tasks
export const getAllTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.find();
    if (!task) return res.status(404).json({ msg: "No task found" });
    res.status(200).json({ data: task });
  } catch (error) {
    error instanceof Error && res.status(500).json({ msg: error.message });
  }
};

// create a task
export const createTasks = async (
  req: Request<[], [], createTaskResBody>,
  res: Response
) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ msg: "task created", task });
  } catch (error) {
    error instanceof Error && res.status(500).json({ msg: error.message });
  }
};

// delete task

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ msg: "task not found" });
    res.status(200).json({ msg: "task deleted", task });
  } catch (error) {
    error instanceof Error && res.status(500).json({ msg: error.message });
  }
};

// update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = req.body;
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    if (!task) return res.status(404).json({ msg: "task not found" });
    res.status(200).json({ msg: "task updated", task });
  } catch (error) {
    error instanceof Error && res.status(500).json({ msg: error.message });
  }
};
