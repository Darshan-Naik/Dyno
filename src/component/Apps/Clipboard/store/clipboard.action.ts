import { clipboardStore } from "./clipboard.store";
import { debounce } from "../../../../utils/debounce.util";

import { toJS } from "mobx";
import {
  getClipBoardData,
  setClipBoardData,
} from "../../../../db/clipboard/clipboard.db";

const debouncedSetClipBoardData = debounce(setClipBoardData);

export const fetchClipboardData = async () => {
  const texts = await getClipBoardData();
  clipboardStore.setTexts(texts);
};

export const updateClipboardData = (text: string) => {
  clipboardStore.addText(text.trim());
  debouncedSetClipBoardData(toJS(clipboardStore.texts));
};

export const getClipboardText = async () => {
  const clipboardText = await window.electron.getClipboardText();
  if (clipboardStore.texts[0] === clipboardText) {
    return;
  }
  updateClipboardData(clipboardText);
};

export const removeClipboardText = (index: number) => {
  clipboardStore.removeText(index);
  debouncedSetClipBoardData(toJS(clipboardStore.texts));
};
