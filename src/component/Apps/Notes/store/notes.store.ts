import { makeAutoObservable } from "mobx";
import { Note } from "../../../../types/notes.types";

class NotesStore {
  constructor() {
    makeAutoObservable(this);
  }
  notes: Note[] = [];

  updateNotes(notes: Note[]) {
    this.notes = notes;
  }
  updateNote(value: string, id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      note.value = value;
    }
    return note;
  }
  createNote(note: Note) {
    this.notes.unshift(note);
  }
  removeNote(id: string) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
export const notesStore = new NotesStore();
