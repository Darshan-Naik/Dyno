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
        "text-secondary hover:text-primary text-xs flex gap-2 items-center bg-primary rounded-sm py-1 px-2",
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
