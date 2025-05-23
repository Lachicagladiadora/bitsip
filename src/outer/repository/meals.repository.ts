import {, MealType } from "../../inner/types";

// #region RECIPES
export const getRandomMeal = async (): Promise<MealType | undefined> => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const randomMeal = await response.json();
    const data = randomMeal["meals"][0];
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export const getMealByName = async (
  mealName: string
): Promise<MealType | undefined> => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const newMeal = await response.json();
    const data: MealType = newMeal["meals"][0];
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export const getMealsByFirstLetter = async (
  letter: string
): Promise<MealType[] | undefined> => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();
    return data["meals"];
  } catch (error) {
    console.error({ error });
  }
};

// // main ingredient
// export const getMealsByMainIngredient = async (
//   ingredient: string
// ): Promise<MealType[] | undefined> => {
//   try {
//     const response = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
//     );
//     const data = await response.json();
//     return data["meals"];
//   } catch (error) {
//     console.error({ error });
//   }
// };
// // category
// export const getMealsByCategory = async (
//   category: string
// ): Promise<[] | undefined> => {
//   try {
//     const response = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
//     );
//     const data = await response.json();
//     return data["meals"];
//   } catch (error) {
//     console.error({ error });
//   }
// };

// // area
// export const getMealsByArea = async (
//   area: string
// ): Promise<MealType[] | undefined> => {
//   try {
//     const response = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
//     );
//     const data = await response.json();
//     return data["meals"];
//   } catch (error) {
//     console.error({ error });
//   }
// };

// // get categories
// export const getMealCategories = async (): Promise<
//   MealCategory[] | undefined
// > => {
//   try {
//     const response = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/categories.php"
//     );
//     const data = await response.json();
//     return data["categories"];
//   } catch (error) {
//     console.error({ error });
//   }
// };
