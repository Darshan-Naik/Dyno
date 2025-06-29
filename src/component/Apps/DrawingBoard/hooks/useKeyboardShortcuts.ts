import { useEffect } from "react";
import { FabricJSEditor } from "fabricjs-react";
import { IText, ActiveSelection, FabricObject } from "fabric";

// In-memory storage for copied object
let copiedObject: FabricObject | FabricObject[] = null;

export const useKeyboardShortcuts = (editor: FabricJSEditor) => {
  useEffect(() => {
    if (!editor?.canvas) return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      const canvas = editor.canvas;
      const activeObjects = canvas.getActiveObjects();

      // Delete/Backspace
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        activeObjects.length > 0 &&
        !activeObjects.some(
          (obj) => obj instanceof IText && (obj as IText).isEditing
        )
      ) {
        activeObjects.forEach((obj) => {
          canvas.remove(obj);
        });
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }

      // Copy (Ctrl/Cmd + C)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        if (activeObjects.length > 0) {
          copiedObject = activeObjects;
        }
      }

      // Paste (Ctrl/Cmd + V)
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (copiedObject) {
          try {
            if (Array.isArray(copiedObject)) {
              // Handle multiple objects
              const clonedObjects = await Promise.all(
                copiedObject.map((obj) => obj.clone())
              );
              clonedObjects.forEach((obj) => {
                obj.set({
                  left: (obj.left || 0) + 20,
                  top: (obj.top || 0) + 20,
                });
                canvas.add(obj);
              });
              const selection = new ActiveSelection(clonedObjects, { canvas });
              canvas.setActiveObject(selection);
            } else {
              // Handle single object
              const obj = await copiedObject.clone();
              obj.set({
                left: (obj.left || 0) + 20,
                top: (obj.top || 0) + 20,
              });
              canvas.add(obj);
              canvas.setActiveObject(obj);
            }
            canvas.requestRenderAll();
          } catch (error) {
            console.error("Error pasting object:", error);
          }
        }
      }

      // Cut (Ctrl/Cmd + X)
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        if (activeObjects.length > 0) {
          copiedObject = activeObjects;
          activeObjects.forEach((obj) => {
            canvas.remove(obj);
          });
          canvas.discardActiveObject();
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
        activeObjects.length > 0 &&
        !activeObjects.some(
          (obj) => obj instanceof IText && (obj as IText).isEditing
        )
      ) {
        const moveAmount = e.shiftKey ? 10 : 1; // Move faster with shift key
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            activeObjects.forEach((obj) => {
              obj.set({
                left: obj.left - moveAmount,
              });
            });
            break;
          case "ArrowRight":
            e.preventDefault();
            activeObjects.forEach((obj) => {
              obj.set({
                left: obj.left + moveAmount,
              });
            });
            break;
          case "ArrowUp":
            e.preventDefault();
            activeObjects.forEach((obj) => {
              obj.set({
                top: obj.top - moveAmount,
              });
            });
            break;
          case "ArrowDown":
            e.preventDefault();
            activeObjects.forEach((obj) => {
              obj.set({
                top: obj.top + moveAmount,
              });
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
