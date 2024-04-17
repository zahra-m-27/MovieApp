import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children: ReactNode;
}
//scrolls the page to the top when the location changes
const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
