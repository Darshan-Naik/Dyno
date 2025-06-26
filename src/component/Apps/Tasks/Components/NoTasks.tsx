import AddTask from "./AddTask";

const NoTasks = () => {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-4">
      <p className="text-secondary-foreground text-sm font-light italic opacity-50">
        No tasks here yet! Time to add some magic ✨
      </p>
      <AddTask className="border" />
    </div>
  );
};

export default NoTasks;
