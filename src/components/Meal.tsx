import { useState } from "react";
import { MealData, MealType } from "../types";

type MealProps = { mealName?: string };

const getMeal = async (name: string) => {
  const newMeal = await fetch(
    `www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const meal: MealData = await newMeal.json();
  console.log(meal["meals"][0]);
  return meal["meals"][0];
};

export const Meal = ({ mealName }: MealProps) => {
  const [recipe, setRecipe] = useState<MealType | null>(null);

  const mealRecipe = async () => {
    if (!mealName) return;
    const data: MealType = await getMeal(mealName);
    console.log({ data });
    setRecipe(data);
  };

  // useEffect(() => {
  mealRecipe();
  // }, []);

  return (
    <>
      {!recipe && (
        <p>
          <span className="capitalize">{mealName}</span> not found
        </p>
      )}
      {recipe && (
        <>
          <header>
            <h2>
              I will drink <span>{recipe.strMeal}</span>
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
              <li>
                {recipe.strIngredient5} <span>{recipe.strMeasure5}</span>
              </li>
              <li>
                {recipe.strIngredient6} <span>{recipe.strMeasure2}</span>
              </li>
              <li>
                {recipe.strIngredient7} <span>{recipe.strMeasure3}</span>
              </li>
              <li>
                {recipe.strIngredient8} <span>{recipe.strMeasure4}</span>
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
