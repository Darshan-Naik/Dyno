import { updateQuickNote } from "./store/quickNote.action";
import { observer } from "mobx-react-lite";
import { quickNoteStore } from "./store/quickNote.store";
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
import { useRef } from "react";

const QuickNote = () => {
  const ref = useRef(null);
  function onChange(value) {
    updateQuickNote(value);
  }
  return (
    <div
      className="flex-1 p-2 flex flex-col overflow-auto"
      onClick={() => ref.current?.focus()}
    >
      <MDXEditor
        ref={ref}
        markdown={quickNoteStore.note}
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

export default observer(QuickNote);
