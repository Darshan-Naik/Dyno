import { toJS } from "mobx";
import {
  addTaskInDB,
  deleteTaskInDB,
  getTasksFromDB,
  updateTaskInDB,
} from "../../../../db/tasks/tasks.db";
import { taskStore } from "./task.store";
import { nanoid } from "nanoid";
import { Task } from "../../../../types/task.types";
import { getCurrentTime } from "../../../../utils/datetime.utils";
import { debounce } from "../../../../utils/debounce.util";

const debouncedUpdateTaskInDB = debounce(updateTaskInDB);

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
};

export const deleteTask = async (task) => {
  taskStore.removeTask(task.id);
  await deleteTaskInDB(task.id);
};

export const completeTask = async (task) => {
  const updatedTask = taskStore.completeTask(task);
  await updateTaskInDB(updatedTask);
};

export const updateTask = async (task) => {
  taskStore.updateTask(task);
  await debouncedUpdateTaskInDB(task);
};
