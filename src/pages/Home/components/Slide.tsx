import { memo, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMotion } from "../../../hooks/useMotion";
import { GlobalContext } from "../../../context/globalContext";
import { MoviesType } from "../../../types";
import { conditonalClassName } from "../../../utils/helper";
import {
  mainHeading,
  maxWidth,
  paragraph,
  watchBtn,
} from "../../../constants/styles";
import { Poster } from "../../../components";

interface SlideProps {
  movie: MoviesType;
}

//an individual slide in the slider
const Slide = memo(({ movie }: SlideProps) => {
  const { getTrailerId, setIsModalOpen } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { fadeDown, staggerContainer } = useMotion();

  const {
    overview,
    original_title: title,
    poster_path: posterPath,
    id,
  } = movie;

  const showTrailer = () => {
    getTrailerId(id);
    setIsModalOpen(true);
  };

  const handleDeyails = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className={conditonalClassName(
        maxWidth,
        ` mx-auto flex items-center h-full  flex-row lg:gap-32 sm:gap-20`
      )}
    >
      <motion.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        animate="show"
        className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[420px] font-nunito flex flex-col sm:gap-5 xs:gap-3 gap-[10px] sm:mb-8"
      >
        <motion.h2
          variants={fadeDown}
          className={conditonalClassName(mainHeading)}
        >
          {title}
        </motion.h2>
        <motion.p variants={fadeDown} className={paragraph}>
          {overview.length > 180
            ? `${overview.substring(0, 180)}...`
            : overview}
        </motion.p>
        <motion.div
          variants={fadeDown}
          className="flex flex-row items-center  gap-4 sm:mt-6 xs:mt-5 mt-[18px] "
        >
          <button
            type="button"
            name="watch-trailer"
            className={conditonalClassName(
              watchBtn,
              `text-shadow watch-trailer`
            )}
            onClick={showTrailer}
          >
            Watch trailer
          </button>
          <button
            type="button"
            name="watch-now"
            className={conditonalClassName(
              watchBtn,
              ` bg-[#ff0000] shadow-glow
             text-shadow text-secColor `
            )}
            onClick={handleDeyails}
          >
            Details
          </button>
        </motion.div>
      </motion.div>

      <Poster title={title} posterPath={posterPath} className="mr-auto" />
    </div>
  );
});

export default Slide;
