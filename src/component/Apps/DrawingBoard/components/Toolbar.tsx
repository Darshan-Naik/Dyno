import React from "react";
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

interface ToolbarProps {
  currentTool: string;
  onToolChange: (tool: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  onToolChange,
}) => {
  const tools = [
    { id: "move", icon: FaHand, title: "Move Canvas" },
    { id: "select", icon: FaArrowPointer, title: "Select" },
    { id: "draw", icon: FaPencil, title: "Draw" },
    { id: "rectangle", icon: FaRegSquare, title: "Rectangle" },
    { id: "circle", icon: FaRegCircle, title: "Circle" },
    { id: "line", icon: FaMinus, title: "Line" },
    { id: "arrow", icon: FaArrowRight, title: "Arrow" },
    { id: "text", icon: FaFont, title: "Text" },
  ];

  return (
    <div
      className="absolute flex gap-2 px-2 py-1 bg-secondary shadow-lg rounded-lg top-4 left-1/2 -translate-x-1/2 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      {tools.map(({ id, icon: Icon, title }) => (
        <button
          key={id}
          className={twMerge(
            "p-1 rounded-md text-secondary hover:text-primary transition-colors",
            currentTool === id && "text-blue-500 hover:text-blue-600"
          )}
          onClick={() => onToolChange(id)}
          title={title}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
};
