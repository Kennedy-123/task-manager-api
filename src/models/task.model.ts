import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Enter a task"],
  },
  description: {
    type: String,
    required:[true, 'Enter a description'],
    trim: true
  },
  complete: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const Task = mongoose.model("task", taskSchema);
