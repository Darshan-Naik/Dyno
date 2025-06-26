import AddNote from "./AddNote";

type TNoNotes = {
  onAddNote: () => void;
};

const NoNotes = ({ onAddNote }: TNoNotes) => {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-4">
      <p className="text-secondary-foreground text-sm font-light italic opacity-50">
        No notes here yet! Time to add some magic ✨
      </p>
      <AddNote className="border" onClick={onAddNote} />
    </div>
  );
};

export default NoNotes;
