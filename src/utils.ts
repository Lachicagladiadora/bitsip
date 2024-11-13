import { DrinkType, MealData, MealType } from "./types";

// pure functions

// petition

// random
export const getRandomMeal = async () => {
  try {
    const random = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    const randomMeal = await random.json();
    const data = randomMeal["meals"][0];
    console.log({ randomMeal: data });

    return data;
  } catch (error) {
    console.error({ error });
  }
};

export const getRandomDrink = async () => {
  try {
    const random = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const randomDrink = await random.json();
    const data = randomDrink["drinks"][0];
    console.log({ randomDrink: data });

    return data;
  } catch (error) {
    console.error({ error });
  }
};

// By name
export const getMeal = async (mealName: string): Promise<MealData> => {
  try {
    const meal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const newMeal = await meal.json();
    console.log({ newMeal });
    return newMeal;
  } catch (error) {
    console.error({ error });
  }
};

export const getDrink = async (drinkName: string) => {
  try {
    const drink = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
    );
    const newDrink = await drink.json();
    console.log(newDrink);
  } catch (error) {
    console.error({ error });
  }
};

// By first letter
export const getMealByFirstLetter = async (letter: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};

// get a array according number in the final to property object

type GetStringListInput = {
  object: MealType | DrinkType | null;
  entry: string;
};

export const getStringList = ({ object, entry }: GetStringListInput) => {
  try {
    if (!object || !entry) return;
    const list: string[] = [];
    for (let index = 1; index < 20; index++) {
      const elementList: string = object[entry + String(index)];
      if (!elementList) return list;
      list.push(elementList);
    }
  } catch (error) {
    console.error({ error });
  }
};

// get array with list name from meal or drink
type GetNameList = { objectList: MealType[] | DrinkType[]; entryName: string };

export const getNameList = ({ objectList, entryName }: GetNameList) => {
  try {
    const newList: string[] = [];
    objectList.forEach((c) => {
      const name: string = c[`${entryName}`];
      newList.push(name);
    });
    return newList;
  } catch (error) {
    console.error({ error });
  }
};
