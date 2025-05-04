export function debounce<T extends (...args) => ReturnType<T>>(
  func: T,
  wait = 500
): (...args: Parameters<T>) => ReturnType<T> | void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>): ReturnType<T> | void {
    const later = () => {
      timeout = null;
      return func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}
