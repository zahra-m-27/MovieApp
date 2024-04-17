import { m } from "framer-motion";
import { ThemeContext } from "../../context/themeContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useMotion } from "../../hooks/useMotion";
import { themeOptions } from "../../constants";
import { conditonalClassName } from "../../utils/helper";
import { textColor } from "../../constants/styles";
import { useContext } from "react";

//Display theme(light/dark) menu. Uses animation for showing and hiding the menu
const ThemeMenu = () => {
  const { theme, setTheme, setShowThemeOptions, closeMenu } =
    useContext(ThemeContext);
  const { zoomIn } = useMotion();
  const { ref } = useOnClickOutside(closeMenu);

  const changeTheme = (theme: string) => {
    setTheme(theme);
    setShowThemeOptions(false);
  };

  return (
    <m.ul
      ref={ref}
      variants={zoomIn(0.9, 0.2)}
      initial="hidden"
      animate="show"
      exit="hidden"
      style={{
        background: `${theme === "Light" ? "#FAFAFA" : "rgba(0,0,0,0.7)"}`,
      }}
      className="absolute top-[200%] right-[25%] bg-primary shadow-md backdrop-blur-sm  rounded-md overflow-hidden dark:dark-glass light-glass backdrop:blur-md"
    >
      {themeOptions.map((option, index) => (
        <li
          key={index}
          className={conditonalClassName(
            "hover:bg-gray-200 dark:hover:bg-black transition-all duration-300",
            theme === option.title && "bg-gray-200 dark:bg-black "
          )}
        >
          <button
            name="theme"
            type="button"
            className={conditonalClassName(
              "flex flex-row items-center gap-3 w-full font-medium py-2 px-4 text-[14px]",
              theme === option.title && textColor
            )}
            onClick={() => {
              changeTheme(option.title);
            }}
          >
            {<option.icon />}
            <span>{option.title}</span>
          </button>
        </li>
      ))}
    </m.ul>
  );
};

export default ThemeMenu;
