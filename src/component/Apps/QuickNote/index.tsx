import { updateQuickNote } from "./store/quickNote.action";
import { observer } from "mobx-react-lite";
import { quickNoteStore } from "./store/quickNote.store";

import Note from "../../../component/Note";

const QuickNote = () => {
  function onChange(value) {
    updateQuickNote(value);
  }

  return <Note onChange={onChange} value={quickNoteStore.note} />;
};

export default observer(QuickNote);
