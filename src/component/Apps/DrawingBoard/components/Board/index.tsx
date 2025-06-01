import { FaArrowLeft } from "react-icons/fa6";
import { Toolbar } from "./Toolbar";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useDrawingTools } from "../../hooks/useDrawingTools";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { updateBoard } from "../../store/board.action";
import { Board } from "../../../../../types/drawingBoard.types";
import { boardStore } from "../../store/board.store";

type BoardProps = {
  handleBack: () => void;
  boardId: string;
};
const Board = ({ handleBack, boardId }: BoardProps) => {
  const [board, setBoard] = useState(boardStore.getBoard(boardId));
  const { editor, onReady } = useFabricJSEditor();
  const { currentTool, handleToolChange, handleInsert } =
    useDrawingTools(editor);

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
  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
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
          className="bg-transparent px-2 py-1 text-sm"
        />
      </div>
      <div className="p-2 h-full" onClick={handleInsert}>
        <Toolbar currentTool={currentTool} onToolChange={handleToolChange} />
        <FabricJSCanvas
          className="w-full h-full overflow-auto"
          onReady={onReady}
        />
      </div>
    </div>
  );
};

export default observer(Board);
