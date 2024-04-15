import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//return possible errors during data fetching
export const getErrorMessage = (error: any) => {
  let errorMessage;

  if (error)
    if ("status" in error)
      errorMessage = "error" in error ? error.error : error.data.status_message;
    else errorMessage = error.message;
  else errorMessage = "Unable to fetch the data. Please try again later.";

  return errorMessage;
};

//save theme in local storage
export const saveTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
};

//get theme from local storage
export const getTheme = () => {
  const theme = localStorage.getItem("theme");
  return theme ? theme : "";
};

// apply and merge given class names based on given conditions
export function conditonalClassName(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
