import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type AddNoteProps = {
  className?: string;
  showLabel?: boolean;
  onClick: () => void;
};

const AddNote = ({ className, showLabel = true, onClick }: AddNoteProps) => {
  return (
    <button
      className={twMerge(
        "cursor-pointer text-muted-foreground hover:text-foreground text-sm flex gap-2 items-center bg-background rounded-sm py-1 px-2",
        className
      )}
      onClick={onClick}
    >
      <FaPlus />
      {showLabel && <span>Add Note</span>}
    </button>
  );
};

export default AddNote;
