import { ClipboardText } from "../../types/clipboard.types";
import { db as firestore } from "../../configs/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getSyncService } from "../syncService";
import { executeCloudOperation } from "../../utils/cloud.utils";

export const getClipBoardDataFromCloud = async () => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const clipboardCollection = collection(
      firestore,
      `users/${syncService.userId}/clipboard`
    );
    const q = query(clipboardCollection);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as ClipboardText);
  });
};

export const addClipBoardDataInCloud = async (clipboardText: ClipboardText) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const clipRef = doc(
      firestore,
      `users/${syncService.userId}/clipboard/${clipboardText.id}`
    );
    await setDoc(clipRef, clipboardText);
  });
};

export const deleteClipBoardDataInCloud = async (id: string) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const clipRef = doc(
      firestore,
      `users/${syncService.userId}/clipboard/${id}`
    );
    await deleteDoc(clipRef);
  });
};

export const setClipBoardDataInCloud = async (
  clipboardTexts: ClipboardText[]
) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const clipboardCollection = collection(
      firestore,
      `users/${syncService.userId}/clipboard`
    );
    // Delete all existing clips
    const snapshot = await getDocs(clipboardCollection);
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Add new clips with their original IDs
    const addPromises = clipboardTexts.map((clip) => {
      const clipRef = doc(
        firestore,
        `users/${syncService.userId}/clipboard/${clip.id}`
      );
      return setDoc(clipRef, clip);
    });
    await Promise.all(addPromises);
  });
};
