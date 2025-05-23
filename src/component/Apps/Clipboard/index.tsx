import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  getClipboardText,
  removeClipboardText,
} from "./store/clipboard.action";
import { clipboardStore } from "./store/clipboard.store";
import { FaRegCopy, FaRegTrashCan } from "react-icons/fa6";

const Clipboard = () => {
  const writeClipboardText = async (text: string) => {
    writeClipboardText(text);
  };

  useEffect(() => {
    getClipboardText();
  }, []);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="max-h-full bg-primary p-4 flex gap-2 overflow-y-auto flex-wrap items-start justify-start overflow-x-hidden">
        {clipboardStore.texts.map((clip, index) => (
          <div
            className="py-1 px-2 border rounded-md border-gray-700 text-secondary text-sm w-fit flex gap-5 hover:text-primary bg-secondary items-start overflow-hidden"
            key={clip.id}
          >
            <p className="whitespace-pre-wrap break-words font-light italic break-all">
              {clip.text}
            </p>
            <div className="mt-1 flex gap-2">
              <button
                title="Copy"
                onClick={() => writeClipboardText(clip.text)}
                className="text-green-600 hover:text-green-400 transition-colors duration-300"
              >
                <FaRegCopy />
              </button>
              {!!index && (
                <button
                  title="Delete"
                  onClick={() => removeClipboardText(clip.id)}
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
