import { twMerge } from "tailwind-merge";

type SideBarItemProps = {
  label: string;
  Icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
};
const SideBarItem = ({ label, Icon, active, onClick }: SideBarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "w-full text-secondary font-extralight text-xs text-left py-1 px-2 rounded-md  hover:text-primary transition-colors duration-300 flex justify-between items-center cursor-pointer",
        active && "text-primary bg-primary"
      )}
    >
      <span className="flex items-center gap-2">
        <Icon />
        {label}
      </span>
      {/* <span>*</span> */}
    </button>
  );
};

export default SideBarItem;
