import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getMealByFirstLetter, getNameMealList, getRandomMeal } from "../utils";
import { MealData, MealType } from "../types";

export const SearchMeal = () => {
  const [proposedMeal, setProposedMeal] = useState<MealType | null>(null);
  const [querySearch, setQuerySearch] = useState("");
  const [meals, setMeals] = useState<string[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<string[]>(meals);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const randomMeal = async () => {
    const data = await getRandomMeal();
    setProposedMeal(data);
  };

  const onSearchMeal = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const queryCurrent = e.target.value;
      setQuerySearch(queryCurrent);
      if (queryCurrent.length === 0) {
        setMeals([]);
        setFilteredMeals([]);
        setIsLoading(false);
        return;
      }
      if (queryCurrent.length === 1) {
        const data: MealData = await getMealByFirstLetter(queryCurrent);
        const dataList = getNameMealList(data.meals) ?? [];
        setFilteredMeals(dataList);
        setMeals(dataList);
        setIsLoading(false);
        return;
      }
      const newList = meals.filter((c) =>
        c.toLowerCase().includes(queryCurrent.toLowerCase())
      );
      setFilteredMeals(newList);
      setIsLoading(false);
    } catch (error) {
      console.error({ error });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    randomMeal();
  }, []);

  return (
    <div className="w-full h-full min-w-[310px] max-w-[500px] p-4 flex flex-col gap-8 items-center justify-center">
      <div className="w-full flex gap-2 items-center justify-center relative">
        <input
          type="text"
          value={querySearch}
          onChange={onSearchMeal}
          placeholder={`${
            proposedMeal ? proposedMeal.strMeal : "Write a meal name"
          }`}
          // # TO-DO
          // add event to key for select a option in renderListAutocomplete
          // onKeyDown={e=>}
          className="input"
        />
        <button className="size-6" onClick={() => navigate(`${querySearch}`)}>
          <MagnifyingGlassIcon />
        </button>
        {querySearch && (
          <ul className="max-h-[480px] w-[88%] sm:w-[90%] md:w-[91%] absolute top-[100%] left-[6px] rounded-b-xl overflow-auto truncate line-clamp-1 bg-blank/80 dark:bg-obscure/80 text-lg">
            {filteredMeals.length === 0 && !isLoading && <p>Not found</p>}
            {!filteredMeals && isLoading && <p>Loading...</p>}
            {filteredMeals &&
              !isLoading &&
              filteredMeals.map((c, i) => (
                <li
                  key={i}
                  className="last:rounded-b-xl hover:bg-grayBlank dark:hover:bg-gray line-clamp-1"
                >
                  <button
                    className="w-full p-4 text-justify  overflow-hidden"
                    onClick={() => navigate(c)}
                  >
                    {c}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
      {!proposedMeal && <p>I'm forgot the recipe</p>}
      {proposedMeal && (
        <section className="w-full flex flex-col items-center justify-center gap-8">
          <div className="size-full rounded-lg overflow-hidden">
            <img
              src={`${proposedMeal.strMealThumb}`}
              alt={`${proposedMeal.strMealThumb}`}
            />
          </div>
          <button
            onClick={() => navigate(`${proposedMeal.strMeal}`)}
            className="btn-meal"
          >
            Get recipe
          </button>
        </section>
      )}
    </div>
  );
};
