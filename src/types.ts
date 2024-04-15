import { IconType } from "react-icons";

export interface ThemeType {
  title: string;
  icon: IconType;
}

export interface NavLinkType {
  title: string;
  icon: IconType;
  path: string;
}

export interface MoviesType {
  id: string;
  poster_path: string;
  original_title: string;
  name: string;
  overview: string;
  backdrop_path: string;
}
