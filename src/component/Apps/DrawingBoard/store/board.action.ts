import { boardStore } from "./board.store";
import {
  addBoardInDB,
  deleteBoardInDB,
  getBoardsFromDB,
  setBoardsInDB,
  updateBoardInDB,
} from "../../../../db/drawing/drawing.db";
import { nanoid } from "nanoid";
import { getCurrentTime } from "../../../../utils/datetime.utils";
import { debounce } from "../../../../utils/debounce.util";
import { Board } from "../../../../types/drawingBoard.types";
import {
  addBoardInCloud,
  deleteBoardInCloud,
  updateBoardInCloud,
} from "../../../../db/drawing/drawing.cloud.db";

const debouncedUpdateBoardInDB = debounce(updateBoardInDB);
const debouncedUpdateBoardInCloud = debounce(updateBoardInCloud);

export const fetchBoards = async () => {
  const boards = await getBoardsFromDB();
  boardStore.setBoards(boards);
};

export const updateBoard = (id: string, updates: Partial<Board>) => {
  const board = boardStore.updateBoard(id, {
    ...updates,
    lastUpdated: getCurrentTime(),
  });
  if (board) {
    debouncedUpdateBoardInDB(board);
    debouncedUpdateBoardInCloud(board);
  }
  return board;
};

export const createBoard = (name = "Untitled Board") => {
  const board: Board = {
    id: nanoid(),
    name,
    createdAt: getCurrentTime(),
  };
  boardStore.createBoard(board);
  addBoardInDB(board);
  addBoardInCloud(board);
  return board;
};

export const removeBoard = (id: string) => {
  boardStore.removeBoard(id);
  deleteBoardInDB(id);
  deleteBoardInCloud(id);
};

// Sync specific actions
export const syncBoards = (boards: Board[]) => {
  boardStore.setBoards(boards);
  setBoardsInDB(boards);
};
