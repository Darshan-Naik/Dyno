import AddBoard from "./AddBoard";

type NoBoardsProps = {
  onAdd?: () => void;
};
const NoBoards = ({ onAdd }: NoBoardsProps) => {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-4">
      <p className="text-secondary-foreground text-sm font-light italic opacity-50">
        No boards here yet! Time to add some magic ✨
      </p>
      <AddBoard className="border" onClick={onAdd} />
    </div>
  );
};

export default NoBoards;
