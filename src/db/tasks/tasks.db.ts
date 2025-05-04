import { getDBInstance } from "..";

const taskDB = getDBInstance("tasks-db");

export const getTasks = async () => {
  const tasks = await taskDB.getItem("tasks");
  return tasks || [];
};

export const setTasks = async (tasks) => {
  await taskDB.setItem("tasks", tasks);
};
