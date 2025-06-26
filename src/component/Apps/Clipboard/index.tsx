import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  getClipboardText,
  removeClipboardText,
} from "./store/clipboard.action";
import { clipboardStore } from "./store/clipboard.store";
import { FaRegCopy, FaRegTrashCan } from "react-icons/fa6";
import { isElectron } from "../../../utils/environment";

const Clipboard = () => {
  const writeClipboardText = async (text: string) => {
    writeClipboardText(text);
  };

  useEffect(() => {
    getClipboardText();
  }, []);

  return (
    <div className="flex-1 overflow-hidden">
      {!isElectron() && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-2 mb-4 rounded-md text-center mx-2 mt-2">
          <p className="text-sm">
            ⚠️ Auto-tracing of clipboard content is not available in the web
            version. For the full clipboard experience with automatic content
            tracking, please use our desktop application.
          </p>
        </div>
      )}
      <div className="max-h-full bg-background p-4 flex gap-2 overflow-y-auto flex-wrap items-start justify-start overflow-x-hidden">
        {clipboardStore.texts.map((clip, index) => (
          <div
            className="py-1 px-2 border rounded-md border-border text-muted-foreground text-sm w-fit flex gap-5 hover:text-foreground bg-card items-start overflow-hidden transition-colors"
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
