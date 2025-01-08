import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ingredient, MealType } from "../types";
import { RESPONSE_MEAL } from "../constants";
import { getIngredientsFromMeal, getMealByName } from "../utils";
import { CheckIcon, PhotoIcon } from "@heroicons/react/24/outline";

export const Meal = () => {
  const [currentMeal, setCurrentMeal] = useState<MealType | null>(null);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { meal } = useParams<string>();

  // UseEffects
  useEffect(() => {
    try {
      setIsLoading(true);
      const newMeal = async (mealName: string) => {
        if (!mealName) setCurrentMeal(RESPONSE_MEAL);
        const recipe = await getMealByName(mealName);
        setCurrentMeal(recipe ?? null);
      };
      newMeal(meal ?? "");
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
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
    <div className="w-dvw max-w-[800px] min-w-[300px] p-4 flex flex-col items-center justify-center gap-6">
      {!currentMeal && !isLoading && <p>Not found {meal} </p>}
      {!currentMeal && isLoading && <p>Loading {meal} ...</p>}
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
            <h2 className="font-WindSong text-xl text-center font-bold sm:w-52 md:w-80 md:text-2xl lg:text-3xl">
              {currentMeal.strMeal}
            </h2>
          </header>
          <main className="w-full flex flex-col gap-4">
            {/* Ingredients */}
            {ingredientsList.length > 0 && (
              <table className="border-none">
                <thead>
                  <tr>
                    <th className="font-bold text-lg text-left">Ingredients</th>
                    <th className="font-bold text-lg text-left">Quantities</th>
                    {/* <th>Year</th> */}
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
    </div>
  );
};
