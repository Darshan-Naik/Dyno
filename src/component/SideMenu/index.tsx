import { mainMenu } from "../../configs";
import SideBarItem from "./SideBarItem";
import { isElectron } from "../../utils/environment";
import icon from "../../assets/icons/icon.png";

type SideMenuProps = {
  handleMenuClick: (menu: string) => void;
  activeMenu: string;
};

const SideMenu = ({ handleMenuClick, activeMenu }: SideMenuProps) => {
  const isWeb = !isElectron();

  return (
    <div className="max-w-60 bg-secondary h-full px-2 w-1/6 sidebar flex flex-col min-w-28">
      {isWeb ? (
        <div className="header font-thin h-10 text-primary w-full flex items-center gap-2 px-2">
          <img src={icon} alt="Dyno Logo" className="w-6 h-6" />
          <span className="font-medium italic">Dyno</span>
        </div>
      ) : (
        <div className="header font-thin h-10 text-primary w-full" />
      )}
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
