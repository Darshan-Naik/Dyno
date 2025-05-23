import { useLayoutEffect, useState } from "react";
import "./App.css";
import SideMenu from "./component/SideMenu";
import Login from "./component/Login";
import { useAuth } from "./contexts/AuthContext";

import { fetchTasks } from "./component/Apps/Tasks/store/task.action";
import { fetchQuickNote } from "./component/Apps/QuickNote/store/quickNote.action";
import { mainApps } from "./configs";
import {
  fetchClipboardData,
  getClipboardText,
} from "./component/Apps/Clipboard/store/clipboard.action";
import { fetchNotes } from "./component/Apps/Notes/store/notes.action";

const App = () => {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "Tasks"
  );
  const ActiveApp = mainApps[activeMenu as keyof typeof mainApps];

  useLayoutEffect(() => {
    if (user) {
      fetchTasks();
      fetchQuickNote();
      fetchNotes();
      fetchClipboardData();
      const interval = setInterval(getClipboardText, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [user]);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    localStorage.setItem("activeMenu", menu);
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-full">
      <SideMenu handleMenuClick={handleMenuClick} activeMenu={activeMenu} />
      <ActiveApp />
    </div>
  );
};

export default App;
