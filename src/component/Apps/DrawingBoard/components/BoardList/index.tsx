import BoardCard from "./BoardCard";
import AddBoard from "./AddBoard";
import NoBoards from "./NoBoards";
import { Board } from "../../../../../types/drawingBoard.types";
import { createBoard, removeBoard } from "../../store/board.action";

type BoardListProps = {
  boards: Board[];
  onBoardSelect: (boardId: string) => void;
};

export const BoardList = ({ boards, onBoardSelect }: BoardListProps) => {
  const handleDeleteClick = (boardId: string) => {
    removeBoard(boardId);
  };

  const handleCreateNew = () => {
    const newBoard = createBoard();
    onBoardSelect(newBoard.id);
  };

  return (
    <div className="h-full overflow-hidden flex flex-col flex-1">
      <div className="flex w-full justify-end py-2 px-4">
        <AddBoard onClick={handleCreateNew} />
      </div>
      {boards.length ? (
        <div className="flex-1 overflow-hidden">
          <div className="max-h-full px-4 py-1 flex gap-2 flex-wrap overflow-y-auto items-start justify-start">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                handleDeleteClick={handleDeleteClick}
                onClick={onBoardSelect}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-4 h-full">
          <NoBoards onAdd={handleCreateNew} />
        </div>
      )}
    </div>
  );
};
