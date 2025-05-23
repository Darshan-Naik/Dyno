import Dexie from "dexie";
import { Note } from "../types/notes.types";
import { Task } from "../types/task.types";

const db = new Dexie("dyno-db");
db.version(1).stores({
  notes: "id, createdAt",
  tasks: "id, createdAt, completed",
});

export const notesDB = db.table<Note>("notes");
export const tasksDB = db.table<Task>("tasks");
