import { makeAutoObservable } from "mobx";
import { Task } from "../../../../types/task.types";

class TaskStore {
  constructor() {
    makeAutoObservable(this);
  }
  tasks: Task[] = [];

  addTask(task) {
    this.tasks.unshift(task);
  }
  updateTask(task) {
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, ...task } : t
    );
  }
  completeTask(task) {
    const updatedTask = { ...task, completed: !task.completed };

    this.tasks = this.tasks.map((t) => (t.id === task.id ? updatedTask : t));
    return updatedTask;
  }
  setTasks(task) {
    this.tasks = task;
  }
  removeTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
export const taskStore = new TaskStore();
