import {
  Editor,
  Toolbar,
  EditorProvider,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnBulletList,
  BtnUndo,
  BtnRedo,
  Separator,
  BtnNumberedList,
  BtnClearFormatting,
} from "react-simple-wysiwyg";
import { updateQuickNote } from "./store/quickNote.action";
import { observer } from "mobx-react-lite";
import { quickNoteStore } from "./store/quickNote.store";

const QuickNote = () => {
  function onChange(e) {
    updateQuickNote(e.target.value);
  }
  return (
    <div className="flex-1 p-2 flex flex-col">
      <EditorProvider>
        <Toolbar className="bg-transparent flex gap-4 items-center justify-between border-b border-gray-500 px-4 py-2 mb-2 ">
          <div className="flex gap-4 items-center">
            <BtnUndo className="text-secondary font-normal bg-transparent hover:text-primary" />
            <BtnRedo className="text-secondary font-normal bg-transparent hover:text-primary" />
            <Separator />
          </div>
          <div className="flex gap-4 items-center">
            <BtnBold className="text-secondary font-normal bg-transparent data-[active=true]:text-primary hover:text-primary" />
            <BtnItalic className="text-secondary font-normal bg-transparent data-[active=true]:text-primary hover:text-primary" />
            <BtnUnderline className="text-secondary font-normal bg-transparent data-[active=true]:text-primary hover:text-primary" />
            <BtnStrikeThrough className="text-secondary font-normal bg-transparent data-[active=true]:text-primary hover:text-primary" />
            <BtnBulletList className="text-secondary font-normal bg-transparent data-[active=true]:text-primary hover:text-primary" />
            <BtnNumberedList className="text-secondary font-normal bg-transparent data-[active=true]:text-primary hover:text-primary" />
          </div>
          <div className="flex gap-4 items-center">
            <Separator />
            <BtnClearFormatting className="text-secondary font-normal bg-transparent hover:text-primary" />
          </div>
        </Toolbar>
        <Editor
          value={quickNoteStore.note}
          autoFocus
          onChange={onChange}
          placeholder="No note here yet! Time to add some magic ✨"
          containerProps={{
            className:
              "flex-1 !border-none !overflow-auto max-w-full text-primary",
          }}
          className="placeholder:italic placeholder:font-extralight placeholder:text-xs"
        />
      </EditorProvider>
    </div>
  );
};

export default observer(QuickNote);
