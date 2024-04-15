import { NavLink } from "react-router-dom";
import { NavLinkType } from "../../types";
import { activeListItem, listItem } from "../../constants/styles";
import { conditonalClassName } from "../../utils/helper";

interface SidebarNavItemProps {
  link: NavLinkType;
  closeSideBar: () => void;
}

//navigation item in the application sidebar
const SidebarNavItem = ({ link, closeSideBar }: SidebarNavItemProps) => {
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return conditonalClassName(listItem, isActive && activeListItem);
        }}
        onClick={closeSideBar}
      >
        {<link.icon className="text-[18px]" />}
        <span>{link.title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarNavItem;
