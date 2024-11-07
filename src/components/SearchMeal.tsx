import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { responseMeal } from "../constants";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchMeal = () => {
  const [meal, setMeal] = useState("");

  const navigate = useNavigate();

  const randomMeal = responseMeal.meals[0];

  return (
    <div className="w-full h-full max-w-[800px] p-4 flex flex-col gap-8 items-center justify-center">
      <div className="w-full min-w-[310px] max-w-[500px] flex gap-2 items-center justify-center">
        <input
          type="text"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          placeholder={randomMeal.strMeal}
          className="w-full h-10 px-4 py-2 outline-none border border-gray rounded-lg bg-blank dark:bg-obscure flex items-center justify-center placeholder:font-WindSong placeholder:text-xl placeholder:font-bold placeholder:align-text-bottom placeholder:line-clamp-1"
        />
        <button className="size-6" onClick={() => navigate(`${meal}`)}>
          <MagnifyingGlassIcon />
        </button>
      </div>
      <section className="size-80 rounded-lg overflow-hidden">
        <img src={`${randomMeal.strMealThumb}`} alt="" />
      </section>
      <button
        onClick={() => navigate(`${randomMeal.strMeal}`)}
        className="w-[136px] h-[50px] flex items-center justify-center rounded-lg uppercase font-[600] text-2xl md:text-3xl  border-[1px] border-gray bg-grayBlank text-gray hover:bg-orange hover:border-orangeBlank hover:text-orangeBlank"
      >
        view
      </button>
    </div>
  );
};
