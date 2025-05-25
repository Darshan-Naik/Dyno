import { Note } from "../../types/notes.types";
import { notesDB } from "../db";

export const getNotesFromDB = async () => {
  return await notesDB.toArray();
};

export const addNoteInDB = async (note: Note) => {
  await notesDB.add(note);
};

export const updateNoteInDB = async (note: Note) => {
  await notesDB.update(note.id, note);
};

export const deleteNoteInDB = async (id: string) => {
  await notesDB.delete(id);
};

export const setNotesInDB = async (notes: Note[]) => {
  await notesDB.clear();
  await notesDB.bulkAdd(notes);
};
