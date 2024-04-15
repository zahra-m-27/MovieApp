import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CatalogHeader from "./components/CatalogHeader";
import Search from "./components/Search";
import { MoviesType } from "../../types";
import { useGetShowsQuery } from "../../services/tmdb";
import { smallMaxWidth } from "../../constants/styles";
import { Error, MovieCard, SkelatonLoader } from "../../common";
import { getErrorMessage } from "../../utils/helper";

//displays a list of movies based on the user's search query and selected category
const Catalog = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<MoviesType[]>([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const [query, setQuery] = useSearchParams();
  const { category } = useParams();
  const type = query.get("type") || "popular";
  const searchQuery = query.get("search") || "";
  const { data, isLoading, isFetching, isError, error } = useGetShowsQuery({
    category,
    page,
    searchQuery,
    type,
  });

  //update the movie list when the category or search query changes
  useEffect(() => {
    setPage(1);
    setIsCategoryChanged(true);
  }, [category, searchQuery]);

  //add more movies to the list when the user clicks the "Load more" button
  useEffect(() => {
    if (isLoading || isFetching) return;

    if (data?.results) {
      if (page > 1) {
        setShows((prev) => [...prev, ...data.results]);
      } else {
        setShows([...data.results]);
        setIsCategoryChanged(false);
      }
    }
  }, [data, isFetching, isLoading, page]);

  //if there's any error in fetching data, shows it
  if (isError) {
    return <Error error={getErrorMessage(error)} />;
  }

  return (
    <>
      <CatalogHeader category={String(category)} />
      <section className={`${smallMaxWidth} `}>
        <Search setQuery={setQuery} />

        {isLoading || isCategoryChanged ? (
          <SkelatonLoader isMoviesSliderLoader={false} />
        ) : (
          <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center">
            {shows?.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
              >
                <MovieCard movie={movie} category={String(category)} />
              </div>
            ))}
          </div>
        )}

        {isFetching && !isCategoryChanged ? (
          <SkelatonLoader
            isMoviesSliderLoader={false}
            className="md:pt-8 sm:pt-7 pt-6"
          />
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={isFetching}
              className="sm:py-2 xs:py-[6px] py-1 sm:px-4 xs:px-3 px-[10.75px] bg-[#ff0000] text-gray-50 rounded-full md:text-[15.25px] sm:text-[14.75px] xs:text-[14px] text-[12.75px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito lg:my-8 my-7"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Catalog;
