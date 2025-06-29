import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import useViewTransition from "../../../../../hooks/useViewTransition";

type AddBoardProps = {
  className?: string;
  showLabel?: boolean;
  onClick?: () => void;
};

const AddBoard = ({ className, showLabel = true, onClick }: AddBoardProps) => {
  return (
    <button
      className={twMerge(
        "text-muted-foreground transition-colors cursor-pointer hover:text-foreground text-sm flex gap-2 items-center bg-background rounded-sm py-1 px-2",
        className
      )}
      onClick={() => useViewTransition(onClick)}
    >
      <FaPlus />
      {showLabel && <span>Add Board</span>}
    </button>
  );
};

export default AddBoard;
