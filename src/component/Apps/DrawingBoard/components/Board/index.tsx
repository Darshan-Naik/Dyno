import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa6";
import { Toolbar } from "./Toolbar";
import { StyleToolbar } from "./StyleToolbar";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useDrawingTools } from "../../hooks/useDrawingTools";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { updateBoard } from "../../store/board.action";
import { Board } from "../../../../../types/drawingBoard.types";
import { boardStore } from "../../store/board.store";
import { Point } from "fabric";

type BoardProps = {
  handleBack: () => void;
  boardId: string;
};
const Board = ({ handleBack, boardId }: BoardProps) => {
  const [board, setBoard] = useState(boardStore.getBoard(boardId));
  const { editor, onReady } = useFabricJSEditor();
  const {
    currentTool,
    strokeColor,
    fillColor,
    strokeWidth,
    strokeStyle,
    setStrokeColor,
    setFillColor,
    setStrokeWidth,
    setStrokeStyle,
    handleToolChange,
    handleInsert,
  } = useDrawingTools(editor);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

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

  useEffect(() => {
    if (!editor?.canvas) return;
    if (board.data) {
      editor.canvas.loadFromJSON(board.data).then(() => {
        editor.canvas.renderAll();
        // Fit canvas content to available space
        const container = containerRef.current;
        if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const objects = editor.canvas.getObjects();

          if (objects.length > 0) {
            // Calculate the bounds of all objects
            const bounds = objects.reduce(
              (acc, obj) => {
                const objBounds = obj.getBoundingRect();
                return {
                  left: Math.min(acc.left, objBounds.left),
                  top: Math.min(acc.top, objBounds.top),
                  right: Math.max(acc.right, objBounds.left + objBounds.width),
                  bottom: Math.max(
                    acc.bottom,
                    objBounds.top + objBounds.height
                  ),
                };
              },
              {
                left: Infinity,
                top: Infinity,
                right: -Infinity,
                bottom: -Infinity,
              }
            );

            const contentWidth = bounds.right - bounds.left;
            const contentHeight = bounds.bottom - bounds.top;

            // Calculate scale to fit content
            const scaleX = (containerWidth - 40) / contentWidth; // 40px padding
            const scaleY = (containerHeight - 40) / contentHeight;
            const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1

            // Center the content
            editor.canvas.setViewportTransform([
              scale,
              0,
              0,
              scale,
              (containerWidth - contentWidth * scale) / 2,
              (containerHeight - contentHeight * scale) / 2,
            ]);
          }
        }
      });
    }
    // Save data to localStorage on changes
    const saveData = () => {
      const json = editor.canvas.toJSON();
      updateBoard(board.id, { data: JSON.stringify(json) });
    };

    // Listen for changes
    editor.canvas.on("object:added", saveData);
    editor.canvas.on("object:modified", saveData);
    editor.canvas.on("object:removed", saveData);
    editor.canvas.on("path:created", saveData);

    return () => {
      editor.canvas.off("object:added", saveData);
      editor.canvas.off("object:modified", saveData);
      editor.canvas.off("object:removed", saveData);
      editor.canvas.off("path:created", saveData);
    };
  }, [editor, boardId]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = updateBoard(board.id, { name: e.target.value });
    setBoard(updated);
  };

  const handleZoom = (delta: number) => {
    if (!editor?.canvas) return;
    const canvas = editor.canvas;
    const newZoom = Math.min(Math.max(zoom + delta, 0.1), 5);
    setZoom(newZoom);

    // Get center of canvas
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), newZoom);
    canvas.renderAll();
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2  backdrop-blur-sm w-fit rounded-md">
        <button
          onClick={handleBack}
          className="text-secondary hover:text-primary transition-colors"
        >
          <FaArrowLeft />
        </button>
        <input
          type="text"
          value={board.name}
          onChange={handleNameChange}
          className="bg-transparent px-2 py-1 text-sm w-fit min-w-28"
        />
      </div>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2  backdrop-blur-sm rounded-md py-1 px-2">
        <button
          onClick={() => handleZoom(-0.1)}
          className="text-secondary hover:text-primary transition-colors"
          title="Zoom Out"
        >
          <FaMinus className="size-4" />
        </button>
        <span className="text-sm text-secondary px-2">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => handleZoom(0.1)}
          className="text-secondary hover:text-primary transition-colors"
          title="Zoom In"
        >
          <FaPlus className="size-4" />
        </button>
      </div>
      <div className="p-2 h-full" onClick={handleInsert} ref={containerRef}>
        <Toolbar currentTool={currentTool} onToolChange={handleToolChange} />
        <StyleToolbar
          strokeColor={strokeColor}
          fillColor={fillColor}
          strokeWidth={strokeWidth}
          strokeStyle={strokeStyle}
          onStrokeColorChange={setStrokeColor}
          onFillColorChange={setFillColor}
          onStrokeWidthChange={setStrokeWidth}
          onStrokeStyleChange={setStrokeStyle}
        />
        <FabricJSCanvas
          className="w-full h-full overflow-auto"
          onReady={onReady}
        />
      </div>
    </div>
  );
};

export default observer(Board);
