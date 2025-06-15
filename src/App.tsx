import { useLayoutEffect, useState } from "react";
import "./App.css";
import SideMenu from "./component/SideMenu";
import Login from "./component/Login";
import DownloadPage from "./component/DownloadPage";
import { useAuth } from "./contexts/AuthContext";
import { useSync } from "./hooks/useSync";

import { fetchTasks } from "./component/Apps/Tasks/store/task.action";
import { fetchQuickNote } from "./component/Apps/QuickNote/store/quickNote.action";
import { mainApps } from "./configs";
import {
  fetchClipboardData,
  getClipboardText,
} from "./component/Apps/Clipboard/store/clipboard.action";
import { fetchNotes } from "./component/Apps/Notes/store/notes.action";
import { fetchBoards } from "./component/Apps/DrawingBoard/store/board.action";
import { isElectron } from "./utils/environment";

const App = () => {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "Tasks"
  );
  const ActiveApp = mainApps[activeMenu as keyof typeof mainApps];

  // Initialize sync when user is authenticated
  useSync(user?.uid);

  useLayoutEffect(() => {
    fetchTasks();
    fetchQuickNote();
    fetchNotes();
    fetchClipboardData();
    fetchBoards();

    // Only start clipboard monitoring if in electron
    if (isElectron()) {
      const interval = setInterval(getClipboardText, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    localStorage.setItem("activeMenu", menu);
  };

  // Check if we're on the download page
  const isDownloadPage = window.location.pathname === "/download";
  const isLoginPage = window.location.pathname === "/login";

  if (isDownloadPage) {
    return <DownloadPage />;
  }

  // Show login page only if not in local mode
  if (isLoginPage && !user) {
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
