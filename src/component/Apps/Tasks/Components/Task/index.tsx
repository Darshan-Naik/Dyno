import { twMerge } from "tailwind-merge";
import { completeTask, deleteTask, updateTask } from "../../store/task.action";
import {
  FaCheck,
  FaRegClock,
  FaRegTrashCan,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { Task } from "../../../../../types/task.types";
import { getRelativeTime } from "../../../../../utils/datetime.utils";
import useViewTransition from "../../../../../hooks/useViewTransition";

type TaskProps = {
  task: Task;
};

const Task = ({ task }: TaskProps) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedTask = {
      ...task,
      [id]: value,
    };
    updateTask(updatedTask);
  };

  return (
    <div
      className="bg-card py-2 px-4 text-foreground rounded-sm flex gap-4 border border-transparent hover:border-border focus-within:border-border transition-colors"
      style={{
        viewTransitionName: `task-animate-${task.id}`,
        contain: "layout",
      }}
    >
      <div className="mt-0.5">
        {task.completed ? (
          <FaCheck className="text-green-500" />
        ) : (
          <FaRegClock className="text-orange-500" />
        )}
      </div>
      <div className={twMerge("flex-1", task.completed && "opacity-50")}>
        <textarea
          rows={1}
          placeholder="Title"
          autoFocus={!task.title}
          className={twMerge(
            "text-sm focus:outline-hidden bg-transparent w-full resize-none overflow-hidden placeholder:opacity-25 placeholder:italic",
            task.completed && "line-through"
          )}
          id="title"
          onChange={handleChange}
          defaultValue={task.title}
          readOnly={task.completed}
        />
        <textarea
          rows={1}
          placeholder="Description"
          className={twMerge(
            "text-muted-foreground text-xs focus:outline-hidden bg-transparent w-full resize-none overflow-hidden placeholder:opacity-25 placeholder:italic"
          )}
          readOnly={task.completed}
          id="description"
          onChange={handleChange}
          defaultValue={task.description}
        />
      </div>
      <div className="flex flex-col gap-2 h-full justify-between items-end">
        <div className="flex gap-3 text-sm p-1">
          {!task.completed && (
            <button
              title="Mark as complete"
              onClick={() => useViewTransition(() => completeTask(task))}
              className="text-green-600 hover:text-green-400 transition-colors duration-300"
            >
              <FaRegCircleCheck />
            </button>
          )}
          <button
            title="Delete"
            onClick={() => useViewTransition(() => deleteTask(task.id))}
            className="text-red-600 hover:text-red-400 transition-colors duration-300"
          >
            <FaRegTrashCan />
          </button>
        </div>
        {task.createdAt && (
          <p
            className="text-xs text-secondary-foreground font-extralight italic opacity-50"
            title={`Added ${getRelativeTime(task.createdAt)}`}
          >
            {getRelativeTime(task.createdAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Task;
