import { observer } from "mobx-react-lite";
import AddTask from "./Components/AddTask";
import { taskStore } from "./store/task.store";
import Task from "./Components/Task";

const Tasks = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex w-full justify-end py-2 px-4">
        <AddTask />
      </div>
      {!taskStore.tasks?.length ? (
        <div className="flex-1 flex justify-center items-center flex-col gap-4">
          <p className="text-secondary text-sm">
            No tasks here yet! Time to add some magic ✨
          </p>
          <AddTask className="border" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-2 flex-1 overflow-y-auto">
          {taskStore.tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(Tasks);
