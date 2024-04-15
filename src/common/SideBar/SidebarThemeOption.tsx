import { ThemeType } from "../../types";
import { ThemeContext } from "../../context/themeContext";
import { GlobalContext } from "../../context/globalContext";
import { activeListItem, listItem } from "../../constants/styles";
import { conditonalClassName } from "../../utils/helper";
import { useContext } from "react";

interface ThemeOptionProps {
  theme: ThemeType;
}

//theme option in the application sidebar
const ThemeOption = ({ theme }: ThemeOptionProps) => {
  const { setTheme, theme: currTheme } = useContext(ThemeContext);
  const { setShowSidebar } = useContext(GlobalContext);
  const { title } = theme;

  const changeTheme = () => {
    setTheme(title);
    setShowSidebar(false);
  };

  return (
    <li>
      <button
        type="button"
        className={conditonalClassName(
          listItem,
          theme.title === currTheme && activeListItem
        )}
        onClick={changeTheme}
      >
        <theme.icon />
        <span>{theme.title}</span>
      </button>
    </li>
  );
};

export default ThemeOption;
