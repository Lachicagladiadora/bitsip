import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ingredient, MealType } from "../../../inner/types";
import { RESPONSE_MEAL } from "../../../inner/constants";
import {
  ArrowPathIcon,
  CheckIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { getMealByName } from "../../repository/meals.repository";
import { getIngredientsFromMeal } from "../../utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import { Button } from "../atoms/Button";

export const Meal = () => {
  const [currentMeal, setCurrentMeal] = useState<MealType | null>(null);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { meal } = useParams<string>();

  const navigate = useNavigate();

  // UseEffects
  useEffect(() => {
    try {
      setIsLoading(true);
      const getCurrentMeal = async (mealName: string) => {
        if (!mealName) setCurrentMeal(RESPONSE_MEAL);
        const recipe = await getMealByName(mealName);
        setCurrentMeal(recipe ?? null);
        setIsLoading(false);
      };
      getCurrentMeal(meal ?? "");
    } catch (error) {
      console.error({ error });
      setIsLoading(false);
    }
  }, [meal]);

  useEffect(() => {
    try {
      if (!currentMeal) return;

      const ingredients = getIngredientsFromMeal(currentMeal) ?? [];
      setIngredientsList(ingredients);
    } catch (error) {
      console.error({ error });
    }
  }, [currentMeal]);

  return (
    <div className="w-dvw max-w-[900px] min-w-[300px] p-4 flex flex-col items-center justify-center gap-6">
      {!currentMeal && !isLoading && (
        <div className="flex-1 rounded-lg animate-pulse bg-grayBlank shadow-sm flex items-center justify-center gap-5 dark:bg-obscure">
          Not found "{meal}""{" "}
        </div>
      )}
      {!currentMeal && isLoading && (
        <div className="flex-1 rounded-lg animate-pulse bg-grayBlank shadow-sm flex items-center justify-center gap-5 dark:bg-obscure">
          <ArrowPathIcon className="animate-spin size-10" />
          <p>Loading "{meal}" </p>
        </div>
      )}
      {currentMeal && !isLoading && (
        <>
          <header className="w-full flex flex-col gap-4 items-center justify-center sm:flex-row md:justify-between md:gap-none overflow-hidden">
            {/* Image */}
            <div className="relative flex-1 bg-center ">
              {currentMeal.strMealThumb ? (
                <img
                  src={currentMeal.strMealThumb}
                  alt={currentMeal.strMeal ?? "Meal image"}
                  className="object-cover rounded-lg shadow-md"
                />
              ) : (
                <PhotoIcon className="h-full w-full" />
              )}
              <div className="absolute top-2 left-0 px-2 py-1 rounded-e-md text-xs bg-obscure text-blank dark:bg-blank dark:text-obscure">
                {currentMeal.strCategory}
              </div>
            </div>
            {/* Title */}
            <div className="flex flex-col items-center justify-center sm:w-52 md:w-80 md:text-2xl lg:text-3xl">
              <h2 className="font-Grandstander text-2xl text-center font-bold">
                {currentMeal.strMeal}{" "}
                <span className="text-neutral-400">
                  ({currentMeal.strArea})
                </span>
              </h2>
              {currentMeal.strYoutube && (
                <a
                  href={currentMeal.strYoutube}
                  target="_blank"
                  className="text-base flex gap-2 justify-center hover:text-orange"
                >
                  video tutorial{" "}
                  <ArrowTopRightOnSquareIcon className="size-5" />
                </a>
              )}
            </div>
          </header>
          <main className="w-full flex flex-col gap-4">
            {/* Ingredients */}
            {ingredientsList.length > 0 && (
              <table className="border-none">
                <thead>
                  <tr>
                    <th className="font-bold text-lg text-left">Ingredients</th>
                    <th className="font-bold text-lg text-left">Quantities</th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    {ingredientsList.map((c, i) => (
                      <tr key={i} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        {c.strIngredient}
                      </tr>
                    ))}
                  </td>
                  <td>
                    {ingredientsList.map((c, i) => (
                      <tr key={i}>{c.strMeasure}</tr>
                    ))}
                  </td>
                </tbody>
              </table>
            )}
            {/* Instructions */}
            <section>
              <h3 className="font-bold text-lg">Instructions</h3>
              <p className="font-light whitespace-pre-line">
                {currentMeal.strInstructions}
              </p>
            </section>
          </main>
        </>
      )}
      {!isLoading && (
        <div className="w-full flex flex-col items-center justify-evenly gap-10 md:flex-row">
          <Button
            onClick={() => {
              navigate("/search-meal");
            }}
            _variant="meal"
          >
            More meals
          </Button>
          <Button
            onClick={() => {
              navigate("/search-drink");
            }}
            _variant="drink"
          >
            More drinks
          </Button>
        </div>
      )}
    </div>
  );
};
