import AddTask from "./AddTask";

const NoTasks = () => {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-4">
      <p className="text-secondary text-sm font-light italic">
        No tasks here yet! Time to add some magic ✨
      </p>
      <AddTask className="border" />
    </div>
  );
};

export default NoTasks;
