import {
  DrinkType,
  Ingredient,
  KeyDrinkTypeIngredient,
  KeyMealTypeIngredient,
  MealType,
} from "./types";

// pure functions

// #region Petition
export const getRandomMeal = async () => {
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

export const getRandomDrink = async () => {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const randomDrink = await response.json();
    const data = randomDrink["drinks"][0];
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export const getMealByName = async (mealName: string) => {
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

export const getDrinkByName = async (drinkName: string) => {
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

export const getDrinkByFirstLetter = async (letter: string) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};

type GetIngredientMealInput = {
  [key in KeyMealTypeIngredient]: string | null;
} & {
  [key in string]: string | null;
};

const getIngredientMeal = (object: GetIngredientMealInput) => {
  try {
    if (!object) return;
    const list: Ingredient[] = [];
    for (let index = 1; index < 20; index++) {
      const propertyIngredient: string = "strIngredient" + index.toString();
      const propertyMeasure: string = "strMeasure" + index.toString();
      const ingredient = object[propertyIngredient];
      const measure = object[propertyMeasure];

      if (!ingredient || !measure) return list;
      const newIngredient: Ingredient = {
        strIngredient: ingredient,
        strMeasure: measure,
      };
      list.push(newIngredient);
    }
  } catch (error) {
    console.error({ error });
  }
};

type GetIngredientDinkInput = {
  [key in KeyDrinkTypeIngredient]: string | null;
} & {
  [key in string]: string | null;
};

export const getIngredientDink = (object: GetIngredientDinkInput) => {
  try {
    if (!object) return;
    const list: Ingredient[] = [];
    for (let index = 1; index < 20; index++) {
      const propertyIngredient: string = "strIngredient" + index.toString();
      const propertyMeasure: string = "strMeasure" + index.toString();
      const ingredient = object[propertyIngredient];
      const measure = object[propertyMeasure];

      if (!ingredient || !measure) return list;
      const newIngredient: Ingredient = {
        strIngredient: ingredient,
        strMeasure: measure,
      };
      list.push(newIngredient);
    }
  } catch (error) {
    console.error({ error });
  }
};

export const getIngredientsFromMeal = (meal: MealType) => {
  const ingredients = getIngredientMeal(meal);
  return ingredients;
};

export const getIngredientsFromDrink = (drink: DrinkType) => {
  const ingredients = getIngredientDink(drink);
  return ingredients;
};

// #region other functions

export const getNameMealList = (
  objectList: MealType[]
): string[] | undefined => {
  try {
    const newList: string[] = [];
    objectList.forEach((c) => {
      const name = c["strMeal"];
      if (!name) return;
      newList.push(name);
    });
    return newList;
  } catch (error) {
    console.error({ error });
  }
};

export const getNameDrinkList = (
  objectList: DrinkType[]
): string[] | undefined => {
  try {
    const newList: string[] = [];
    objectList.forEach((c) => {
      const name = c["strDrink"];
      if (!name) return;
      newList.push(name);
    });
    return newList;
  } catch (error) {
    console.error({ error });
  }
};
