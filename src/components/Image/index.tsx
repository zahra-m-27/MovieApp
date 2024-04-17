import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { conditonalClassName } from "../../utils/helper";

interface ImageProps {
  src: string;
  className: string;
  alt: string;
  width: string | number;
  height: string | number;
  effect?: "zoomIn";
}

//Displays an image with a lazy loading effect
const Image = ({ src, className, width, alt, height, effect }: ImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <LazyLoadImage
      style={{ width: width, height: height }}
      src={src}
      alt={alt}
      className={conditonalClassName(
        "transition-all duration-300 ease-in",
        className,
        !isImageLoaded
          ? `opacity-0 ${effect === "zoomIn" ? "scale-95" : ""}`
          : `opacity-100 ${effect === "zoomIn" ? "scale-100" : ""}`
      )}
      onLoad={onLoad}
    />
  );
};

export default Image;
