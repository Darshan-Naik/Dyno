import { useEffect } from "react";
import { createSyncService } from "../db/syncService";

export const useSync = (userId: string) => {
  useEffect(() => {
    if (!userId) return;
    const syncService = createSyncService(userId);
    // Initialize sync service
    syncService.initializeSync().catch(console.error);

    // Cleanup on unmount
    return () => {
      syncService.cleanup();
    };
  }, [userId]);
};
