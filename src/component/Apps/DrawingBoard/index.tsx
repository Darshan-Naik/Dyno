import React, { useState, useEffect } from "react";
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react";
import { Circle, IText, Polyline, Rect, PencilBrush, Line } from "fabric";
import { twMerge } from "tailwind-merge";
import {
  FaArrowPointer,
  FaPencil,
  FaRegSquare,
  FaRegCircle,
  FaArrowRight,
  FaFont,
  FaMinus,
  FaHand,
} from "react-icons/fa6";

// Constants
const DRAWING_COLOR = "#ffffffcf";
const STROKE_WIDTH = 2;
const DEFAULT_FONT_SIZE = 14;
const STORAGE_KEY = "drawing-board-data";

// Custom hook for localStorage persistence
const useCanvasStorage = (editor: FabricJSEditor) => {
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

// Types
interface DrawingObject {
  left: number;
  top: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeUniform: boolean;
  hasControls: boolean;
  hasBorders: boolean;
  width?: number;
  height?: number;
  radius?: number;
}

const DrawingBoard = () => {
  const { editor, onReady } = useFabricJSEditor();
  const [currentTool, setCurrentTool] = useState<string>("select");

  // Use the storage hook
  useCanvasStorage(editor);

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
      });
    });
    return end;
  }, [editor]);

  // Drawing tools
  const createDrawingObject = (options: Partial<DrawingObject>) => ({
    fill: "transparent",
    stroke: DRAWING_COLOR,
    strokeWidth: STROKE_WIDTH,
    strokeUniform: true,
    hasControls: true,
    hasBorders: true,
    ...options,
  });

  const getCanvasPoint = (e: React.MouseEvent) => {
    if (!editor?.canvas) return { x: 100, y: 100 };
    const canvasEl = editor.canvas.getElement();
    const rect = canvasEl.getBoundingClientRect();
    const vpt = editor.canvas.viewportTransform;
    if (!vpt) return { x: 100, y: 100 };

    // Get the point relative to canvas element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Transform the point using viewport transform
    const transformedX = (x - vpt[4]) / vpt[0];
    const transformedY = (y - vpt[5]) / vpt[3];

    return {
      x: transformedX,
      y: transformedY,
    };
  };

  const addRectangle = (e: React.MouseEvent) => {
    if (!editor?.canvas) return;
    const point = getCanvasPoint(e);
    const rect = new Rect(
      createDrawingObject({
        left: point.x,
        top: point.y,
        width: 100,
        height: 100,
      })
    );
    editor.canvas.add(rect);
    editor.canvas.setActiveObject(rect);
    setCurrentTool("select");
    disableFreeDraw();
  };

  const addCircle = (e: React.MouseEvent) => {
    if (!editor?.canvas) return;
    const point = getCanvasPoint(e);
    const circle = new Circle(
      createDrawingObject({
        left: point.x,
        top: point.y,
        radius: 50,
      })
    );
    editor.canvas.add(circle);
    editor.canvas.setActiveObject(circle);
    setCurrentTool("select");
  };

  const addArrow = (e: React.MouseEvent) => {
    if (!editor?.canvas) return;
    const point = getCanvasPoint(e);
    const points = [
      { x: point.x, y: point.y },
      { x: point.x + 100, y: point.y },
      { x: point.x + 90, y: point.y - 10 },
      { x: point.x + 100, y: point.y },
      { x: point.x + 90, y: point.y + 10 },
    ];
    const arrow = new Polyline(
      points,
      createDrawingObject({
        left: point.x,
        top: point.y,
      })
    );

    // Set arrow constraints
    arrow.set({
      lockScalingY: true,
      lockUniScaling: true,
    });

    // Customize controls to only show horizontal resize and rotation
    arrow.setControlsVisibility({
      mt: false,
      mb: false,
      ml: true,
      mr: true,
      bl: false,
      br: false,
      tl: false,
      tr: false,
      mtr: true,
    });

    editor.canvas.add(arrow);
    editor.canvas.setActiveObject(arrow);
    setCurrentTool("select");
  };

  const addText = (e: React.MouseEvent) => {
    if (!editor?.canvas) return;
    const point = getCanvasPoint(e);
    const text = new IText("", {
      left: point.x,
      top: point.y,
      fontSize: DEFAULT_FONT_SIZE,
      fill: DRAWING_COLOR,
      strokeUniform: true,
      lineHeight: 1.5,
      charSpacing: 100,
      fontFamily: "Arial",
      textAlign: "left",
      splitByGrapheme: true,
    });

    editor.canvas.add(text);
    editor.canvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();
    setCurrentTool("select");
  };

  const addLine = (e: React.MouseEvent) => {
    if (!editor?.canvas) return;
    const point = getCanvasPoint(e);
    const line = new Line(
      [point.x, point.y, point.x + 100, point.y],
      createDrawingObject({
        left: point.x,
        top: point.y,
      })
    );

    // Set line constraints
    line.set({
      lockScalingY: true,
      lockUniScaling: true,
    });

    // Customize controls to only show horizontal resize
    line.setControlsVisibility({
      mt: false,
      mb: false,
      ml: true,
      mr: true,
      bl: false,
      br: false,
      tl: false,
      tr: false,
    });

    editor.canvas.add(line);
    editor.canvas.setActiveObject(line);
    setCurrentTool("select");
  };

  // Drawing mode handlers
  const enableFreeDraw = () => {
    if (!editor?.canvas) return;
    const brush = new PencilBrush(editor.canvas);
    brush.width = STROKE_WIDTH;
    brush.color = DRAWING_COLOR;
    editor.canvas.freeDrawingBrush = brush;
    editor.canvas.isDrawingMode = true;
    editor.canvas.selection = false;
    editor.canvas.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });
  };

  const disableFreeDraw = () => {
    if (!editor?.canvas) return;
    editor.canvas.isDrawingMode = false;
    editor.canvas.selection = true;
    editor.canvas.forEachObject((obj) => {
      obj.selectable = true;
      obj.evented = true;
    });
  };

  const enableMoveMode = () => {
    if (!editor?.canvas) return;
    editor.canvas.selection = false;
    editor.canvas.setCursor("grab");
    editor.canvas.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
      obj.hasControls = false;
      obj.hasBorders = false;
    });
    editor.canvas.renderAll();
  };

  const disableMoveMode = () => {
    if (!editor?.canvas) return;
    editor.canvas.selection = true;
    editor.canvas.forEachObject((obj) => {
      obj.selectable = true;
      obj.evented = true;
      obj.hasControls = true;
      obj.hasBorders = true;
    });
  };

  const handleKeyDown = (e) => {
    if (!editor?.canvas) return;
    const canvas = editor.canvas;

    // Only handle delete/backspace for non-text objects
    const activeObject = canvas.getActiveObject();
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

  useEffect(() => {
    // Add keyboard event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

  const handleToolChange = (tool: string) => {
    setCurrentTool(tool);
    if (tool === "draw") {
      enableFreeDraw();
      disableMoveMode();
    } else if (tool === "move") {
      enableMoveMode();
      disableFreeDraw();
    } else {
      disableFreeDraw();
      disableMoveMode();
    }
    if (tool === "select") {
      editor.canvas.selection = true;
    } else {
      editor.canvas.selection = false;
    }
  };

  const handleInsert = (e: React.MouseEvent) => {
    switch (currentTool) {
      case "rectangle":
        addRectangle(e);
        break;
      case "circle":
        addCircle(e);
        break;
      case "line":
        addLine(e);
        break;
      case "arrow":
        addArrow(e);
        break;
      case "text":
        addText(e);
        break;
    }
  };

  useEffect(() => {
    if (!editor?.canvas) return;

    // Add mouse event listeners for move tool
    const downDisposer = editor.canvas.on("mouse:down", (opt) => {
      if (currentTool === "move" && opt.e instanceof MouseEvent) {
        editor.canvas.defaultCursor = "grabbing";
        const canvas = editor.canvas as any;
        canvas.lastPosX = opt.e.clientX;
        canvas.lastPosY = opt.e.clientY;
      }
    });

    const moveDisposer = editor.canvas.on("mouse:move", (opt) => {
      if (
        currentTool === "move" &&
        opt.e instanceof MouseEvent &&
        opt.e.buttons === 1
      ) {
        const vpt = editor.canvas.viewportTransform;
        if (!vpt) return;

        const canvas = editor.canvas as any;
        vpt[4] += opt.e.clientX - canvas.lastPosX;
        vpt[5] += opt.e.clientY - canvas.lastPosY;
        editor.canvas.requestRenderAll();
        canvas.lastPosX = opt.e.clientX;
        canvas.lastPosY = opt.e.clientY;
      }
    });

    const upDisposer = editor.canvas.on("mouse:up", () => {
      if (currentTool === "move") {
        editor.canvas.defaultCursor = "grab";
      }
    });
    return () => {
      downDisposer();
      moveDisposer();
      upDisposer();
    };
  }, [editor, currentTool]);

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
      <div
        className="absolute flex gap-2 p-2 bg-secondary rounded-lg top-4 left-1/2 -translate-x-1/2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "move" && "text-blue-500"
          )}
          onClick={() => handleToolChange("move")}
          title="Move Canvas"
        >
          <FaHand className="w-5 h-5" />
        </button>
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "select" && "text-blue-500"
          )}
          onClick={() => handleToolChange("select")}
          title="Select"
        >
          <FaArrowPointer className="w-5 h-5" />
        </button>
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "draw" && "text-blue-500"
          )}
          onClick={() => handleToolChange("draw")}
          title="Draw"
        >
          <FaPencil className="w-5 h-5" />
        </button>
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "rectangle" && "text-blue-500"
          )}
          onClick={() => handleToolChange("rectangle")}
          title="Rectangle"
        >
          <FaRegSquare className="w-5 h-5" />
        </button>
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "circle" && "text-blue-500"
          )}
          onClick={() => handleToolChange("circle")}
          title="Circle"
        >
          <FaRegCircle className="w-5 h-5" />
        </button>
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "line" && "text-blue-500"
          )}
          onClick={() => handleToolChange("line")}
          title="Line"
        >
          <FaMinus className="w-5 h-5" />
        </button>
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "arrow" && "text-blue-500"
          )}
          onClick={() => handleToolChange("arrow")}
          title="Arrow"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>
        <button
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === "text" && "text-blue-500"
          )}
          onClick={() => handleToolChange("text")}
          title="Text"
        >
          <FaFont className="w-5 h-5" />
        </button>
      </div>
      <FabricJSCanvas
        className="w-full h-full overflow-auto"
        onReady={onReady}
      />
    </div>
  );
};

export default DrawingBoard;
