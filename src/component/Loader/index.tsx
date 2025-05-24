import icon from "../../assets/icons/icon.png";

const Loader = () => {
  return (
    <div className="h-full w-full flex-1 grid place-items-center">
      <img src={icon} alt="Dyno Logo" className="size-20 animate-pulse" />
    </div>
  );
};

export default Loader;
