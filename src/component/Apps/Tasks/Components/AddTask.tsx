import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { addNewTask } from "../store/task.action";

type AddTaskProps = {
  className?: string;
  showLabel?: boolean;
};

const AddTask = ({ className, showLabel = true }: AddTaskProps) => {
  return (
    <button
      className={twMerge(
        "text-secondary hover:text-primary text-xs flex gap-2 items-center bg-primary rounded py-1 px-2",
        className
      )}
      onClick={addNewTask}
    >
      <FaPlus />
      {showLabel && <span>Add Task</span>}
    </button>
  );
};

export default AddTask;
