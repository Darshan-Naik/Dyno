import { quickNoteStore } from "./quickNote.store";
import { debounce } from "../../../../utils/debounce.util";
import {
  getQuickNoteFromDB,
  updateQuickNoteInDB,
} from "../../../../db/quickNote/quickNote.db";

const debouncedUpdateQuickNoteInDB = debounce(updateQuickNoteInDB);

export const fetchQuickNote = async () => {
  const note = await getQuickNoteFromDB();
  quickNoteStore.updateNote(note);
};

export const updateQuickNote = async (note: string) => {
  quickNoteStore.updateNote(note);
  await debouncedUpdateQuickNoteInDB(note);
};
