import { useCallback, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

//A custom React hook that returns several animation styles
export const useMotion = () => {
  const isMiniScreen = useMediaQuery("(max-width: 768px)");

  //returns an object for zooming in
  const zoomIn = useCallback(
    (scale: number, duration: number) => ({
      hidden: {
        opacity: 0,
        scale,
        transition: {
          duration,
          ease: "easeInOut",
        },
      },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  //stagger the animation of child components
  const staggerContainer = useCallback(
    (staggerChildren: number, delayChildren: number) =>
      isMiniScreen
        ? undefined
        : {
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              transition: {
                staggerChildren,
                delayChildren,
              },
            },
          },
    [isMiniScreen]
  );

  //fade in a component from the top
  const fadeDown = useMemo(
    () =>
      isMiniScreen
        ? undefined
        : {
            hidden: {
              y: -25,
              opacity: 0,
            },
            show: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
                type: "tween",
                opacity: {
                  duration: 0.625,
                },
              },
            },
          },
    [isMiniScreen]
  );

  //fade in a component from the bottom
  const fadeUp = useMemo(
    () =>
      isMiniScreen
        ? undefined
        : {
            hidden: {
              y: 50,
              x: 50,
              opacity: 0,
            },
            show: {
              y: 0,
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut",
                type: "tween",
              },
            },
          },
    [isMiniScreen]
  );

  //slide in a component from a specified direction
  const slideIn = useCallback(
    (direction: string, type: string, delay: number, duration: number) => ({
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
        transition: {
          duration,
          ease: "easeInOut",
        },
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type,
          delay,
          duration,
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  return {
    zoomIn,
    fadeDown,
    fadeUp,
    staggerContainer,
    slideIn,
  };
};
