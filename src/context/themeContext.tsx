import {
  useState,
  useEffect,
  useCallback,
  createContext,
  ReactNode,
} from "react";
import { getTheme, saveTheme } from "../utils/helper";

interface Props {
  children: ReactNode;
}

interface ThemeContextValue {
  setShowThemeOptions: (prev: boolean) => void;
  showThemeOptions: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  setTheme: (newTheme: string) => void;
  theme: string;
}
//Create context for theme
export const ThemeContext = createContext<ThemeContextValue>({
  setShowThemeOptions: () => {},
  showThemeOptions: false,
  openMenu: () => {},
  closeMenu: () => {},
  setTheme: () => {},
  theme: "",
});

const initialTheme = getTheme();

//A wrapper component that provides theme context values to its child components
const ThemeProvider = ({ children }: Props) => {
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    if (initialTheme) return;
    setTheme("Dark");
  }, []);

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
      saveTheme("Dark");
    } else if (theme === "Light") {
      document.documentElement.classList.remove("dark");
      saveTheme("Light");
    }
  }, [theme]);

  const openMenu = () => {
    setShowThemeOptions(true);
  };

  const closeMenu = useCallback(() => {
    setShowThemeOptions(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        showThemeOptions,
        openMenu,
        closeMenu,
        setTheme,
        theme,
        setShowThemeOptions,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
