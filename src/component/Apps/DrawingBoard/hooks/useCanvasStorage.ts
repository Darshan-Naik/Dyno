import { useEffect } from "react";
import { FabricJSEditor } from "fabricjs-react";

const STORAGE_KEY = "drawing-board-data";

export const useCanvasStorage = (editor: FabricJSEditor) => {
  useEffect(() => {
    if (!editor?.canvas) return;

    // Load data from localStorage on mount
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      editor.canvas.loadFromJSON(savedData).then(() => {
        editor.canvas.renderAll();
      });
    }

    // Save data to localStorage on changes
    const saveToStorage = () => {
      const json = editor.canvas.toJSON();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
    };

    // Listen for changes
    editor.canvas.on("object:added", saveToStorage);
    editor.canvas.on("object:modified", saveToStorage);
    editor.canvas.on("object:removed", saveToStorage);
    editor.canvas.on("path:created", saveToStorage);

    return () => {
      editor.canvas.off("object:added", saveToStorage);
      editor.canvas.off("object:modified", saveToStorage);
      editor.canvas.off("object:removed", saveToStorage);
      editor.canvas.off("path:created", saveToStorage);
    };
  }, [editor]);
};
