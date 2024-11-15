import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MealType } from "../types";
import { responseMeal } from "../constants";
import { getMealByName, getStringList } from "../utils";
import { PhotoIcon } from "@heroicons/react/24/outline";

export const Meal = () => {
  const [currentMeal, setCurrentMeal] = useState<MealType | null>(null);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [measureList, setMeasureList] = useState<string[]>([]);

  const { meal } = useParams<string>();

  const newMeal = async (mealName: string) => {
    if (!mealName) setCurrentMeal(responseMeal);
    const recipe = await getMealByName(mealName);
    setCurrentMeal(recipe ?? null);
  };

  // UseEffects
  useEffect(() => {
    newMeal(meal ?? "");
  }, [meal]);

  useEffect(() => {
    const listIngredient: string[] =
      getStringList({
        object: currentMeal,
        entry: "strIngredient",
      }) ?? [];
    setIngredientsList(listIngredient);
    const listMeasure: string[] =
      getStringList({
        object: currentMeal,
        entry: "strMeasure",
      }) ?? [];
    setMeasureList(listMeasure);
  }, [currentMeal]);

  return (
    <div className="w-full h-full max-w-[800px] p-4 flex flex-col items-center justify-center gap-6">
      {!currentMeal && (
        <p>
          <span>{meal}</span>
        </p>
      )}
      {currentMeal && (
        <>
          <header className="w-full flex gap-4 items-center justify-center md:justify-between md:gap-none">
            {/* Image */}
            <div className="size-48 sm:w-1/2 md:h-[320px] relative bg-center bg-cover rounded-lg shadow-md overflow-hidden">
              {currentMeal && currentMeal.strMealThumb ? (
                <img src={currentMeal.strMealThumb} />
              ) : (
                <PhotoIcon className="h-full w-full" />
              )}
              <div className="px-2 py-1 rounded-e-md absolute top-2 left-0 text-xs bg-obscure text-blank dark:bg-blank dark:text-obscure">
                {currentMeal?.strCategory}
              </div>
            </div>
            {/* Title */}
            <h2 className="flex-1 font-WindSong text-xl text-center font-bold md:text-2xl lg:text-3xl">
              {currentMeal?.strMeal}
            </h2>
          </header>
          <main className="w-full flex flex-col gap-4">
            {/* Ingredients */}
            <section className="w-full flex">
              <div className="flex-1">
                <h3 className="font-bold text-lg">Ingredients</h3>
                <ol className="list-inside list-disc">
                  {ingredientsList.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ol>
              </div>
              <div className="w-1/2 md:w-1/3">
                <h3 className="font-bold text-lg">Quantities</h3>
                <ul>
                  {measureList.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </section>
            {/* Instructions */}
            <section>
              <h3 className="font-bold text-lg">Instructions</h3>
              <p className="font-light">{currentMeal?.strInstructions}</p>
            </section>
          </main>
        </>
      )}
    </div>
  );
};
