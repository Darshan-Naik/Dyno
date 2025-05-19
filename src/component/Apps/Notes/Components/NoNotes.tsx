import AddNote from "./AddNote";

const NoNotes = () => {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-4">
      <p className="text-secondary text-sm font-light italic opacity-50">
        No notes here yet! Time to add some magic ✨
      </p>
      <AddNote className="border" />
    </div>
  );
};

export default NoNotes;
