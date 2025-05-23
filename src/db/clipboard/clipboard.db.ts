import { ClipboardText } from "src/types/clipboard.types";
import { clipboardDB } from "../db";

export const getClipBoardDataFromDB = async () => {
  const texts = await clipboardDB.toArray();
  return texts || [];
};

export const addClipBoardDataInDB = async (clipboardText: ClipboardText) => {
  await clipboardDB.add(clipboardText);
};

export const deleteClipBoardDataInDB = async (id: string) => {
  await clipboardDB.delete(id);
};
