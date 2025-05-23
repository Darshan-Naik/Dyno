import { makeAutoObservable } from "mobx";
import { ClipboardText } from "../../../../types/clipboard.types";

class ClipboardStore {
  constructor() {
    makeAutoObservable(this);
  }
  texts: ClipboardText[] = [];

  setTexts(texts: ClipboardText[]) {
    this.texts = texts;
  }

  addText(text: ClipboardText) {
    this.texts.unshift(text);
  }
  removeText(id: string) {
    this.texts = this.texts.filter((text) => text.id !== id);
  }
}
export const clipboardStore = new ClipboardStore();
