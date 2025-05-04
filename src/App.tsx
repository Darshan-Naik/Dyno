import { useLayoutEffect, useState } from "react";
import "./App.css";
import SideMenu from "./component/SideMenu";

import { fetchTasks } from "./component/Apps/Tasks/store/task.action";
import { mainApps } from "./configs";

const App = () => {
  const [activeMenu, setActiveMenu] = useState("Tasks");
  const ActiveApp = mainApps[activeMenu as keyof typeof mainApps];

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
