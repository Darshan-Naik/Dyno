import { getFirstLineFromMarkdown } from "../../../../utils/string.utils";
import { Note } from "../../../../types/notes.types";
import { FaRegTrashCan } from "react-icons/fa6";
import { removeNote } from "../store/notes.action";
import { getRelativeTime } from "../../../../utils/datetime.utils";
import useViewTransition from "../../../../hooks/useViewTransition";
import { twMerge } from "tailwind-merge";

type NoteCardProps = {
  note: Note;
  onClick?: () => void;
};

const NoteCard = ({ note, onClick }: NoteCardProps) => {
  const text = getFirstLineFromMarkdown(note.value);
  return (
    <div
      onClick={onClick}
      style={{
        viewTransitionName: `note-animate-${note.id}`,
        contain: "layout",
      }}
      className="bg-card py-3 px-4 rounded-lg shadow-md mb-4 w-64 flex gap-2 items-center cursor-pointer border border-transparent hover:border-border transition-colors duration-300 box-border hover:shadow-xl"
    >
      <div className="flex-1">
        <p
          className={twMerge(
            "truncate max-w-48 text-sm",
            !text && "opacity-50 italic text-secondary-foreground"
          )}
        >
          {text || "Time to add some magic ✨"}
        </p>
        <p
          className="text-xs text-secondary-foreground font-extralight italic opacity-50 mt-2"
          title={`Added ${getRelativeTime(note.createdAt)}`}
        >
          {getRelativeTime(note.createdAt)}
        </p>
      </div>
      <div>
        <button
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            useViewTransition(() => removeNote(note.id));
          }}
          className="text-red-600 hover:text-red-400 transition-colors duration-300"
        >
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
