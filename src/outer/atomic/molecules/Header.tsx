import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <div className="w-full p-4 flex items-center justify-between">
      <h1 className="flex-1 font-WindSong font-bold text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <a href="/">BitSip</a>
      </h1>
      <button
        className="size-6 sm:size-7 md:size-8 lg:size-9"
        onClick={() => {
          setIsDarkTheme((prev) => !prev);
          const bodyElement = document.querySelector("html");
          if (!bodyElement) return;
          bodyElement.classList.toggle("dark");
        }}
      >
        {isDarkTheme ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};
