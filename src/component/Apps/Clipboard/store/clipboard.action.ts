import { clipboardStore } from "./clipboard.store";
import { ClipboardText } from "../../../../types/clipboard.types";
import {
  getClipBoardDataFromDB,
  addClipBoardDataInDB,
  deleteClipBoardDataInDB,
} from "../../../../db/clipboard/clipboard.db";
import { nanoid } from "nanoid";
import { isElectron } from "../../../../utils/environment";

export const fetchClipboardData = async () => {
  const texts = await getClipBoardDataFromDB();
  clipboardStore.setTexts(texts);
};

export const addClipboardData = (text: string) => {
  if (!text.trim()) return;

  if (clipboardStore.texts.find((clip) => clip.text === text)) {
    return;
  }
  if (clipboardStore.texts.length >= 20) {
    removeClipboardText(
      clipboardStore.texts[clipboardStore.texts.length - 1].id
    );
  }
  const clipboardText: ClipboardText = {
    id: nanoid(),
    text: text.trim(),
  };
  clipboardStore.addText(clipboardText);
  addClipBoardDataInDB(clipboardText);
};

export const getClipboardText = async () => {
  const clipboardText = await readClipboardText();
  if (clipboardStore.texts[0]?.text === clipboardText) {
    return;
  }
  addClipboardData(clipboardText);
};

export const removeClipboardText = (id: string) => {
  clipboardStore.removeText(id);
  deleteClipBoardDataInDB(id);
};

export const readClipboardText = async () => {
  if (isElectron()) {
    return await window.electron.getClipboardText();
  } else {
    return await navigator.clipboard.readText();
  }
};

export const writeClipboardText = async (text: string) => {
  if (isElectron()) {
    await window.electron.setClipboardText(text);
  } else {
    await navigator.clipboard.writeText(text);
  }
};
