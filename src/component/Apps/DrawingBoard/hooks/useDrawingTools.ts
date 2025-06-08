import { useState, useEffect } from "react";
import { FabricJSEditor } from "fabricjs-react";
import { Circle, IText, Polyline, Rect, PencilBrush, Line } from "fabric";
import { useCanvasMove } from "./useCanvasMove";

// Constants
const DEFAULT_STROKE_COLOR = "rgba(255, 255, 255, 0.8)";
const DEFAULT_FILL_COLOR = "transparent";
const DEFAULT_STROKE_WIDTH = 4;
const DEFAULT_FONT_SIZE = 14;

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
  strokeDashArray?: number[];
}

export const useDrawingTools = (editor: FabricJSEditor) => {
  const [currentTool, setCurrentTool] = useState<string>("select");
  const [strokeColor, setStrokeColor] = useState(DEFAULT_STROKE_COLOR);
  const [fillColor, setFillColor] = useState(DEFAULT_FILL_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(DEFAULT_STROKE_WIDTH);
  const [strokeStyle, setStrokeStyle] = useState("solid");
  const { enableMoveMode, disableMoveMode } = useCanvasMove(
    editor,
    currentTool
  );

  const getStrokeDashArray = (style: string) => {
    switch (style) {
      case "dashed":
        return [10, 5];
      case "dotted":
        return [2, 2];
      default:
        return undefined;
    }
  };

  // Update selected object when style changes
  useEffect(() => {
    if (!editor?.canvas) return;
    const activeObjects = editor.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set({
          stroke: strokeColor,
          fill: fillColor,
          strokeWidth: strokeWidth,
          strokeDashArray: getStrokeDashArray(strokeStyle),
        });
      });
      editor.canvas.requestRenderAll();
      editor.canvas.fire("object:modified", { target: activeObjects[0] });
    }
  }, [editor, strokeColor, fillColor, strokeWidth, strokeStyle]);

  // Update style state when selection changes, ignoring multiple active objects
  useEffect(() => {
    if (!editor?.canvas) return;
    const handleSelection = () => {
      const activeObjects = editor.canvas.getActiveObjects();
      if (activeObjects.length === 1) {
        const activeObject = activeObjects[0];
        setStrokeColor((activeObject.stroke as string) || DEFAULT_STROKE_COLOR);
        setFillColor((activeObject.fill as string) || DEFAULT_FILL_COLOR);
        setStrokeWidth(
          (activeObject.strokeWidth as number) || DEFAULT_STROKE_WIDTH
        );
        setStrokeStyle(
          activeObject.strokeDashArray
            ? activeObject.strokeDashArray[0] === 10
              ? "dashed"
              : "dotted"
            : "solid"
        );
      }
    };

    editor.canvas.on("selection:created", handleSelection);
    editor.canvas.on("selection:updated", handleSelection);

    return () => {
      editor.canvas.off("selection:created", handleSelection);
      editor.canvas.off("selection:updated", handleSelection);
    };
  }, [editor]);

  const createDrawingObject = (options: Partial<DrawingObject>) => ({
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeUniform: true,
    hasControls: true,
    hasBorders: true,
    strokeDashArray: getStrokeDashArray(strokeStyle),
    ...options,
  });

  const getCanvasPoint = (e: React.MouseEvent) => {
    if (!editor?.canvas) return { x: 100, y: 100 };
    const canvasEl = editor.canvas.getElement();
    const rect = canvasEl.getBoundingClientRect();
    const vpt = editor.canvas.viewportTransform;
    if (!vpt) return { x: 100, y: 100 };

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const transformedX = (x - vpt[4]) / vpt[0];
    const transformedY = (y - vpt[5]) / vpt[3];

    return { x: transformedX, y: transformedY };
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

    arrow.set({
      lockScalingY: true,
      lockUniScaling: true,
    });

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
      fill: strokeColor,
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

    line.set({
      lockScalingY: true,
      lockUniScaling: true,
    });

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

  const enableFreeDraw = () => {
    if (!editor?.canvas) return;
    const brush = new PencilBrush(editor.canvas);
    brush.width = strokeWidth;
    brush.color = strokeColor;
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

  return {
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
  };
};
