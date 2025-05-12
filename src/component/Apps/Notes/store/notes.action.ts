import { notesStore } from "./notes.store";
import { debounce } from "../../../../utils/debounce.util";
import { getNotes, setNotes } from "../../../../db/notes/notes.db";
import { nanoid } from "nanoid";
import { getCurrentTime } from "../../../../utils/datetime.utils";
import { toJS } from "mobx";

const debouncedSetNotes = debounce(setNotes);

export const fetchNotes = async () => {
  const notes = await getNotes();
  notesStore.updateNotes(notes);
};

export const updateNote = async (value: string, id: string) => {
  notesStore.updateNote(value, id);
  const notes = notesStore.notes;
  await debouncedSetNotes(toJS(notes));
};

export const createNote = async (value = "") => {
  const note = {
    id: nanoid(),
    value: value,
    createdAt: getCurrentTime(),
  };
  notesStore.createNote(note);
  const notes = notesStore.notes;
  await debouncedSetNotes(toJS(notes));
};
export const removeNote = async (id: string) => {
  notesStore.removeNote(id);
  const notes = notesStore.notes;
  await debouncedSetNotes(toJS(notes));
};
