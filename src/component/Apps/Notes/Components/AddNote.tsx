import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { createNote } from "../store/notes.action";
import useViewTransition from "../../../../hooks/useViewTransition";

type AddNoteProps = {
  className?: string;
  showLabel?: boolean;
};

const AddNote = ({ className, showLabel = true }: AddNoteProps) => {
  return (
    <button
      className={twMerge(
        "text-secondary hover:text-primary text-xs flex gap-2 items-center bg-primary rounded py-1 px-2",
        className
      )}
      onClick={() => useViewTransition(createNote)}
    >
      <FaPlus />
      {showLabel && <span>Add Note</span>}
    </button>
  );
};

export default AddNote;
