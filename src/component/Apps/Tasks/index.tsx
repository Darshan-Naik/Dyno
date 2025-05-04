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
      <div className="flex flex-col gap-2 px-2 flex-1 overflow-y-auto styled-scrollbar">
        {taskStore.tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default observer(Tasks);
