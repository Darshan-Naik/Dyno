import { notesStore } from "./notes.store";
import {
  addNoteInDB,
  deleteNoteInDB,
  getNotesFromDB,
  setNotesInDB,
  updateNoteInDB,
} from "../../../../db/notes/notes.db";
import { nanoid } from "nanoid";
import { getCurrentTime } from "../../../../utils/datetime.utils";
import { debounce } from "../../../../utils/debounce.util";
import { Note } from "../../../../types/notes.types";
import {
  addNoteInCloud,
  deleteNoteInCloud,
  updateNoteInCloud,
} from "../../../../db/notes/notes.cloud.db";

const debouncedUpdateNoteInDB = debounce(updateNoteInDB);
const debouncedUpdateNoteInCloud = debounce(updateNoteInCloud);

export const fetchNotes = async () => {
  const notes = await getNotesFromDB();
  notesStore.setNotes(notes);
};

export const updateNote = async (value: string, id: string) => {
  const note = notesStore.updateNote(value, id);
  if (note) {
    await debouncedUpdateNoteInDB(note);
    await debouncedUpdateNoteInCloud(note);
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
  await addNoteInCloud(note);
};

export const removeNote = async (id: string) => {
  notesStore.removeNote(id);
  await deleteNoteInDB(id);
  await deleteNoteInCloud(id);
};

// Sync specific actions
export const syncNote = async (notes: Note[]) => {
  notesStore.setNotes(notes);
  await setNotesInDB(notes);
};
