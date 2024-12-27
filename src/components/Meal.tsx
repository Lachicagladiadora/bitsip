import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ingredient, MealType } from "../types";
import { responseMeal } from "../constants";
import { getIngredientsFromMeal, getMealByName } from "../utils";
import { PhotoIcon } from "@heroicons/react/24/outline";

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
        if (!mealName) setCurrentMeal(responseMeal);
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
    <div className="w-full h-full max-w-[800px] p-4 flex flex-col items-center justify-center gap-6">
      {!currentMeal && !isLoading && <p>Not found {meal} </p>}
      {!currentMeal && isLoading && <p>Loading {meal} ...</p>}
      {currentMeal && !isLoading && (
        <>
          <header className="w-full flex gap-4 items-center justify-center md:justify-between md:gap-none">
            {/* Image */}
            <div className="relative size-48 sm:w-1/2 md:h-[320px] bg-center bg-cover rounded-lg shadow-md overflow-hidden">
              {currentMeal.strMealThumb ? (
                <img
                  src={currentMeal.strMealThumb}
                  alt={currentMeal.strMeal ?? "Meal image"}
                />
              ) : (
                <PhotoIcon className="h-full w-full" />
              )}
              <div className="absolute top-2 left-0 px-2 py-1 rounded-e-md text-xs bg-obscure text-blank dark:bg-blank dark:text-obscure">
                {currentMeal.strCategory}
              </div>
            </div>
            {/* Title */}
            <h2 className="flex-1 font-WindSong text-xl text-center font-bold md:text-2xl lg:text-3xl">
              {currentMeal.strMeal}
            </h2>
          </header>
          <main className="w-full flex flex-col gap-4">
            {/* Ingredients */}
            {ingredientsList.length > 0 && (
              <section className="w-full flex">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Ingredients</h3>
                  <ol className="list-inside list-disc">
                    {ingredientsList.map((c, i) => (
                      <li key={i}>{c.strIngredient}</li>
                    ))}
                  </ol>
                </div>
                <div className="w-1/2 md:w-1/3">
                  <h3 className="font-bold text-lg">Quantities</h3>
                  <ul>
                    {ingredientsList.map((c, i) => (
                      <li key={i}>{c.strMeasure}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
            {/* Instructions */}
            <section>
              <h3 className="font-bold text-lg">Instructions</h3>
              <p className="font-light indent-10 whitespace-pre-line">
                {currentMeal?.strInstructions}
              </p>
            </section>
          </main>
        </>
      )}
    </div>
  );
};
