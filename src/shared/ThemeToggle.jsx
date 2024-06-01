import { GiMoon } from "react-icons/gi";
import useTheme from "../hooks/useTheme";
import { FaRegSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="btn btn-ghost btn-sm border-0">
      <label className="swap swap-rotate">
        <input onClick={toggleTheme} type="checkbox" className="theme-controller"  />
        {
          theme === 'light' 
          ?
          <div className="text-lg"><FaRegSun /></div>
          :
          <div className="text-lg"><GiMoon /></div>
        }
      </label>
    </div>
  );
};

export default ThemeToggle;