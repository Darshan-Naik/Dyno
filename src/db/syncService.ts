import { db as firestore } from "../configs/firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import { notesDB, tasksDB, quickNoteDB, clipboardDB } from "./db";
import { Note } from "../types/notes.types";
import { Task } from "../types/task.types";

class SyncService {
  private unsubscribeFunctions: (() => void)[] = [];
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  // Initialize sync for all collections
  async initializeSync() {
    await this.syncNotes();
    await this.syncTasks();
    await this.syncQuickNote();
    await this.syncClipboard();
  }

  // Sync Notes
  private async syncNotes() {
    const notesCollection = collection(firestore, `users/${this.userId}/notes`);

    // Listen for remote changes
    const q = query(notesCollection);
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const noteData = change.doc.data() as Note;

        if (change.type === "added" || change.type === "modified") {
          await notesDB.put(noteData);
        } else if (change.type === "removed") {
          await notesDB.delete(noteData.id);
        }
      });
    });

    this.unsubscribeFunctions.push(unsubscribe);

    // Listen for local changes
    notesDB.hook("creating", (primKey: string, obj) => {
      setDoc(doc(notesCollection, primKey), obj);
    });

    notesDB.hook("updating", (modifications, primKey: string, obj) => {
      setDoc(doc(notesCollection, primKey), { ...obj, ...modifications });
    });

    notesDB.hook("deleting", (primKey: string) => {
      deleteDoc(doc(notesCollection, primKey));
    });
  }

  // Sync Tasks
  private async syncTasks() {
    const tasksCollection = collection(firestore, `users/${this.userId}/tasks`);

    // Listen for remote changes
    const q = query(tasksCollection);
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const taskData = change.doc.data() as Task;

        if (change.type === "added" || change.type === "modified") {
          await tasksDB.put(taskData);
        } else if (change.type === "removed") {
          await tasksDB.delete(taskData.id);
        }
      });
    });

    this.unsubscribeFunctions.push(unsubscribe);

    // Listen for local changes
    tasksDB.hook("creating", (primKey: string, obj) => {
      setDoc(doc(tasksCollection, primKey), obj);
    });

    tasksDB.hook("updating", (modifications, primKey: string, obj) => {
      setDoc(doc(tasksCollection, primKey), { ...obj, ...modifications });
    });

    tasksDB.hook("deleting", (primKey: string) => {
      deleteDoc(doc(tasksCollection, primKey));
    });
  }

  // Sync Quick Note
  private async syncQuickNote() {
    const quickNoteCollection = collection(
      firestore,
      `users/${this.userId}/quickNote`
    );

    // Listen for remote changes
    const q = query(quickNoteCollection);
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const quickNoteData = change.doc.data() as any;

        if (change.type === "added" || change.type === "modified") {
          await quickNoteDB.put(quickNoteData, quickNoteData.id);
        } else if (change.type === "removed") {
          await quickNoteDB.delete(quickNoteData.id);
        }
      });
    });

    this.unsubscribeFunctions.push(unsubscribe);

    // Listen for local changes
    quickNoteDB.hook("creating", (primKey: string, obj) => {
      setDoc(doc(quickNoteCollection, primKey), obj);
    });

    quickNoteDB.hook("updating", (modifications, primKey: string, obj) => {
      setDoc(doc(quickNoteCollection, primKey), {
        ...obj,
        ...modifications,
      });
    });

    quickNoteDB.hook("deleting", (primKey: string) => {
      deleteDoc(doc(quickNoteCollection, primKey));
    });
  }

  // Sync Clipboard
  private async syncClipboard() {
    const clipboardCollection = collection(
      firestore,
      `users/${this.userId}/clipboard`
    );

    // Listen for remote changes
    const q = query(clipboardCollection);
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const clipboardData = change.doc.data() as any;

        if (change.type === "added" || change.type === "modified") {
          await clipboardDB.put(clipboardData);
        } else if (change.type === "removed") {
          await clipboardDB.delete(clipboardData.id);
        }
      });
    });

    this.unsubscribeFunctions.push(unsubscribe);

    // Listen for local changes
    clipboardDB.hook("creating", (primKey: string, obj) => {
      setDoc(doc(clipboardCollection, primKey), obj);
    });

    clipboardDB.hook("updating", (modifications, primKey: string, obj) => {
      setDoc(doc(clipboardCollection, primKey), {
        ...obj,
        ...modifications,
      });
    });

    clipboardDB.hook("deleting", async (primKey: string) => {
      await deleteDoc(doc(clipboardCollection, primKey));
    });
  }

  // Cleanup function to unsubscribe from all listeners
  cleanup() {
    this.unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    this.unsubscribeFunctions = [];
  }
}

// Export a function to create a new sync service instance with a user ID
export const createSyncService = (userId: string) => new SyncService(userId);
