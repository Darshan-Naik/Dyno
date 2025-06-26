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
        "w-full text-foreground/70 font-light text-sm text-left py-1.5 px-3 rounded-md  hover:bg-accent hover:text-accent-foreground transition-colors duration-300 flex justify-between items-center cursor-pointer",
        active && "text-foreground bg-accent"
      )}
    >
      <span className="flex items-center gap-2">
        <Icon className="size-4" />
        {label}
      </span>
    </button>
  );
};

export default SideBarItem;
