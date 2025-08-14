import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowPathIcon,
  CheckIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { RESPONSE_DRINK } from "../../../inner/constants";
import { DrinkType, Ingredient } from "../../../inner/types";
import { getDrinkByName } from "../../repository/drinks.repository";
import { getIngredientsFromDrink } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import { Button } from "../atoms/Button";

export const Drink = () => {
  const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { drink } = useParams<string>();

  const navigate = useNavigate();

  // UseEffects
  useEffect(() => {
    try {
      setIsLoading(true);
      const getCurrentDrink = async (drinkName: string) => {
        if (!drinkName) setCurrentDrink(RESPONSE_DRINK);
        const recipe = await getDrinkByName(drinkName);
        setCurrentDrink(recipe ?? null);
        setIsLoading(false);
      };
      getCurrentDrink(drink ?? "");
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
      console.error({ error });
    }
  }, [currentDrink]);

  return (
    <div className="w-dvw max-w-[900px] min-w-[300px] p-4 flex flex-col items-center justify-center gap-6">
      {!currentDrink && !isLoading && (
        <div className="flex-1 rounded-lg animate-pulse bg-grayBlank shadow-sm flex items-center justify-center gap-5 dark:bg-obscure">
          Not found "{drink}""{" "}
        </div>
      )}
      {!currentDrink && isLoading && (
        <div className="flex-1 rounded-lg animate-pulse bg-grayBlank shadow-sm flex items-center justify-center gap-5 dark:bg-obscure">
          <ArrowPathIcon className="animate-spin size-10" />
          <p>Loading "{drink}" </p>
        </div>
      )}
      {currentDrink && !isLoading && (
        <>
          <header className="w-full flex flex-col gap-4 items-center justify-center md:justify-between md:gap-none">
            {/* Title */}
            <h2 className="flex-1 font-Grandstander text-xl text-center font-bold md:text-2xl lg:text-3xl">
              {currentDrink.strDrink} <span>({currentDrink.strCategory})</span>
            </h2>
            {currentDrink.strVideo && (
              <a
                href={currentDrink.strVideo}
                className="text-base flex gap-2 justify-center hover:text-aquamarine"
              >
                video tutorial
                <ArrowTopRightOnSquareIcon className="size-5" />
              </a>
            )}
          </header>
          <main className="w-full flex flex-col items-center justify-center gap-4">
            {/* Ingredients */}
            {ingredientsList.length > 0 && (
              <table className="border-none w-full">
                <thead>
                  <tr>
                    <th className="font-bold text-lg text-left">Ingredients</th>
                    <th className="font-bold text-lg text-left">Quantities</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientsList.map((c, i) => (
                    <tr key={i}>
                      <td className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        {c.strIngredient}
                      </td>
                      <td>{c.strMeasure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Instructions */}
            <section className="w-full">
              <h3 className="font-bold text-lg">Instructions</h3>
              <p className="font-light whitespace-pre-line">
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
