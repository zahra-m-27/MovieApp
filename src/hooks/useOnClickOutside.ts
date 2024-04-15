import { useEffect, useRef } from "react";

//A custom React hook that detects when a user clicks outside of a specified element and execute a callback function
export const useOnClickOutside = (
  action: () => void,
  listenCapturing = true
) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation();
        action();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [action, listenCapturing]);

  return { ref };
};
