import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  getClipboardText,
  removeClipboardText,
  updateClipboardData,
} from "./store/clipboard.action";
import { clipboardStore } from "./store/clipboard.store";
import { FaRegCopy, FaRegTrashCan } from "react-icons/fa6";

const Clipboard = () => {
  const writeClipboardText = (text: string) => {
    window.electron.setClipboardText(text);
    updateClipboardData(text);
  };

  useEffect(() => {
    getClipboardText();
  }, []);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="max-h-full bg-primary p-4 flex gap-2 overflow-y-auto flex-wrap items-start justify-start overflow-x-hidden">
        {clipboardStore.texts.map((text, index) => (
          <div
            className="py-1 px-2 border rounded-md border-gray-700 text-secondary text-sm w-fit flex gap-5 hover:text-primary bg-secondary items-start overflow-hidden"
            key={text}
          >
            <p className="whitespace-pre-wrap break-words font-light italic break-all">
              {text}
            </p>
            <div className="mt-1 flex gap-2">
              <button
                title="Copy"
                onClick={() => writeClipboardText(text)}
                className="text-green-600 hover:text-green-400 transition-colors duration-300"
              >
                <FaRegCopy />
              </button>
              {!!index && (
                <button
                  title="Delete"
                  onClick={() => removeClipboardText(index)}
                  className="text-red-600 hover:text-red-400 transition-colors duration-300"
                >
                  <FaRegTrashCan />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Clipboard);
