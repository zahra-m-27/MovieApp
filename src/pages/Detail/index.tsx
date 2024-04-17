import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMotion } from "../../hooks/useMotion";
import { useGetShowQuery } from "../../services/tmdb";
import { Error, Loader, Poster, Section } from "../../components";
import { mainHeading, maxWidth, paragraph } from "../../constants/styles";
import { conditonalClassName } from "../../utils/helper";
import Genre from "./components/Genre";
import Casts from "./components/Casts";
import Videos from "./components/Videos";
import TimeLang from "./components/TimeLang";

//fetch and display detailed information about a movie or a series
const Detail = () => {
  const { category, id } = useParams();
  const [show, setShow] = useState(false);
  const { fadeDown } = useMotion();

  //fetch movie data
  const {
    data: movie,
    isLoading,
    isFetching,
    isError,
  } = useGetShowQuery({
    category: String(category),
    id: Number(id),
  });

  //set document's title
  useEffect(() => {
    document.title =
      (movie?.title || movie?.name) && !isLoading
        ? movie.title || movie.name
        : "MyMovies";

    return () => {
      document.title = "MyMovies";
    };
  }, [movie?.title, isLoading, movie?.name]);

  const toggleShow = () => setShow((prev) => !prev);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Something went wrong!" />;
  }

  const {
    title,
    poster_path: posterPath,
    overview,
    name,
    genres,
    videos,
    credits,
    release_date,
    first_air_date,
    original_language,
  } = movie;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${posterPath}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  };

  return (
    <>
      <section className="w-full" style={backgroundStyle}>
        <div
          className={`${maxWidth} lg:py-36 sm:py-[136px] sm:pb-28 xs:py-28 xs:pb-12 pt-24 pb-8 flex flex-row lg:gap-12 md:gap-10 gap-8 justify-center `}
        >
          <Poster title={title} posterPath={posterPath} />
          <motion.div
            variants={fadeDown}
            initial="hidden"
            animate="show"
            className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[520px] font-nunito flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1"
          >
            <motion.h2
              variants={fadeDown}
              className={conditonalClassName(mainHeading, " md:max-w-[420px]")}
            >
              {title || name}
            </motion.h2>

            <motion.ul
              variants={fadeDown}
              className="flex flex-row items-center  sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap"
            >
              {genres.map((genre: { name: string; id: number }) => {
                return <Genre key={genre.id} name={genre.name} />;
              })}
            </motion.ul>

            <motion.p variants={fadeDown} className={paragraph}>
              <span>
                {overview.length > 200
                  ? `${show ? overview : `${overview.slice(0, 200)}...`}`
                  : overview}
              </span>
              <button
                type="button"
                className={conditonalClassName(
                  `font-bold ml-1 hover:underline transition-all duration-300`,
                  overview.length > 200 ? "inline-block" : "hidden"
                )}
                onClick={toggleShow}
              >
                {!show ? "show more" : "show less"}
              </button>
            </motion.p>

            <motion.ul
              variants={fadeDown}
              className="flex flex-row items-center  sm:gap-[40px] xs:gap-7 gap-[30px] flex-wrap"
            >
              <TimeLang
                name={first_air_date ? "first air year" : "release year"}
                value={
                  first_air_date
                    ? first_air_date.substring(0, 4)
                    : release_date.substring(0, 4)
                }
              />
              <TimeLang
                name="original language"
                value={original_language.substring(0, 4)}
              />
            </motion.ul>

            <Casts casts={credits?.cast || []} />
          </motion.div>
        </div>
      </section>

      <Videos videos={videos.results} />

      <Section
        title={`Similar ${category === "movie" ? "movies" : "series"}`}
        category={String(category)}
        className={`${maxWidth}`}
        id={Number(id)}
        showSimilarShows
      />
    </>
  );
};

export default Detail;
