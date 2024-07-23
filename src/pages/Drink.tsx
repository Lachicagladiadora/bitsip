import { useEffect, useState } from "react";

type DrinkProps = { drinkName: string };

const getDrink = async (name: string) => {
  const newDrink = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  const drink = await newDrink.json();
  console.log(drink["drinks"][0]);
  return drink["drinks"][0];
};

export const Drink = ({ drinkName = "margarita" }: DrinkProps) => {
  const [recipe, setRecipe] = useState("");

  const drinkRecipe = async () => {
    const data = await getDrink(drinkName);
    console.log({ data });
    // const drinkRecipe = data;
    setRecipe(data);
  };

  useEffect(() => {
    drinkRecipe();
  });

  return (
    <div>
      <header>
        <h2>
          I will drink <span>{recipe["strDrink"]}</span>
        </h2>
      </header>
      <section>
        <h3>ingredients</h3>
        <ul>{recipe}</ul>
      </section>
      <section>
        <h3>instructions</h3>
        <p>{recipe["strInstructions"]}</p>
      </section>
    </div>
  );
};
