import Dexie from "dexie";
import { Note } from "../types/notes.types";
import { Task } from "../types/task.types";

const db = new Dexie("dyno-db");
db.version(1).stores({
  notes: "id, createdAt",
  tasks: "id, createdAt, completed",
  quickNote: "id",
  clipboard: "id",
});

export const notesDB = db.table<Note>("notes");
export const tasksDB = db.table<Task>("tasks");
export const quickNoteDB = db.table<string>("quickNote");
export const clipboardDB = db.table<{
  id: string;
  text: string;
}>("clipboard");
