import { makeAutoObservable } from "mobx";
import { Board } from "../../../../types/drawingBoard.types";

class BoardStore {
  constructor() {
    makeAutoObservable(this);
  }
  boards: Board[] = [];

  setBoards(boards: Board[]) {
    this.boards = boards;
  }

  updateBoard(id: string, updates: Partial<Board>) {
    const board = this.boards.find((board) => board.id === id);
    const newBoard = { ...board, ...updates };
    this.boards = this.boards.map((board) =>
      board.id === id ? newBoard : board
    );
    return newBoard;
  }

  createBoard(board: Board) {
    this.boards.unshift(board);
  }

  removeBoard(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
  getBoard(id: string) {
    return this.boards.find((board) => board.id === id);
  }
}

export const boardStore = new BoardStore();
