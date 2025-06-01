import React, { useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Toolbar } from "./components/Toolbar";
import { useCanvasStorage } from "./hooks/useCanvasStorage";
import { useDrawingTools } from "./hooks/useDrawingTools";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

const DrawingBoard = () => {
  const { editor, onReady } = useFabricJSEditor();
  const { currentTool, handleToolChange, handleInsert } =
    useDrawingTools(editor);

  // Initialize hooks
  useCanvasStorage(editor);
  useKeyboardShortcuts(editor);

  // Set up object styling
  useEffect(() => {
    if (!editor?.canvas) return;
    const end = editor.canvas.on("object:added", (e) => {
      const obj = e.target;
      obj.set({
        borderColor: "#60a5fa",
        borderScaleFactor: 1,
        borderDashArray: [5, 5],
        transparentCorners: false,
        cornerColor: "#60a5fa",
        cornerSize: 8,
        cornerStyle: "circle",
        padding: 8,
        hasControls: currentTool !== "move",
        hasBorders: currentTool !== "move",
      });
    });
    return end;
  }, [editor, currentTool]);

  return (
    <div className="flex-1 relative overflow-hidden p-2" onClick={handleInsert}>
      <Toolbar currentTool={currentTool} onToolChange={handleToolChange} />
      <FabricJSCanvas
        className="w-full h-full overflow-auto"
        onReady={onReady}
      />
    </div>
  );
};

export default DrawingBoard;
