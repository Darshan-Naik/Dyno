import React, { useState } from "react";
import { BoardList } from "./components/BoardList";
import Board from "./components/Board";
import { boardStore } from "./store/board.store";
import { observer } from "mobx-react-lite";

const DrawingBoard = () => {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const handleBoardSelect = (boardId: string) => {
    setSelectedBoardId(boardId);
  };

  const handleBack = () => {
    setSelectedBoardId(null);
  };

  if (!selectedBoardId) {
    return (
      <BoardList boards={boardStore.boards} onBoardSelect={handleBoardSelect} />
    );
  }

  return <Board boardId={selectedBoardId} handleBack={handleBack} />;
};

export default observer(DrawingBoard);
