import { useContext, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Overlay from "../Overlay";
import { GlobalContext } from "../../context/globalContext";
import { useMotion } from "../../hooks/useMotion";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

//displays a video modal for watch trailer button at Home page with an overlay and a close button
const VideoModal = () => {
  const { videoId, closeModal, isModalOpen } = useContext(GlobalContext);
  const { zoomIn } = useMotion();
  const { ref } = useOnClickOutside(closeModal);

  useEffect(() => {
    const body = document.body;
    const rootNode = document.documentElement;
    if (isModalOpen) {
      const scrollTop = rootNode.scrollTop;
      body.style.top = `-${scrollTop}px`;
      body.classList.add("no-scroll");

      return;
    }

    const top = parseFloat(body.style.top) * -1;
    body.classList.remove("no-scroll");
    if (top) {
      rootNode.style.scrollBehavior = "auto";
      rootNode.scrollTop = top;
      rootNode.style.scrollBehavior = "smooth";
    }
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Overlay className="flex items-center justify-center">
          <m.div
            variants={zoomIn(0.9, 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            ref={ref}
            className=" md:w-[570px] md:h-[370px] sm:w-[80vw] sm:h-[60vh] w-[80vw] xs:h-[30vh] h-[35vh] dark:bg-gray-900 bg-mainColor z-[25]  shadow-lg rounded-md relative"
          >
            <button
              type="button"
              className="absolute -right-8 -top-6 text-gray-300 text-[28px] z-50 "
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://127.0.0.1:5173/`}
              title="trailer"
              width="100%"
              height="100%"
              className="rounded-md"
              allowFullScreen
            />
          </m.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
