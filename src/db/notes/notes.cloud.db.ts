import { Note } from "../../types/notes.types";
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
import { executeCloudOperation } from "../../utils/cloud.utils";

export const getNotesFromCloud = async () => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const notesCollection = collection(
      firestore,
      `users/${syncService.userId}/notes`
    );
    const q = query(notesCollection);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Note);
  });
};

export const addNoteInCloud = async (note: Note) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const noteRef = doc(
      firestore,
      `users/${syncService.userId}/notes/${note.id}`
    );
    await setDoc(noteRef, note);
  });
};

export const updateNoteInCloud = async (note: Note) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const noteRef = doc(
      firestore,
      `users/${syncService.userId}/notes/${note.id}`
    );
    await updateDoc(noteRef, note);
  });
};

export const deleteNoteInCloud = async (id: string) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const noteRef = doc(firestore, `users/${syncService.userId}/notes/${id}`);
    await deleteDoc(noteRef);
  });
};

export const setNotesInCloud = async (notes: Note[]) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const notesCollection = collection(
      firestore,
      `users/${syncService.userId}/notes`
    );
    // Delete all existing notes
    const snapshot = await getDocs(notesCollection);
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Add new notes with their original IDs
    const addPromises = notes.map((note) => {
      const noteRef = doc(
        firestore,
        `users/${syncService.userId}/notes/${note.id}`
      );
      return setDoc(noteRef, note);
    });
    await Promise.all(addPromises);
  });
};
