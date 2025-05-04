import { FaTasks } from "react-icons/fa";
import { FaRegNoteSticky, FaRegClock, FaRegFileLines } from "react-icons/fa6";

import Tasks from "../component/Apps/Tasks";
import Notes from "../component/Apps/Notes";
import Reminders from "../component/Apps/Reminders";
import QuickNote from "../component/Apps/QuickNote";

export const mainMenu = [
  {
    label: "Tasks",
    Icon: FaTasks,
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
    label: "Reminders",
    Icon: FaRegClock,
  },
];

export const mainApps = {
  Tasks: Tasks,
  Notes: Notes,
  Reminders: Reminders,
  QuickNote: QuickNote,
};
