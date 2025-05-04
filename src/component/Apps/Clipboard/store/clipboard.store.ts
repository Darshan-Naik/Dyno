import { makeAutoObservable } from "mobx";

class ClipboardStore {
  constructor() {
    makeAutoObservable(this);
  }
  texts: string[] = [];

  setTexts(texts: string[]) {
    this.texts = texts;
  }

  addText(text: string) {
    if (this.texts.includes(text)) {
      return;
    }
    if (this.texts.length >= 20) {
      this.texts.pop();
    }
    this.texts.unshift(text);
  }

  removeText(index: number) {
    if (index >= 0 && index < this.texts.length) {
      this.texts.splice(index, 1);
    }
  }
}
export const clipboardStore = new ClipboardStore();
