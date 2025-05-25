import { useEffect } from "react";
import { getSyncService } from "../db/syncService";
import { debounce } from "../utils/debounce.util";

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

    // Create debounced version of sync
    const debouncedSync = debounce(syncWithCloud, 1000); // 1 second debounce

    // Initial sync
    syncWithCloud();

    // Add event listeners
    document.addEventListener("visibilitychange", debouncedSync);
    window.addEventListener("focus", debouncedSync);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", debouncedSync);
      window.removeEventListener("focus", debouncedSync);
    };
  }, [userId]);
};
