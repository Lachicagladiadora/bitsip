import { MealType } from "../../inner/types";

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
