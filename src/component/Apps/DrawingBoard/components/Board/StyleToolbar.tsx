import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaSquare, FaRegSquare } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { AiOutlineDash, AiOutlineSmallDash } from "react-icons/ai";

interface StyleToolbarProps {
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  strokeStyle: string;
  onStrokeColorChange: (color: string) => void;
  onFillColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onStrokeStyleChange: (style: string) => void;
}
const PREDEFINED_COLORS = [
  { color: "#ffffff50" }, // White
  { color: "#00000050" }, // Black
  { color: "#ff000050" }, // Red
  { color: "#00ff0050" }, // Green
  { color: "#0000ff50" }, // Blue
  { color: "#ffff0050" }, // Yellow
  { color: "#ff00ff50" }, // Magenta
  { color: "#00ffff50" }, // Cyan
  { color: "#80808050" }, // Gray
  { color: "#80000050" }, // Maroon
  { color: "#00800050" }, // Dark Green
  { color: "#00008050" }, // Navy
];

const STROKE_SIZES = [
  { id: "s", label: "S", width: 2 },
  { id: "m", label: "M", width: 4 },
  { id: "l", label: "L", width: 8 },
];

const STROKE_STYLES = [
  { id: "solid", icon: FaMinus, label: "Solid" },
  { id: "dashed", icon: AiOutlineDash, label: "Dashed" },
  { id: "dotted", icon: AiOutlineSmallDash, label: "Dotted" },
];

const VARIANTS = [
  { id: "outline", icon: FaRegSquare, label: "Outline" },
  { id: "filled", icon: FaSquare, label: "Filled" },
];

export const StyleToolbar: React.FC<StyleToolbarProps> = ({
  strokeColor,
  fillColor,
  strokeWidth,
  strokeStyle,
  onStrokeColorChange,
  onFillColorChange,
  onStrokeWidthChange,
  onStrokeStyleChange,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const getCurrentSizeId = () => {
    const size = STROKE_SIZES.find((s) => s.width === strokeWidth);
    return size?.id || "m";
  };

  const getCurrentVariant = () => {
    return fillColor === "transparent" ? "outline" : "filled";
  };

  const handleVariantChange = (variant: string) => {
    if (variant === "outline") {
      onFillColorChange("transparent");
      onStrokeColorChange(fillColor);
    } else {
      onFillColorChange(strokeColor);
      onStrokeColorChange("transparent");
    }
  };

  const handleColorChange = (color: string) => {
    if (getCurrentVariant() === "filled") {
      onFillColorChange(color);
      onStrokeColorChange("transparent");
    } else {
      onStrokeColorChange(color);
    }
  };

  return (
    <div className="absolute flex gap-2 px-2 py-1 bg-secondary shadow-lg rounded-lg bottom-4 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center gap-2 border-r border-secondary pr-2">
        {VARIANTS.map((variant) => {
          const Icon = variant.icon;
          return (
            <button
              key={variant.id}
              className={twMerge(
                "p-1 rounded-md text-secondary hover:text-primary transition-colors",
                getCurrentVariant() === variant.id &&
                  "text-blue-500 hover:text-blue-600"
              )}
              onClick={() => handleVariantChange(variant.id)}
              title={variant.label}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-r border-secondary pr-2 relative">
        <button
          className={twMerge(
            "size-5 rounded cursor-pointer border border-secondary",
            "hover:ring-2 hover:ring-blue-500 transition-all"
          )}
          onClick={() => setShowColorPicker(!showColorPicker)}
          title="Color"
          style={{
            backgroundColor:
              getCurrentVariant() === "filled" ? fillColor : strokeColor,
          }}
        />
        {showColorPicker && (
          <div className="absolute bottom-full left-0 mt-1 p-2 bg-secondary shadow-lg rounded-lg grid grid-cols-4 gap-1 w-32">
            {PREDEFINED_COLORS.map(({ color }) => (
              <button
                key={color}
                className={twMerge(
                  "w-6 h-6 rounded cursor-pointer border border-secondary",
                  (strokeColor === color || fillColor === color) &&
                    "ring-2 ring-blue-500"
                )}
                style={{ backgroundColor: color }}
                onClick={() => {
                  handleColorChange(color);
                  setShowColorPicker(false);
                }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-r border-secondary pr-2">
        {STROKE_SIZES.map((size) => (
          <button
            key={size.id}
            className={twMerge(
              "p-1 rounded-md text-secondary hover:text-primary transition-colors",
              getCurrentSizeId() === size.id &&
                "text-blue-500 hover:text-blue-600"
            )}
            onClick={() => onStrokeWidthChange(size.width)}
            title={`Stroke Size: ${size.label}`}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className="bg-current"
                style={{ height: size.width, width: "100%" }}
              />
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {STROKE_STYLES.map((style) => {
          const Icon = style.icon;
          return (
            <button
              key={style.id}
              className={twMerge(
                "p-1 rounded-md text-secondary hover:text-primary transition-colors",
                strokeStyle === style.id && "text-blue-500 hover:text-blue-600"
              )}
              onClick={() => onStrokeStyleChange(style.id)}
              title={`Stroke Style: ${style.label}`}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
