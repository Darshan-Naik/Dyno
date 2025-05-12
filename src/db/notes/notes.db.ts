import { Note } from "../../types/notes.types";
import { getDBInstance } from "..";

const quickNote = getDBInstance("notes-db");

export const getNotes = async () => {
  const notes = await quickNote.getItem<Note[]>("notes");
  return notes || [];
};

export const setNotes = async (notes: Note[]) => {
  await quickNote.setItem("notes", notes);
};
