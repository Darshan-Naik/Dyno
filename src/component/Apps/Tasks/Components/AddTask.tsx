import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { addNewTask } from "../store/task.action";
import useViewTransition from "../../../../hooks/useViewTransition";

type AddTaskProps = {
  className?: string;
  showLabel?: boolean;
};

const AddTask = ({ className, showLabel = true }: AddTaskProps) => {
  return (
    <button
      className={twMerge(
        "text-muted-foreground transition-colors hover:text-foreground text-xs flex gap-2 items-center bg-background rounded-sm py-1 px-2 cursor-pointer",
        className
      )}
      onClick={() => useViewTransition(addNewTask)}
    >
      <FaPlus />
      {showLabel && <span>Add Task</span>}
    </button>
  );
};

export default AddTask;
