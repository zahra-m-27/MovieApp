import { Error, Loader, Section } from "../../common";
import { sections } from "../../constants";
import { useGetShowsQuery } from "../../services/tmdb";
import { maxWidth } from "../../constants/styles";
import { conditonalClassName, getErrorMessage } from "../../utils/helper";
import Slider from "./components/Slider";

//Home page. fetch and display top rated and trending movies/tv shows
const Home = () => {
  const { data, isLoading, isError, error } = useGetShowsQuery({
    category: "movie",
    type: "popular",
    page: 1,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={getErrorMessage(error)} />;
  }

  const popularMovies = data?.results.slice(0, 5);

  return (
    <>
      <Slider movies={popularMovies} />
      <div
        className={conditonalClassName(
          maxWidth,
          "lg:mt-12 md:mt-8 sm:mt-6 xs:mt-4 mt-2"
        )}
      >
        {sections.map(({ title, category, type }) => (
          <Section title={title} category={category} type={type} key={title} />
        ))}
      </div>
    </>
  );
};

export default Home;
