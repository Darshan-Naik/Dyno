import { db as firestore } from "../configs/firebase";
import { collection, doc, getDocs, query, getDoc } from "firebase/firestore";
import { Note } from "../types/notes.types";
import { Task } from "../types/task.types";
import { ClipboardText } from "../types/clipboard.types";
import { syncNote } from "../component/Apps/Notes/store/notes.action";
import { syncTask } from "../component/Apps/Tasks/store/task.action";
import { syncQuickNote } from "../component/Apps/QuickNote/store/quickNote.action";
import { syncClipboard } from "../component/Apps/Clipboard/store/clipboard.action";

class SyncService {
  private static instance: SyncService;
  private _userId = "";

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  setUserId(userId: string) {
    this._userId = userId;
  }

  get userId(): string {
    return this._userId;
  }

  // Sync from cloud to local on app open
  async syncFromCloud() {
    await this.syncNotesFromCloud();
    await this.syncTasksFromCloud();
    await this.syncQuickNoteFromCloud();
    await this.syncClipboardFromCloud();
  }

  // Sync Notes from cloud to local
  private async syncNotesFromCloud() {
    const notesCollection = collection(
      firestore,
      `users/${this._userId}/notes`
    );
    const q = query(notesCollection);
    const snapshot = await getDocs(q);
    const notes = snapshot.docs.map((doc) => doc.data() as Note);
    syncNote(notes);
  }

  // Sync Tasks from cloud to local
  private async syncTasksFromCloud() {
    const tasksCollection = collection(
      firestore,
      `users/${this._userId}/tasks`
    );
    const q = query(tasksCollection);
    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map((doc) => doc.data() as Task);
    syncTask(tasks);
  }

  // Sync Quick Note from cloud to local
  private async syncQuickNoteFromCloud() {
    const quickNoteCollection = collection(
      firestore,
      `users/${this._userId}/quickNote`
    );
    const docRef = doc(quickNoteCollection, "quickNote");
    const docSnap = await getDoc(docRef);
    const quickNote = docSnap.exists() ? docSnap.data() : null;
    if (quickNote) {
      syncQuickNote(quickNote as { text: string });
    }
  }

  // Sync Clipboard from cloud to local
  private async syncClipboardFromCloud() {
    const clipboardCollection = collection(
      firestore,
      `users/${this._userId}/clipboard`
    );
    const q = query(clipboardCollection);
    const snapshot = await getDocs(q);
    const clips = snapshot.docs.map((doc) => doc.data() as ClipboardText);
    syncClipboard(clips);
  }
}

// Export a function to get the singleton instance
export const getSyncService = () => SyncService.getInstance();
