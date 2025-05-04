import { getDBInstance } from "..";

const quickNote = getDBInstance("quickNote-db");

export const getQuickNote = async () => {
  const note = await quickNote.getItem<string>("quickNote");
  return note || "";
};

export const setQuickNote = async (note: string) => {
  await quickNote.setItem("quickNote", note);
};
