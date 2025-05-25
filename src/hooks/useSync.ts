import { useEffect } from "react";
import { getSyncService } from "../db/syncService";

export const useSync = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    const syncService = getSyncService();
    syncService.setUserId(userId);

    // Then sync with cloud in background
    const syncWithCloud = async () => {
      try {
        await syncService.syncFromCloud();
      } catch (error) {
        console.error("Failed to sync with cloud:", error);
      }
    };
    syncWithCloud();
  }, [userId]);
};
