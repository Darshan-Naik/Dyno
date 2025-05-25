import {
  addTaskInDB,
  deleteTaskInDB,
  getTasksFromDB,
  updateTaskInDB,
  setTasksInDB,
} from "../../../../db/tasks/tasks.db";
import { taskStore } from "./task.store";
import { nanoid } from "nanoid";
import { Task } from "../../../../types/task.types";
import { getCurrentTime } from "../../../../utils/datetime.utils";
import { debounce } from "../../../../utils/debounce.util";

import {
  updateTaskInCloud,
  addTaskInCloud,
  deleteTaskInCloud,
} from "../../../../db/tasks/tasks.cloud.db";

const debouncedUpdateTaskInDB = debounce(updateTaskInDB);
const debouncedUpdateTaskInCloud = debounce(updateTaskInCloud);

export const fetchTasks = async () => {
  const tasks = await getTasksFromDB();
  taskStore.setTasks(tasks);
};

export const addNewTask = async () => {
  const task: Task = {
    id: nanoid(),
    title: "",
    description: "",
    completed: false,
    createdAt: getCurrentTime(),
  };
  taskStore.addTask(task);
  await addTaskInDB(task);
  await addTaskInCloud(task);
};

export const deleteTask = async (id: string) => {
  taskStore.removeTask(id);
  await deleteTaskInDB(id);
  await deleteTaskInCloud(id);
};

export const completeTask = async (task: Task) => {
  const updatedTask = taskStore.completeTask(task);
  await updateTaskInDB(updatedTask);
  await updateTaskInCloud(updatedTask);
};

export const updateTask = async (task) => {
  taskStore.updateTask(task);
  await debouncedUpdateTaskInDB(task);
  await debouncedUpdateTaskInCloud(task);
};

// Sync specific actions
export const syncTask = async (tasks: Task[]) => {
  taskStore.setTasks(tasks);
  await setTasksInDB(tasks);
};
