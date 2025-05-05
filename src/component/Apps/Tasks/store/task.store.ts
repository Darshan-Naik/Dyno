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
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, completed: true } : t
    );
  }
  setTasks(task) {
    this.tasks = task;
  }
  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
}
export const taskStore = new TaskStore();
