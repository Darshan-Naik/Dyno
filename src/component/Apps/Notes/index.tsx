import { observer } from "mobx-react-lite";
import { notesStore } from "./store/notes.store";
import NoteCard from "./Components/NoteCard";
import { useMemo, useState } from "react";
import Note from "../../../component/Note";
import { updateNote } from "./store/notes.action";
import NoNotes from "./Components/NoNotes";
import useViewTransition from "../../../hooks/useViewTransition";
import AddNote from "./Components/AddNote";

const Notes = () => {
  const [activeNoteId, setActiveNoteId] = useState<string>(null);

  const activeNote = useMemo(
    () => notesStore.notes.find((note) => note.id === activeNoteId),
    [activeNoteId]
  );

  const handleNoteChange = (value: string) => {
    if (!activeNote) return;
    updateNote(value, activeNote.id);
  };

  return (
    <div className="flex-1 overflow-hidden">
      {activeNoteId ? (
        <Note
          value={activeNote.value}
          onChange={handleNoteChange}
          onClose={() => setActiveNoteId(null)}
        />
      ) : (
        <div className="h-full overflow-hidden flex flex-col">
          <div className="flex w-full justify-end py-2 px-4">
            <AddNote />
          </div>
          {notesStore.notes.length ? (
            <div className="flex-1 overflow-hidden">
              <div className="max-h-full px-4 py-1 flex gap-2 flex-wrap overflow-y-auto items-start justify-start">
                {notesStore.notes.map((note) => (
                  <NoteCard
                    note={note}
                    key={note.id}
                    onClick={() =>
                      useViewTransition(() => setActiveNoteId(note.id))
                    }
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col gap-4 h-full">
              <NoNotes />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(Notes);
