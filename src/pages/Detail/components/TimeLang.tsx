import { memo } from "react";

interface TimeLangProps {
  name: string;
  value: string;
}

//A component for showing selected movie/show's released time and language.
const TimeLang = memo(({ name, value }: TimeLangProps) => {
  return (
    <div className="flex flex-col items-start">
      <span className="text-red-200">{name}</span>
      <span
        className="
     md:text-[12.75px] sm:text-[12px] xs:text-[11.75px] text-[10.75px]  sm:py-1 py-[2.75px] sm:px-3 px-[10px] rounded-full bg-red-100 text-red-900 font-bold"
      >
        {value}
      </span>
    </div>
  );
});

export default TimeLang;
