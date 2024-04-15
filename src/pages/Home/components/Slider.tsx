import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Slide from "./Slide";
import { MoviesType } from "../../../types";

interface SliderProps {
  movies: MoviesType[];
}

//create a carousel of movie posters
const Slider = ({ movies }: SliderProps) => {
  return (
    <Swiper
      className="mySwiper lg:h-screen sm:h-[640px] xs:h-[520px] h-[460px] w-full"
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
      }}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      modules={[Autoplay, Navigation]}
    >
      {movies.map((movie) => {
        return (
          <SwiperSlide
            key={movie.id}
            style={{
              backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}'`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" h-full w-full "
          >
            {(isActive) => (isActive ? <Slide movie={movie} /> : null)}
          </SwiperSlide>
        );
      })}
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </Swiper>
  );
};

export default Slider;
