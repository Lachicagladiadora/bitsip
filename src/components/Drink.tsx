import { useEffect, useState } from "react";
import { DrinkData, DrinkType } from "../types";

type DrinkProps = { drinkName?: string };

const getDrink = async (name: string) => {
  const newDrink = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  const drink: DrinkData = await newDrink.json();
  console.log(drink["drinks"][0]);
  return drink["drinks"][0];
};

export const Drink = ({ drinkName }: DrinkProps) => {
  const [recipe, setRecipe] = useState<DrinkType | null>(null);

  // create function Ingredients to array, le paso la receta,
  // mapIngredientsToArray=(recipe): strings[]=>{}

  useEffect(() => {
    const drinkRecipe = async () => {
      if (!drinkName) return;
      const data: DrinkType = await getDrink(drinkName);
      console.log({ data });
      setRecipe(data);
    };
    drinkRecipe();
  }, [drinkName]);

  return (
    <>
      {!recipe && (
        <p>
          <span className="capitalize">{drinkName}</span> not found
        </p>
      )}
      {recipe && (
        <>
          <header>
            <h2>
              I will drink <span>{recipe.strDrink}</span>
            </h2>
          </header>
          <section>
            <h3>ingredients</h3>
            <ul>
              <li>
                {recipe.strIngredient1} <span>{recipe.strMeasure1}</span>
              </li>
              <li>
                {recipe.strIngredient2} <span>{recipe.strMeasure2}</span>
              </li>
              <li>
                {recipe.strIngredient3} <span>{recipe.strMeasure3}</span>
              </li>
              <li>
                {recipe.strIngredient4} <span>{recipe.strMeasure4}</span>
              </li>
            </ul>
          </section>
          <section>
            <h3>instructions</h3>
            <p>{recipe["strInstructions"]}</p>
          </section>
        </>
      )}
    </>
  );
};
