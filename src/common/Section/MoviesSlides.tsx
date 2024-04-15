import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../MovieCard";
import { MoviesType } from "../../types";

interface MoviesSlidesProps {
  movies: MoviesType[];
  category: string;
}

//Displays a list of movie cards using Swiper. The component uses SwiperSlide to display each movie card
const MoviesSlides = ({ movies, category }: MoviesSlidesProps) => (
  <Swiper slidesPerView="auto" spaceBetween={15} className="mySwiper">
    {movies.map((movie) => {
      return (
        <SwiperSlide
          key={movie.id}
          className="flex mt-1 flex-col xs:gap-[14px] gap-2 max-w-[170px]  rounded-lg"
        >
          <MovieCard movie={movie} category={category} />
        </SwiperSlide>
      );
    })}
  </Swiper>
);

export default MoviesSlides;
