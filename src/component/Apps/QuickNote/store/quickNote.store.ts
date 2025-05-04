import { makeAutoObservable } from "mobx";

class QuickNoteStore {
  constructor() {
    makeAutoObservable(this);
  }
  note = "";

  updateNote(note: string) {
    this.note = note;
  }
}
export const quickNoteStore = new QuickNoteStore();
