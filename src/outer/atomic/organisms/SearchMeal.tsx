import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";

import { MealType } from "../../../inner/types";
import { RESPONSE_MEAL } from "../../../inner/constants";
import {
  getMealsByFirstLetter,
  getRandomMeal,
} from "../../repository/meals.repository";
import { getNameMealList } from "../../utils";
import { Button } from "../atoms/Button";
import { Searcher } from "../molecules/Searcher";

export const SearchMeal = () => {
  const [proposedMeal, setProposedMeal] = useState<MealType | null>(null);
  const [querySearch, setQuerySearch] = useState("");
  const [meals, setMeals] = useState<string[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<string[]>(meals);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
        const data = (await getMealsByFirstLetter(queryCurrent)) ?? [];
        const dataList = getNameMealList(data) ?? [];
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
    try {
      const randomMeal = async () => {
        const data = (await getRandomMeal()) ?? RESPONSE_MEAL;
        setProposedMeal(data);
      };
      randomMeal();
    } catch (error) {
      console.error({ error });
    }
  }, []);

  return (
    <>
      <button
        className="absolute top-8 left-8 size-6 sm:size-7 md:size-8 lg:size-9"
        onClick={() => navigate("/")}
      >
        <ChevronLeftIcon />
      </button>
      <div className="w-full h-full min-w-[300px] max-w-[900px] p-4 flex flex-col gap-8 items-center justify-center">
        <Searcher
          querySearch={querySearch}
          proposal={proposedMeal?.strMeal ?? ""}
          onChangeQuery={onSearchMeal}
        >
          <>
            {querySearch && (
              <ul className="scroll-ul absolute top-[100%] left-[6px] max-h-[480px] w-[88%] sm:w-[90%] md:w-[91%] rounded-b-xl overflow-auto truncate line-clamp-1 bg-blank/80 dark:bg-obscure/80 text-lg">
                {isLoading && (
                  <p className="last:rounded-b-xl hover:bg-grayBlank dark:hover:bg-gray">
                    Loading...
                  </p>
                )}
                {!isLoading && filteredMeals.length === 0 && <p>Not found</p>}
                {filteredMeals &&
                  !isLoading &&
                  filteredMeals.map((c, i) => (
                    <li
                      key={i}
                      className="last:rounded-b-xl hover:bg-orange line-clamp-1"
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
          </>
        </Searcher>
        {!proposedMeal && <p>I'm forgot the recipe</p>}
        {proposedMeal && (
          <section className="w-full flex-1 flex flex-col items-center justify-center gap-8">
            <div
              className="w-full flex-1 rounded-lg"
              style={{
                backgroundImage: `url(${proposedMeal.strMealThumb})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* {proposedMeal.strMealThumb && (
                <img
                  className="object-cover"
                  src={proposedMeal.strMealThumb}
                  alt={proposedMeal.strMeal ?? "Meal image"}
                />
              )} */}
              {!proposedMeal.strMealThumb && <PhotoIcon />}
            </div>
            <Button
              onClick={() => navigate(`${proposedMeal.strMeal}`)}
              _variant="meal"
            >
              Get recipe
            </Button>
          </section>
        )}
      </div>
    </>
  );
};
