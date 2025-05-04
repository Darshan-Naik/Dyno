import { mainMenu } from "../../configs";
import SideBarItem from "./SideBarItem";

type SideMenuProps = {
  handleMenuClick: (menu: string) => void;
  activeMenu: string;
};

const SideMenu = ({ handleMenuClick, activeMenu }: SideMenuProps) => {
  return (
    <div className="max-w-60 bg-secondary h-full px-2 w-1/6 sidebar flex flex-col min-w-28">
      <div className="header font-thin h-10 text-primary w-full" />
      <div className="flex-1 flex flex-col gap-1">
        {mainMenu.map((menu) => (
          <SideBarItem
            {...menu}
            key={menu.label}
            onClick={() => handleMenuClick(menu.label)}
            active={activeMenu === menu.label}
          />
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
