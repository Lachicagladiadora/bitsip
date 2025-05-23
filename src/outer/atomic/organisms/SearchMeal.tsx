import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";

import { MealType } from "../../../inner/types";
import { RESPONSE_MEAL } from "../../../inner/constants";
import {
  getMealsByFirstLetter,
  // getMealsByMainIngredient,
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
  // const [categories, setCategories] = useState([]);

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

  // const getAllCategorires = async () => {
  //   // #region todo: categories filter
  //   const allCategories = (await getMealCategories()) ?? [];
  //   console.log({ allCategories });
  //   setCategories(allCategories);
  //   const catList = getMealCategoryList(allCategories);
  // };
  // console.log({ categories });

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

  // useEffect(() => {
  //   getAllCategorires();
  // }, []);

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
          type="meal"
          isLoading={isLoading}
          autocompleteList={filteredMeals}
          onChangeQuery={onSearchMeal}
        />
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
