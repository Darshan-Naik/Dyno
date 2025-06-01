import {
  FaRegNoteSticky,
  // FaRegClock,
  FaRegFileLines,
  FaRegClipboard,
  FaListCheck,
  FaRegPenToSquare,
} from "react-icons/fa6";

import Tasks from "../component/Apps/Tasks";
import Notes from "../component/Apps/Notes";
import Reminders from "../component/Apps/Reminders";
import QuickNote from "../component/Apps/QuickNote";
import Clipboard from "../component/Apps/Clipboard";
import DrawingBoard from "../component/DrawingBoard";

export const mainMenu = [
  {
    label: "Tasks",
    Icon: FaListCheck,
  },
  {
    label: "QuickNote",
    Icon: FaRegFileLines,
  },
  {
    label: "Notes",
    Icon: FaRegNoteSticky,
  },
  {
    label: "Clipboard",
    Icon: FaRegClipboard,
  },
  {
    label: "Drawing",
    Icon: FaRegPenToSquare,
  },
  // {
  //   label: "Reminders",
  //   Icon: FaRegClock,
  // },
];

export const mainApps = {
  Tasks: Tasks,
  Notes: Notes,
  Reminders: Reminders,
  QuickNote: QuickNote,
  Clipboard: Clipboard,
  Drawing: DrawingBoard,
};
