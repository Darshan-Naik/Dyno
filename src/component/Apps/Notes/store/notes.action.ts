import { notesStore } from "./notes.store";
import {
  addNoteInDB,
  deleteNoteInDB,
  getNotesFromDB,
  updateNoteInDB,
} from "../../../../db/notes/notes.db";
import { nanoid } from "nanoid";
import { getCurrentTime } from "../../../../utils/datetime.utils";
import { debounce } from "../../../../utils/debounce.util";

const debouncedUpdateNoteInDB = debounce(updateNoteInDB);

export const fetchNotes = async () => {
  const notes = await getNotesFromDB();
  notesStore.updateNotes(notes);
};

export const updateNote = async (value: string, id: string) => {
  const note = notesStore.updateNote(value, id);
  if (note) {
    await debouncedUpdateNoteInDB(note);
  }
};

export const createNote = async (value = "") => {
  const note = {
    id: nanoid(),
    value: value,
    createdAt: getCurrentTime(),
  };
  notesStore.createNote(note);
  await addNoteInDB(note);
};

export const removeNote = async (id: string) => {
  notesStore.removeNote(id);
  await deleteNoteInDB(id);
};
