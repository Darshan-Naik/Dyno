import { Note } from "../../types/notes.types";
import { notesDB } from "../dexie";

export const getNotes = async () => {
  return await notesDB.toArray();
};

export const setNotes = async (notes: Note[]) => {
  await notesDB.clear();
  await notesDB.bulkAdd(notes);
};

export const addNote = async (note: Note) => {
  await notesDB.add(note);
};

export const updateNote = async (note: Note) => {
  await notesDB.update(note.id, note);
};

export const deleteNote = async (id: string) => {
  await notesDB.delete(id);
};
