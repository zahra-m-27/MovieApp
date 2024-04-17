import { memo } from "react";
import { m } from "framer-motion";

import Image from "../Image";
import { conditonalClassName } from "../../utils/helper";
import { useMotion } from "../../hooks/useMotion";

interface PosterPropsType {
  posterPath: string;
  title: string;
  className?: string;
}

//displays a movie poster with a specified width and height
const Poster = memo(({ posterPath, title, className }: PosterPropsType) => {
  const { zoomIn } = useMotion();
  return (
    <div className={conditonalClassName(`md:block hidden `, className)}>
      <m.div
        variants={zoomIn(0.6, 0.8)}
        initial="hidden"
        animate="show"
        className="h-[380px] w-[254px]"
      >
        <Image
          width={254}
          height={380}
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={title}
          className="object-cover rounded-xl  shadow-lg"
        />
      </m.div>
    </div>
  );
});

export default Poster;
