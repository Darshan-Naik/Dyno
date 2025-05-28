import { mainMenu } from "../../configs";
import SideBarItem from "./SideBarItem";
import { isElectron } from "../../utils/environment";
import icon from "../../assets/icons/icon.png";
import { useAuth } from "../../contexts/AuthContext";
import { FaRightFromBracket, FaDownload } from "react-icons/fa6";
import { dropDB } from "../../db/db";

type SideMenuProps = {
  handleMenuClick: (menu: string) => void;
  activeMenu: string;
};

const SideMenu = ({ handleMenuClick, activeMenu }: SideMenuProps) => {
  const isWeb = !isElectron();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    dropDB();
  };

  const handleDownload = () => {
    window.location.href = "/download";
  };

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
      <div className="border-t border-gray-700 py-2 mt-auto">
        {isWeb && (
          <button
            onClick={handleDownload}
            className="w-full px-3 py-1 flex items-center justify-center gap-2 bg-gradient-to-r to-blue-500 from-purple-600 hover:to-blue-600 hover:from-purple-700 rounded-full transition-all duration-200  my-2"
          >
            <FaDownload className="size-3" />
            <span className="text-xs truncate">Download App</span>
          </button>
        )}
        <div className="flex items-center gap-2 px-2 mb-2">
          <img
            src={user?.photoURL || icon}
            alt="Profile"
            className="w-7 h-7 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-secondary truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-secondary hover:text-primary rounded-md transition-colors duration-200"
        >
          <FaRightFromBracket className="size-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
