import { DrinkType } from "../../inner/types";

// #region RECIPES
export const getRandomDrink = async (): Promise<DrinkType | undefined> => {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const randomDrink = await response.json();
    const data = randomDrink["drinks"][0] as DrinkType;
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export const getDrinkByName = async (
  drinkName: string
): Promise<DrinkType | undefined> => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
    );
    const newDrink = await response.json();
    const data = newDrink["drinks"][0];
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export const getDrinksByFirstLetter = async (
  letter: string
): Promise<DrinkType[] | undefined> => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();
    return data["drinks"];
  } catch (error) {
    console.error({ error });
  }
};

// // main ingredient
// export const getDrinksByMainIngredient = async (
//   ingredient: string
// ): Promise<DrinkType[] | undefined> => {
//   try {
//     const response = await fetch(
//       `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
//     );
//     const data = await response.json();
//     return data["meals"];
//   } catch (error) {
//     console.error({ error });
//   }
// };

// // alcoholic
// export const getDrinksByAlcoholic = async (): // letter: string
// Promise<DrinkType[] | undefined> => {
//   try {
//     const response = await fetch(
//       "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
//     );
//     const data = await response.json();
//     return data["meals"];
//   } catch (error) {
//     console.error({ error });
//   }
// };
// // category
// export const getDrinksByCategory = async (
//   category: string
// ): Promise<DrinkType[] | undefined> => {
//   try {
//     const response = await fetch(
//       `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
//     );
//     const data = await response.json();
//     return data["meals"];
//   } catch (error) {
//     console.error({ error });
//   }
// };
// // glass
// export const getDrinksByGlass = async (): // letter: string
// Promise<DrinkType[] | undefined> => {
//   try {
//     const response = await fetch(
//       "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass"
//     );
//     const data = await response.json();
//     return data["meals"];
//   } catch (error) {
//     console.error({ error });
//   }
// };
