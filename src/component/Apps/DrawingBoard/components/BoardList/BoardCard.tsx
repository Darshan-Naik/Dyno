import { FaRegTrashCan } from "react-icons/fa6";
import { getRelativeTime } from "../../../../../utils/datetime.utils";
import useViewTransition from "../../../../../hooks/useViewTransition";
import { Board } from "../../../../../types/drawingBoard.types";

type BoardCardProps = {
  onClick?: (id: string) => void;
  handleDeleteClick?: (id: string) => void;
  board: Board;
};

const BoardCard = ({ onClick, handleDeleteClick, board }: BoardCardProps) => {
  return (
    <div
      onClick={() => onClick(board.id)}
      style={{
        viewTransitionName: `board-animate-${board.id}`,
        contain: "layout",
      }}
      className="bg-secondary py-3 px-4 rounded-lg shadow-md mb-4 w-64 flex flex-col gap-2 cursor-pointer hover:border border-gray-700 transition-colors duration-300 box-border hover:shadow-xl"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="truncate max-w-48 text-sm">{board.name}</p>
          <p className="text-xs text-secondary font-extralight italic opacity-50 mt-2">
            {getRelativeTime(board.lastUpdated || board.createdAt)}
          </p>
        </div>
        <div>
          <button
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              useViewTransition(() => handleDeleteClick(board.id));
            }}
            className="text-red-600 hover:text-red-400 transition-colors duration-300"
          >
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
