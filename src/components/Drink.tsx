import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DrinkType, Ingredient } from "../types";
import { RESPONSE_DRINK } from "../constants";
import { getDrinkByName, getIngredientsFromDrink } from "../utils";
import { PhotoIcon } from "@heroicons/react/24/outline";

export const Drink = () => {
  const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { drink } = useParams<string>();

  // UseEffects
  useEffect(() => {
    try {
      setIsLoading(true);
      const newDrink = async (drinkName: string) => {
        if (!drinkName) setCurrentDrink(RESPONSE_DRINK);
        const recipe = await getDrinkByName(drinkName);
        setCurrentDrink(recipe ?? null);
      };
      newDrink(drink ?? "");
      setIsLoading(false);
    } catch (error) {
      console.error({ error });
      setIsLoading(false);
    }
  }, [drink]);

  useEffect(() => {
    try {
      if (!currentDrink) return;

      const ingredients = getIngredientsFromDrink(currentDrink) ?? [];
      setIngredientsList(ingredients);
    } catch (error) {
      console.log({ error });
    }
  }, [currentDrink]);

  return (
    <div className="w-full h-full max-w-[800px] p-4 flex flex-col items-center justify-center gap-6">
      {!currentDrink && !isLoading && <p>Loading {drink} ...</p>}
      {!currentDrink && isLoading && <p>Loading {drink} ...</p>}
      {currentDrink && !isLoading && (
        <>
          <header className="w-full flex gap-4 items-center justify-center md:justify-between md:gap-none">
            {/* Title */}
            <h2 className="flex-1 font-WindSong text-xl text-center font-bold md:text-2xl lg:text-3xl">
              {currentDrink.strDrink}
            </h2>
          </header>
          <main className="w-full flex flex-col items-center justify-center gap-4">
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
            <section className="w-full">
              <h3 className="font-bold text-lg">Instructions</h3>
              <p className="font-light indent-10 whitespace-pre-line">
                {currentDrink.strInstructions}
              </p>
            </section>
            {/* Image */}
            <div className="relative flex-1 sm:w-1/2 md:h-[320px] rounded-lg shadow-md overflow-hidden">
              {currentDrink.strDrinkThumb ? (
                <img
                  src={currentDrink.strDrinkThumb}
                  alt={currentDrink.strDrinkThumb ?? "Drink image"}
                />
              ) : (
                <PhotoIcon className="h-full w-full" />
              )}
              <div className="absolute top-2 left-0 px-2 py-1 rounded-e-md text-xs bg-obscure text-blank dark:bg-blank dark:text-obscure">
                {currentDrink.strCategory}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
