import Dexie from "dexie";
import { Note } from "../types/notes.types";
import { Task } from "../types/task.types";
import { Board } from "../types/drawingBoard.types";

const db = new Dexie("dyno-db");
db.version(1).stores({
  notes: "id, createdAt",
  tasks: "id, createdAt, completed",
  quickNote: "id",
  clipboard: "id",
  drawing_boards: "id, createdAt",
});

export const notesDB = db.table<Note>("notes");
export const tasksDB = db.table<Task>("tasks");
export const quickNoteDB = db.table<{
  id: string;
  text: string;
}>("quickNote");
export const clipboardDB = db.table<{
  id: string;
  text: string;
}>("clipboard");
export const drawingDB = db.table<Board>("drawing_boards");

export const dropDB = () => {
  db.transaction("rw", db.tables, () => {
    db.tables.forEach((table) => table.clear());
  });
};

export { db };
