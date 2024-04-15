import { memo, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import MoviesSlides from "./MoviesSlides";
import { SkelatonLoader } from "../Loader";
import Error from "../Error";
import { ThemeContext } from "../../context/themeContext";
import { useGetShowsQuery } from "../../services/tmdb";
import { conditonalClassName, getErrorMessage } from "../../utils/helper";

interface SectionProps {
  title: string;
  category: string;
  className?: string;
  type?: string;
  id?: number;
  showSimilarShows?: boolean;
}

//Displays a list of movie cards using the MoviesSlides component. Uses the useGetShowsQuery to fetch the list of movies to display.
const Section = memo(
  ({
    title,
    category,
    className,
    type,
    id,
    showSimilarShows,
  }: SectionProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    //The useInView hook is used to check if the section element is in the view
    const inView = useInView(ref, {
      margin: "420px",
      once: true,
    });

    const { theme } = useContext(ThemeContext);

    const {
      data = { results: [] },
      isLoading,
      isError,
      error,
    } = useGetShowsQuery(
      {
        category,
        type,
        page: 1,
        showSimilarShows,
        id,
      },
      {
        skip: !inView,
      }
    );

    const errorMessage = isError ? getErrorMessage(error) : "";

    const sectionStyle = conditonalClassName(
      `sm:py-[20px] xs:py-[18.75px] py-[16.75px] font-nunito`,
      className
    );
    const linkStyle = conditonalClassName(
      `sm:py-1 py-[2px] sm:text-[14px] xs:text-[12.75px] text-[12px] sm:px-4 px-3 rounded-full  dark:text-gray-300 hover:-translate-y-1 transition-all duration-300`,
      theme === "Dark" ? "view-all-btn--dark" : "view-all-btn--light"
    );

    return (
      <section className={sectionStyle} ref={ref}>
        <div className="flex flex-row justify-between items-center mb-[22.75px]">
          <div className=" relative">
            <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] dark:text-gray-50 sm:font-bold font-semibold">
              {title}
            </h3>
            <div className="line" />
          </div>
          {!showSimilarShows && (
            <Link to={`/${category}?type=${type}`} className={linkStyle}>
              View all
            </Link>
          )}
        </div>
        <div className="sm:h-[312px] xs:h-[309px] h-[266px]">
          {isLoading ? (
            <SkelatonLoader />
          ) : isError ? (
            <Error
              error={String(errorMessage)}
              className="h-full text-[18px]"
            />
          ) : (
            <MoviesSlides
              movies={data.results.slice(0, 10)}
              category={category}
            />
          )}
        </div>
      </section>
    );
  }
);

export default Section;
