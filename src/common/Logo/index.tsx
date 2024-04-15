import { Link } from "react-router-dom";
import { conditonalClassName } from "../../utils/helper";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import darkModeLogo from "../../assets/images/darkModeLogo.png";
import lightModeLogo from "../../assets/images/lightModeLogo.png";

interface logoProps {
  className?: string;
  logoColor?: string;
}

//Displays the application logo and name
const Logo = ({
  className = "",
  logoColor = "text-black dark:text-primary",
}: logoProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    //navigate to the home page when the logo is clicked
    <Link
      to="/"
      className={conditonalClassName(
        `flex flex-row items-center xs:gap-2 gap-[6px])`,
        className
      )}
    >
      <img
        src={theme === "Dark" ? darkModeLogo : lightModeLogo}
        alt="logo"
        className="sm:h-[30px] h-[24px] sm:w-[34px] w-[24px]"
      />
      <span
        className={conditonalClassName(
          logoColor,
          `font-semibold sm:text-[18px] text-[16.75px]`
        )}
      >
        MyMovies
      </span>
    </Link>
  );
};

export default Logo;
