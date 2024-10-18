import { SunIcon } from "@heroicons/react/24/outline";
import { Bars2Icon, MoonIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    if (!bodyElement) return;
    bodyElement.classList.toggle("dark");
  }, [isDarkTheme]);

  return (
    <div className="w-full h-20 px-4 flex items-center justify-between text-black dark:text-white">
      <button className="size-6 text-black dark:text-white">
        <Bars2Icon />
      </button>
      <h1 className="text-black dark:text-white">BitSip</h1>
      <button
        className="size-6 text-black dark:text-white"
        onClick={() => setIsDarkTheme((prev) => !prev)}
      >
        {isDarkTheme ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};
