import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";


const useTheme = () => {
  const all = useContext(ThemeContext)
  return all
};

export default useTheme;