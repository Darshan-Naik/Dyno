import { quickNoteStore } from "./quickNote.store";
import { debounce } from "../../../../utils/debounce.util";
import {
  getQuickNoteFromDB,
  updateQuickNoteInDB,
} from "../../../../db/quickNote/quickNote.db";
import { updateQuickNoteInCloud } from "../../../../db/quickNote/quickNote.cloud.db";

const debouncedUpdateQuickNoteInDB = debounce(updateQuickNoteInDB);
const debouncedUpdateQuickNoteInCloud = debounce(updateQuickNoteInCloud);

export const fetchQuickNote = async () => {
  const note = await getQuickNoteFromDB();
  quickNoteStore.updateNote(note);
};

export const updateQuickNote = async (note: string) => {
  quickNoteStore.updateNote(note);
  await debouncedUpdateQuickNoteInDB(note);
  await debouncedUpdateQuickNoteInCloud(note);
};

// Sync specific actions
export const syncQuickNote = async (note: { text: string }) => {
  updateQuickNote(note.text);
};
