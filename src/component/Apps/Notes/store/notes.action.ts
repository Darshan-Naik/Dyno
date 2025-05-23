import { notesStore } from "./notes.store";
import {
  getNotes,
  updateNote as updateNoteDB,
  addNote as addNoteDB,
  deleteNote as deleteNoteDB,
} from "../../../../db/notes/notes.db";
import { nanoid } from "nanoid";
import { getCurrentTime } from "../../../../utils/datetime.utils";

export const fetchNotes = async () => {
  const notes = await getNotes();
  notesStore.updateNotes(notes);
};

export const updateNote = async (value: string, id: string) => {
  const note = notesStore.updateNote(value, id);
  if (note) {
    await updateNoteDB(note);
  }
};

export const createNote = async (value = "") => {
  const note = {
    id: nanoid(),
    value: value,
    createdAt: getCurrentTime(),
  };
  notesStore.createNote(note);
  await addNoteDB(note);
};

export const removeNote = async (id: string) => {
  notesStore.removeNote(id);
  await deleteNoteDB(id);
};
