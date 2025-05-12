import { updateQuickNote } from "./store/quickNote.action";
import { observer } from "mobx-react-lite";
import { quickNoteStore } from "./store/quickNote.store";

import Note from "../../../component/Note";
import { createNote } from "../Notes/store/notes.action";
import { notesStore } from "../Notes/store/notes.store";

const QuickNote = () => {
  const onChange = (value) => {
    updateQuickNote(value);
  };
  const onSave = () => {
    if (
      !quickNoteStore.note ||
      notesStore.notes.some((note) => note.value === quickNoteStore.note)
    )
      return;
    createNote(quickNoteStore.note);
    updateQuickNote("");
  };

  return (
    <Note onChange={onChange} value={quickNoteStore.note} onSave={onSave} />
  );
};

export default observer(QuickNote);
