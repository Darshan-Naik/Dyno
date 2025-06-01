import { useEffect } from "react";
import { FabricJSEditor } from "fabricjs-react";

export const useCanvasMove = (editor: FabricJSEditor, currentTool: string) => {
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

  useEffect(() => {
    if (!editor?.canvas) return;

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

  return {
    enableMoveMode,
    disableMoveMode,
  };
};
