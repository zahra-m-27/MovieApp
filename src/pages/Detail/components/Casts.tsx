import { useMediaQuery } from "usehooks-ts";
import { motion } from "framer-motion";
import Image from "../../../common/Image";
import { memo } from "react";

interface CastsProps {
  casts: {
    id: string;
    profile_path: string;
    name: string;
  }[];
}

//Displays a list of top cast of a movie or show. uses the framer-motion library for animations.
const Casts = memo(
  ({ casts }: CastsProps) => {
    const isNotMobile = useMediaQuery("(min-width: 768px)");
    const fadeDown = {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    };

    if (casts.length === 0) return null;

    const topCasts = casts.slice(0, 4);

    return (
      <>
        <motion.h3
          variants={fadeDown}
          className="text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]"
        >
          Top Casts
        </motion.h3>
        <motion.div
          initial="hidden"
          animate="show"
          className="flex flex-wrap md:gap-4 sm:gap-[14px] gap-2 sm:-mt-2 xs:-mt-[6px] -mt-1"
        >
          {topCasts.map((cast) => {
            const { id, profile_path: profilePath, name } = cast;
            return (
              <motion.figure
                key={id}
                className="flex flex-col justify-start gap-2"
              >
                <div className="md:h-[96px] md:w-[64px] h-[54px] w-[40px]">
                  <Image
                    width={isNotMobile ? 64 : 40}
                    height={isNotMobile ? 96 : 54}
                    src={`https://image.tmdb.org/t/p/original/${profilePath}`}
                    alt={name}
                    className=" object-cover rounded-md shadow-md"
                  />
                </div>

                <h4 className="text-gray-300 md:text-[12px] sm:text-[10.75px] text-[10px] md:max-w-[64px] text-center font-semibold sm:-mt-0 leading-snug max-w-[40px]">
                  {name}
                </h4>
              </motion.figure>
            );
          })}
        </motion.div>
      </>
    );
  },
  //A custom comparison function so the component will only re-render if the id of the first cast member changes.
  (prevProps, newProps) => {
    return prevProps.casts[0]?.id === newProps.casts[0]?.id;
  }
);

export default Casts;
