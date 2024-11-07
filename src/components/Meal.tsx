import { useState } from "react";
import { useParams } from "react-router-dom";
import { MealData, MealType } from "../types";
import { responseMeal } from "../constants";

export const Meal = () => {
  const [currentMeal, setCurrentMeal] = useState<MealType | null>(
    responseMeal.meals[0]
  );

  const { meal } = useParams();

  // const ingredients =[]
  // const quantities =[]

  return (
    <div className="w-full h-full max-w-[800px] p-4 flex flex-col items-center justify-center gap-6">
      <header className="flex gap-4 items-center justify-center">
        <div className="size-40 md:size-60 lg:size-80 relative">
          <img
            src={`${currentMeal?.strMealThumb}`}
            alt={`${currentMeal?.strMealThumb}`}
          />
          <div className="px-2 py-1 rounded-e-md absolute top-2 left-0 text-xs bg-obscure text-blank dark:bg-blank dark:text-obscure">
            {currentMeal?.strCategory}
          </div>
        </div>
        <h2 className="flex-1 font-WindSong text-xl md:text-2xl lg:text-3xl">
          {currentMeal?.strMeal}
        </h2>
      </header>
      <main className="flex flex-col gap-4">
        <section>
          <h3>Instructions</h3>
          <table>
            <thead>
              <tr>
                <th>Ingredients</th>
                <th>Quantities</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </section>
        <section>
          <h3>Instructions</h3>
          <p>{currentMeal?.strInstructions}</p>
        </section>
      </main>
    </div>
  );
};
