import { useEffect } from "react";
import { getSyncService } from "../db/syncService";

export const useSync = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    const syncService = getSyncService();
    syncService.setUserId(userId);

    // Function to sync with cloud
    const syncWithCloud = async () => {
      try {
        await syncService.syncFromCloud();
      } catch (error) {
        console.error("Failed to sync with cloud:", error);
      }
    };

    // Initial sync
    syncWithCloud();

    // Add visibility change event listener
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncWithCloud();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId]);
};
