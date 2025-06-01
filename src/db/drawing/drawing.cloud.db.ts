import { Board } from "../../types/drawingBoard.types";
import { db as firestore } from "../../configs/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getSyncService } from "../syncService";

export const getBoardsFromCloud = async () => {
  const syncService = getSyncService();
  const boardsCollection = collection(
    firestore,
    `users/${syncService.userId}/drawing_boards`
  );
  const q = query(boardsCollection);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Board);
};

export const addBoardInCloud = async (board: Board) => {
  const syncService = getSyncService();
  const boardRef = doc(
    firestore,
    `users/${syncService.userId}/drawing_boards/${board.id}`
  );
  await setDoc(boardRef, board);
};

export const updateBoardInCloud = async (board: Board) => {
  const syncService = getSyncService();
  const boardRef = doc(
    firestore,
    `users/${syncService.userId}/drawing_boards/${board.id}`
  );
  await updateDoc(boardRef, { ...board });
};

export const deleteBoardInCloud = async (id: string) => {
  const syncService = getSyncService();
  const boardRef = doc(
    firestore,
    `users/${syncService.userId}/drawing_boards/${id}`
  );
  await deleteDoc(boardRef);
};

export const setBoardsInCloud = async (boards: Board[]) => {
  const syncService = getSyncService();
  const boardsCollection = collection(
    firestore,
    `users/${syncService.userId}/drawing_boards`
  );
  // Delete all existing boards
  const snapshot = await getDocs(boardsCollection);
  const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);

  // Add new boards with their original IDs
  const addPromises = boards.map((board) => {
    const boardRef = doc(
      firestore,
      `users/${syncService.userId}/drawing_boards/${board.id}`
    );
    return setDoc(boardRef, board);
  });
  await Promise.all(addPromises);
};
