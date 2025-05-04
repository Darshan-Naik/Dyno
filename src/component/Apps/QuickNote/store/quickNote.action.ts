import { quickNoteStore } from "./quickNote.store";
import { debounce } from "../../../../utils/debounce.util";
import {
  getQuickNote,
  setQuickNote,
} from "../../../../db/quickNote/quickNote.db";

const debouncedSetTasks = debounce(setQuickNote);

export const fetchQuickNote = async () => {
  const note = await getQuickNote();
  quickNoteStore.updateNote(note);
};

export const updateQuickNote = async (note: string) => {
  quickNoteStore.updateNote(note);
  await debouncedSetTasks(note);
};
