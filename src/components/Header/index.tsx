import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import throttle from "lodash.throttle";
import HeaderNavItem from "./HeaderNavItem";
import { GlobalContext } from "../../context/globalContext";
import { ThemeContext } from "../../context/themeContext";
import { maxWidth, textColor } from "../../constants/styles";
import { navLinks } from "../../constants";
import { THROTTLE_DELAY } from "../../utils/config";
import { conditonalClassName } from "../../utils/helper";
import Logo from "../Logo";
import ThemeMenu from "../ThemeMenu";

//Displays a navigation bar and uses hooks and context providers to manage the theme and global state
const Header = () => {
  const { openMenu, theme, showThemeOptions } = useContext(ThemeContext);
  const { setShowSidebar } = useContext(GlobalContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleBackgroundChange = () => {
      const body = document.body;
      if (
        window.scrollY > 0 ||
        (body.classList.contains("no-scroll") &&
          parseFloat(body.style.top) * -1 > 0)
      ) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    //Limits the number of times handleBackgroundChange can be called within the given time period
    const throttledHandleBackgroundChange = throttle(
      handleBackgroundChange,
      THROTTLE_DELAY
    );

    window.addEventListener("scroll", throttledHandleBackgroundChange);

    return () => {
      window.removeEventListener("scroll", throttledHandleBackgroundChange);
    };
  }, []);

  useEffect(() => {
    if (location.pathname.split("/").length > 3) {
      setIsNotFoundPage(true);
    } else {
      setIsNotFoundPage(false);
    }
  }, [location.pathname]);

  return (
    <header
      className={conditonalClassName(
        `md:py-[16px] py-[14.5px]  fixed top-0 left-0 w-full z-10 transition-all duration-50`,
        isScrolled &&
          (theme === "Dark" ? "header-bg--dark" : "header-bg--light")
      )}
    >
      <nav
        className={conditonalClassName(
          maxWidth,
          `flex justify-between flex-row items-center`
        )}
      >
        <Logo
          logoColor={conditonalClassName(
            isNotFoundPage
              ? "text-black dark:text-primary"
              : !isNotFoundPage && isScrolled
              ? "text-black dark:text-primary"
              : "text-primary"
          )}
        />

        <div className=" hidden md:flex flex-row gap-8 items-center text-gray-600 dark:text-gray-300">
          <ul className="flex flex-row gap-8 capitalize text-[14.75px] font-medium">
            {navLinks.map((link: { title: string; path: string }) => {
              return (
                <HeaderNavItem
                  key={link.title}
                  link={link}
                  isNotFoundPage={isNotFoundPage}
                  showBg={isScrolled}
                />
              );
            })}
          </ul>
          <div className="button relative">
            <button
              name="theme-menu"
              type="button"
              onClick={openMenu}
              id="theme"
              className={conditonalClassName(
                `flex items-center justify-center mb-[2px] transition-all duration-100 hover:scale-110`,
                isNotFoundPage || isScrolled
                  ? ` ${textColor} dark:hover:text-secColor hover:text-black `
                  : ` dark:hover:text-secColor text-gray-300 `
              )}
            >
              {theme === "Dark" ? <BsMoonStarsFill /> : <FiSun />}
            </button>
            <AnimatePresence>
              {showThemeOptions && <ThemeMenu />}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          name="menu"
          className={conditonalClassName(
            `inline-block text-[22.75px] md:hidden  transition-all duration-300`,
            isNotFoundPage || isScrolled
              ? `${textColor} dark:hover:text-secColor hover:text-black `
              : ` dark:hover:text-secColor text-secColor`
          )}
          onClick={() => setShowSidebar(true)}
        >
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;
