import Request from "supertest";
import app from "../app";
import { Task } from "../models/task.model";

describe("Tasks", () => {
  test("it sholud return 200 if task found", async () => {
    Task.find = jest.fn().mockResolvedValue({
      complete: false,
      _id: "66cd90baa23c440add827057",
      title: "coding",
      description: "finished",
      date: "2024-08-27T15:48:47.916Z",
    });
    const response = await Request(app).get("/api/v1/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: {
        complete: false,
        _id: "66cd90baa23c440add827057",
        title: "coding",
        description: "finished",
        date: "2024-08-27T15:48:47.916Z"
      },
    });
  });

  test("it should return 500 is Task.find throws an error", async () => {
    Task.find = jest.fn().mockRejectedValue(new Error("database error"));
    const response = await Request(app).get("/api/v1/tasks");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ msg: "database error" });
  });

  test("it should return 201 if task is created", async () => {
    const taskData = {
      title: "web development",
      description: "finishing the api",
      complete: true,
    };
    Task.create = jest.fn().mockResolvedValue({
      ...taskData,
      complete: true,
      _id: "66ce53270fd8f938ff46bf39",
      date: "2024-08-27T22:28:55.609Z",
      __v: 0,
    });
    const response = await Request(app).post("/api/v1/tasks").send(taskData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      msg: "task created",
      task: {
        ...taskData,
        complete: true,
        _id: "66ce53270fd8f938ff46bf39",
        date: "2024-08-27T22:28:55.609Z",
        __v: 0,
      },
    });
  });

  test("should return 500 if Task.create throws an error", async () => {
    Task.create = jest.fn().mockRejectedValue(new Error("DataBase error"));

    const response = await Request(app).post("/api/v1/tasks").send({
      title: "web development",
      description: "finishing the api",
      complete: true,
    });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      msg: "DataBase error",
    });
  });

  test("should return 200 if task was deleted", async () => {
    const mockRes = {
      title: "job",
      description: "subit my paper work",
      complete: true,
    };
    Task.findByIdAndDelete = jest.fn().mockResolvedValue(mockRes);
    const response = await Request(app).delete("/api/v1/tasks/:id");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ msg: "task deleted", task: mockRes });
    expect(Task.findByIdAndDelete).toHaveBeenCalledWith(':id')
  });
  test("should return 404 if task was not task", async () => {
    Task.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    const response = await Request(app).delete("/api/v1/tasks/:id");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ msg: "task not found" });
  });

  test("if Task.findByIdAndDelete return an error", async() => {
    Task.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('dataBase error'))
    const response = await Request(app).delete('/api/v1/tasks/:id')
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({msg: 'dataBase error'})
  })
});
