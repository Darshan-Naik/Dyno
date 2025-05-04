import { getDBInstance } from "..";

const clipBoard = getDBInstance("clipboard-db");

export const getClipBoardData = async () => {
  const texts = await clipBoard.getItem<string[]>("clipboard");
  return texts || [];
};

export const setClipBoardData = async (texts: string[]) => {
  await clipBoard.setItem("clipboard", texts);
};
