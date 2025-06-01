import { useState } from "react";
import { FabricJSEditor } from "fabricjs-react";
import { Circle, IText, Polyline, Rect, PencilBrush, Line } from "fabric";
import { useCanvasMove } from "./useCanvasMove";

// Constants
const DRAWING_COLOR = "#ffffffcf";
const STROKE_WIDTH = 2;
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
}

export const useDrawingTools = (editor: FabricJSEditor) => {
  const [currentTool, setCurrentTool] = useState<string>("select");
  const { enableMoveMode, disableMoveMode } = useCanvasMove(
    editor,
    currentTool
  );

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
    handleToolChange,
    handleInsert,
  };
};
