import { quickNoteDB } from "../db";

export const getQuickNoteFromDB = async () => {
  const note = await quickNoteDB.get("quickNote");
  return note || "";
};

export const updateQuickNoteInDB = async (note: string) => {
  await quickNoteDB.put("quickNote", note);
};
