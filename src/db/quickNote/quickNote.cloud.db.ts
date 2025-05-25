import { db as firestore } from "../../configs/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getSyncService } from "../syncService";

export const getQuickNoteFromCloud = async () => {
  const syncService = getSyncService();

  const quickNoteRef = doc(
    firestore,
    `users/${syncService.userId}/quickNote/quickNote`
  );
  const docSnap = await getDoc(quickNoteRef);
  return docSnap.exists() ? docSnap.data().text : "";
};

export const updateQuickNoteInCloud = async (note: string) => {
  const syncService = getSyncService();

  const quickNoteRef = doc(
    firestore,
    `users/${syncService.userId}/quickNote/quickNote`
  );
  await setDoc(quickNoteRef, {
    id: "quickNote",
    text: note,
  });
};
