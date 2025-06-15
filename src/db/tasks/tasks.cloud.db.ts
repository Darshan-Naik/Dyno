import { Task } from "../../types/task.types";
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

export const getTasksFromCloud = async () => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const tasksCollection = collection(
      firestore,
      `users/${syncService.userId}/tasks`
    );
    const q = query(tasksCollection);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Task);
  });
};

export const addTaskInCloud = async (task: Task) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const taskRef = doc(
      firestore,
      `users/${syncService.userId}/tasks/${task.id}`
    );
    await setDoc(taskRef, task);
  });
};

export const updateTaskInCloud = async (task: Task) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const taskRef = doc(
      firestore,
      `users/${syncService.userId}/tasks/${task.id}`
    );
    await updateDoc(taskRef, task);
  });
};

export const deleteTaskInCloud = async (taskId: string) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const taskRef = doc(
      firestore,
      `users/${syncService.userId}/tasks/${taskId}`
    );
    await deleteDoc(taskRef);
  });
};

export const setTasksInCloud = async (tasks: Task[]) => {
  return executeCloudOperation(async () => {
    const syncService = getSyncService();
    const tasksCollection = collection(
      firestore,
      `users/${syncService.userId}/tasks`
    );
    // Delete all existing tasks
    const snapshot = await getDocs(tasksCollection);
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Add new tasks with their original IDs
    const addPromises = tasks.map((task) => {
      const taskRef = doc(
        firestore,
        `users/${syncService.userId}/tasks/${task.id}`
      );
      return setDoc(taskRef, task);
    });
    await Promise.all(addPromises);
  });
};
