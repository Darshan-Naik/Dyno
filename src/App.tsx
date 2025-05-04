import { useLayoutEffect, useState } from "react";
import "./App.css";
import SideMenu from "./component/SideMenu";
import Tasks from "./component/Apps/Tasks";
import Notes from "./component/Apps/Notes";
import Reminders from "./component/Apps/Reminders";
import { fetchTasks } from "./component/Apps/Tasks/store/task.action";

const apps = {
  Tasks: Tasks,
  Notes: Notes,
  Reminders: Reminders,
};
const App = () => {
  const [activeMenu, setActiveMenu] = useState("Tasks");
  const ActiveApp = apps[activeMenu as keyof typeof apps];

  useLayoutEffect(() => {
    fetchTasks();
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className="flex h-full">
      <SideMenu handleMenuClick={handleMenuClick} activeMenu={activeMenu} />
      <ActiveApp />
    </div>
  );
};

export default App;
