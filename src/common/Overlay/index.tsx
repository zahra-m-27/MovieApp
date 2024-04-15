import { ReactNode } from "react";
import { m } from "framer-motion";
import { conditonalClassName } from "../../utils/helper";

interface OverlayProps {
  className?: string;
  children: ReactNode;
}

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

//Displays a full-screen overlay with a specified background color and uses the m component to animate the overlay when it is shown or hidden
const Overlay = ({ className, children }: OverlayProps) => {
  return (
    <m.div
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={conditonalClassName(
        `fixed top-0 left-0 z-[20] bg-blackOverlay w-screen h-screen `,
        className
      )}
    >
      {children}
    </m.div>
  );
};

export default Overlay;
