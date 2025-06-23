import {
  BoldItalicUnderlineToggles,
  diffSourcePlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "./style.css";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { FaArrowLeft, FaRegFloppyDisk } from "react-icons/fa6";

type NoteProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onSave?: () => void;
  onClose?: () => void;
};

const Note = ({
  value = "",
  onChange,
  className,
  onSave,
  onClose,
}: NoteProps) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.setMarkdown(value);
  }, [ref.current, value]);

  return (
    <div
      className={twMerge(
        "flex-1 p-2 flex flex-col overflow-auto w-full h-full",
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.focus();
        const anchor = (e.target as HTMLElement).closest("a");
        if (anchor && (e.ctrlKey || e.metaKey)) {
          window.open(
            anchor.getAttribute("href") || "",
            "_blank",
            "noopener,noreferrer"
          );
          e.preventDefault();
        }
      }}
    >
      <MDXEditor
        ref={ref}
        placeholder="Time to add some magic ✨"
        markdown={value}
        className="dark-theme dark-editor w-full"
        contentEditableClassName="prose !max-w-full dark:prose-invert prose-headings:mt-0 prose-headings:mb-0 prose-p:mt-0 prose-p:mb-0"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin({ disableAutoLink: false }),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          diffSourcePlugin({
            viewMode: "rich-text",
          }),
          toolbarPlugin({
            toolbarClassName: "my-classname",
            toolbarContents: () => (
              <div className="flex justify-between items-center w-full">
                <div className="p-1 grid place-items-center">
                  {onSave && (
                    <button
                      title="Save to notes"
                      className="disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!value}
                      onClick={onSave}
                    >
                      <FaRegFloppyDisk className="!text-secondary hover:!text-primary" />
                    </button>
                  )}
                  {onClose && (
                    <button title="Close" onClick={onClose}>
                      <FaArrowLeft className="!text-secondary hover:!text-primary" />
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                </div>

                <UndoRedo />
              </div>
            ),
          }),
        ]}
        onChange={onChange}
      />
    </div>
  );
};

export default Note;
