import { quickNoteDB } from "../db";

export const getQuickNoteFromDB = async () => {
  const note = await quickNoteDB.get("quickNote");

  return note?.text || "";
};

export const updateQuickNoteInDB = async (note: string) => {
  await quickNoteDB.put({
    id: "quickNote",
    text: note,
  });
};
