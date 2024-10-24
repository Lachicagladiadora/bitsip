import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    if (!bodyElement) return;
    bodyElement.classList.toggle("dark");
  }, [isDarkTheme]);

  return (
    <div className="w-full px-4 flex items-center justify-between">
      <h1 className="">
        <a href="/">BitSip</a>
      </h1>
      <button
        className="size-8 "
        onClick={() => setIsDarkTheme((prev) => !prev)}
      >
        {isDarkTheme ? <SunIcon /> : <MoonIcon className="text-inherit" />}
      </button>
    </div>
  );
};
