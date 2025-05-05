import { toJS } from "mobx";
import { getTasks, setTasks } from "../../../../db/tasks/tasks.db";
import { taskStore } from "./task.store";
import { nanoid } from "nanoid";
import { debounce } from "../../../../utils/debounce.util";
import { Task } from "../../../../types/task.types";
import { getCurrentTime } from "../../../../utils/datetime.utils";

const debouncedSetTasks = debounce(setTasks);

export const fetchTasks = async () => {
  const tasks = await getTasks();
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
  await debouncedSetTasks(toJS(taskStore.tasks));
};

export const deleteTask = async (task) => {
  taskStore.removeTask(task);
  await debouncedSetTasks(toJS(taskStore.tasks));
};

export const completeTask = async (task) => {
  taskStore.completeTask(task);
  await debouncedSetTasks(toJS(taskStore.tasks));
};

export const updateTask = async (task) => {
  taskStore.updateTask(task);
  await debouncedSetTasks(toJS(taskStore.tasks));
};
