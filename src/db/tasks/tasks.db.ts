import { tasksDB } from "../db";
import { Task } from "../../types/task.types";

export const getTasksFromDB = async (): Promise<Task[]> => {
  return await tasksDB.toArray();
};

export const updateTaskInDB = async (task: Task) => {
  await tasksDB.update(task.id, task);
};

export const deleteTaskInDB = async (taskId: string) => {
  await tasksDB.delete(taskId);
};

export const addTaskInDB = async (task: Task) => {
  await tasksDB.add(task);
};
