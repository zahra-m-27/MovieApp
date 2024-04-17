import { useCallback, useContext } from "react";
import { AnimatePresence, m } from "framer-motion";
import SidebarNavItem from "./SidebarNavItem";
import ThemeOption from "./SidebarThemeOption";
import Logo from "../Logo";
import Overlay from "../Overlay";
import { GlobalContext } from "../../context/globalContext";
import { ThemeContext } from "../../context/themeContext";
import { useMotion } from "../../hooks/useMotion";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { NavLinkType } from "../../types";
import { sideBarHeading } from "../../constants/styles";
import { navLinks, themeOptions } from "../../constants";
import { conditonalClassName } from "../../utils/helper";

//displays a sidebar menu for smaller screens
const SideBar = () => {
  const { showSidebar, setShowSidebar } = useContext(GlobalContext);
  const { theme } = useContext(ThemeContext);
  const { slideIn } = useMotion();

  const closeSideBar = useCallback(() => {
    setShowSidebar(false);
  }, [setShowSidebar]);

  const { ref } = useOnClickOutside(closeSideBar);

  return (
    <AnimatePresence>
      {showSidebar && (
        <Overlay>
          <m.nav
            variants={slideIn("right", "tween", 0, 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            ref={ref}
            className={conditonalClassName(
              `fixed top-0 right-0 sm:w-[40%] xs:w-[220px] w-[195px] h-full z-[25] overflow-y-auto shadow-md md:hidden p-4 pb-0 dark:text-gray-200 text-gray-600`,
              theme === "Dark" ? "dark-glass" : "light-glass"
            )}
          >
            <div className="flex items-center justify-center  ">
              <Logo />
            </div>

            <div className="p-4 sm:pt-8  xs:pt-6 pt-[22px] h-full flex flex-col">
              <h3 className={sideBarHeading}>Menu</h3>
              <ul className="flex flex-col sm:gap-2 xs:gap-[6px] gap-1 capitalize xs:text-[14px] text-[13.5px] font-medium">
                {navLinks.map((link: NavLinkType) => {
                  return (
                    <SidebarNavItem
                      link={link}
                      closeSideBar={closeSideBar}
                      key={link.title.trim()}
                    />
                  );
                })}
              </ul>

              <h3 className={conditonalClassName(`mt-4 `, sideBarHeading)}>
                Theme
              </h3>
              <ul className="flex flex-col sm:gap-2 xs:gap-[4px] gap-[2px] capitalize text-[14.75px] font-medium">
                {themeOptions.map((theme) => {
                  return <ThemeOption theme={theme} key={theme.title} />;
                })}
              </ul>

              <p className="xs:text-[12px] text-[11.75px] mt-auto sm:mb-6 mb-[20px] text-center font-nunito dark:text-gray-200">
                &copy; 2024 by MyMovies. All right reserved.
              </p>
            </div>
          </m.nav>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
