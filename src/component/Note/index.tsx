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

type NoteProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const Note = ({ value, onChange, className }: NoteProps) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.setMarkdown(value);
  }, [ref.current]);

  return (
    <div
      className={twMerge("flex-1 p-2 flex flex-col overflow-auto", className)}
      onClick={() => ref.current?.focus()}
    >
      <MDXEditor
        ref={ref}
        markdown={value}
        className="dark-theme dark-editor "
        contentEditableClassName="prose dark:prose-invert prose-headings:mt-0 prose-headings:mb-0 prose-p:mt-0 prose-p:mb-0"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
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
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
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
