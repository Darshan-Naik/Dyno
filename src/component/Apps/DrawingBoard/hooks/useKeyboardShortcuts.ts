import { useEffect } from "react";
import { FabricJSEditor } from "fabricjs-react";
import { IText, ActiveSelection, FabricObject } from "fabric";

// In-memory storage for copied object
let copiedObject: FabricObject = null;

export const useKeyboardShortcuts = (editor: FabricJSEditor) => {
  useEffect(() => {
    if (!editor?.canvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = editor.canvas;
      const activeObject = canvas.getActiveObject();

      // Delete/Backspace
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        (!activeObject ||
          !(activeObject instanceof IText) ||
          !(activeObject as IText).isEditing)
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

      // Copy (Ctrl/Cmd + C)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        if (activeObject) {
          copiedObject = activeObject;
        }
      }

      // Paste (Ctrl/Cmd + V)
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (copiedObject) {
          try {
            copiedObject.clone().then((obj) => {
              obj.set({
                left: (obj.left || 0) + 20,
                top: (obj.top || 0) + 20,
              });
              canvas.add(obj);
              canvas.setActiveObject(obj);
              canvas.requestRenderAll();
            });
          } catch (error) {
            console.error("Error pasting object:", error);
          }
        }
      }

      // Cut (Ctrl/Cmd + X)
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        if (activeObject) {
          copiedObject = activeObject;
          canvas.remove(activeObject);
          canvas.requestRenderAll();
        }
      }

      // Select All (Ctrl/Cmd + A)
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        const objects = canvas.getObjects();
        if (objects.length > 0) {
          canvas.discardActiveObject();
          const selection = new ActiveSelection(objects, { canvas });
          canvas.setActiveObject(selection);
          canvas.requestRenderAll();
        }
      }

      // Arrow key movement
      if (
        activeObject &&
        !(activeObject instanceof IText) &&
        !(activeObject as IText).isEditing
      ) {
        const moveAmount = e.shiftKey ? 10 : 1; // Move faster with shift key
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            activeObject.set({
              left: activeObject.left - moveAmount,
            });
            break;
          case "ArrowRight":
            e.preventDefault();
            activeObject.set({
              left: activeObject.left + moveAmount,
            });
            break;
          case "ArrowUp":
            e.preventDefault();
            activeObject.set({
              top: activeObject.top - moveAmount,
            });
            break;
          case "ArrowDown":
            e.preventDefault();
            activeObject.set({
              top: activeObject.top + moveAmount,
            });
            break;
        }
        canvas.requestRenderAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editor]);
};
