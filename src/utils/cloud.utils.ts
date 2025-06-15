import { getSyncService } from "../db/syncService";

/**
 * Executes a cloud operation only if the user is authenticated
 * @param operation The cloud operation to execute
 * @returns The result of the operation or undefined if not authenticated
 */
export const executeCloudOperation = async <T>(
  operation: () => Promise<T>
): Promise<T | undefined> => {
  const syncService = getSyncService();
  if (!syncService.userId) {
    return undefined;
  }
  return operation();
};
