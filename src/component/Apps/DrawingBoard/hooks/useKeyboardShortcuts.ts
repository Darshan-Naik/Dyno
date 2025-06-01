import { useEffect } from "react";
import { FabricJSEditor } from "fabricjs-react";
import { IText } from "fabric";

export const useKeyboardShortcuts = (editor: FabricJSEditor) => {
  useEffect(() => {
    if (!editor?.canvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = editor.canvas;
      const activeObject = canvas.getActiveObject();

      // Only handle delete/backspace for non-text objects
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        (!activeObject ||
          !(activeObject instanceof IText) ||
          !activeObject.isEditing)
      ) {
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
          activeObjects.forEach((obj) => {
            canvas.remove(obj);
          });
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editor]);
};
