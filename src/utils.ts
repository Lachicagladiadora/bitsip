import { DrinkType, MealData, MealType } from "./types";

// pure functions

// petition
export const randomInputEat = async () => {
  const random = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const randomMeal = await random.json();
  const data = randomMeal["meals"][0];
  console.log({ randomMeal: data });

  return data;
};

export const randomInputDrink = async () => {
  const random = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  const randomDrink = await random.json();
  const data = randomDrink["drinks"][0];
  console.log({ randomDrink: data });

  return data;
};

export const getMeal = async (mealName: string): Promise<MealData> => {
  const meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  const newMeal = await meal.json();
  console.log({ newMeal });
  return newMeal;
};

export const getDrink = async (drinkName: string) => {
  const drink = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
  );
  const newDrink = await drink.json();
  console.log(newDrink);
};

// get a array according number in the final to property object

type GetStringListInput = {
  object: MealType | DrinkType | null;
  entry: string;
};

export const getStringList = ({ object, entry }: GetStringListInput) => {
  if (!object || !entry) return;
  const list: string[] = [];
  for (let index = 1; index < 20; index++) {
    const elementList: string = object[entry + String(index)];
    if (!elementList) return list;
    list.push(elementList);
  }
};
