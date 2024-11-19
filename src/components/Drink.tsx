import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DrinkType } from "../types";
import { responseDrink } from "../constants";
import { getDrinkByName, getStringList } from "../utils";
import { PhotoIcon } from "@heroicons/react/24/outline";

export const Drink = () => {
  const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [measureList, setMeasureList] = useState<string[]>([]);

  const { drink } = useParams<string>();

  const newDrink = async (drinkName: string) => {
    if (!drinkName) setCurrentDrink(responseDrink);
    const recipe = await getDrinkByName(drinkName);
    setCurrentDrink(recipe ?? null);
  };

  // UseEffects
  useEffect(() => {
    newDrink(drink ?? "");
  }, [drink]);

  useEffect(() => {
    const listIngredient: string[] =
      getStringList({
        object: currentDrink,
        entry: "strIngredient",
      }) ?? [];
    setIngredientsList(listIngredient);
    const listMeasure: string[] =
      getStringList({
        object: currentDrink,
        entry: "strMeasure",
      }) ?? [];
    setMeasureList(listMeasure);
  }, [currentDrink]);

  return (
    <div className="w-full h-full max-w-[800px] p-4 flex flex-col items-center justify-center gap-6">
      {!currentDrink && (
        <p>
          <span>{drink}</span>
        </p>
      )}
      {currentDrink && (
        <>
          <header className="w-full flex gap-4 items-center justify-center md:justify-between md:gap-none">
            {/* Title */}
            <h2 className="flex-1 font-WindSong text-xl text-center font-bold md:text-2xl lg:text-3xl">
              {currentDrink?.strDrink}
            </h2>
          </header>
          <main className="w-full flex flex-col items-center justify-center gap-4">
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
            <section className="w-full">
              <h3 className="font-bold text-lg">Instructions</h3>
              <p className="font-light indent-10 whitespace-pre-line">
                {currentDrink?.strInstructions}
              </p>
            </section>
            {/* Image */}
            <div className="flex-1 sm:w-1/2 md:h-[320px] relative  rounded-lg shadow-md overflow-hidden">
              {currentDrink && currentDrink.strDrinkThumb ? (
                <img src={currentDrink.strDrinkThumb} />
              ) : (
                <PhotoIcon className="h-full w-full" />
              )}
              <div className="px-2 py-1 rounded-e-md absolute top-2 left-0 text-xs bg-obscure text-blank dark:bg-blank dark:text-obscure">
                {currentDrink?.strCategory}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
