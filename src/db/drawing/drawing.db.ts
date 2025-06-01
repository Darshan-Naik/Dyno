import { Board } from "../../types/drawingBoard.types";
import { drawingDB } from "../db";

export const getBoardsFromDB = async () => {
  return await drawingDB.toArray();
};

export const addBoardInDB = async (board: Board) => {
  await drawingDB.add(board);
};

export const updateBoardInDB = async (board: Board) => {
  await drawingDB.update(board.id, board);
};

export const deleteBoardInDB = async (id: string) => {
  await drawingDB.delete(id);
};

export const setBoardsInDB = async (boards: Board[]) => {
  await drawingDB.clear();
  await drawingDB.bulkAdd(boards);
};
