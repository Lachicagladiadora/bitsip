import {
  DrinkType,
  Ingredient,
  KeyDrinkTypeIngredient,
  KeyMealTypeIngredient,
  MealType,
} from "./types";

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

// region INGREDIENTS

type GetIngredientsFromMealInput = {
  [key in KeyMealTypeIngredient]: string | null;
} & {
  [key in string]: string | null;
};

export const getIngredientsFromMeal = (
  meal: GetIngredientsFromMealInput
): Ingredient[] | undefined => {
  try {
    if (!meal) return;
    const list: Ingredient[] = [];
    for (let index = 1; index < 20; index++) {
      const propertyIngredient: string = "strIngredient" + index.toString();
      const propertyMeasure: string = "strMeasure" + index.toString();
      const ingredient = meal[propertyIngredient];
      const measure = meal[propertyMeasure];

      if (!ingredient || !measure) return list;
      const newIngredient: Ingredient = {
        strIngredient: ingredient,
        strMeasure: measure,
      };
      list.push(newIngredient);
    }
    return list;
  } catch (error) {
    console.error({ error });
  }
};

type GetIngredientsFromDrinkInput = {
  [key in KeyDrinkTypeIngredient]: string | null;
} & {
  [key in string]: string | null;
};

export const getIngredientsFromDrink = (
  drink: GetIngredientsFromDrinkInput
): Ingredient[] | undefined => {
  try {
    if (!drink) return;
    const list: Ingredient[] = [];
    for (let index = 1; index < 20; index++) {
      const propertyIngredient: string = "strIngredient" + index.toString();
      const propertyMeasure: string = "strMeasure" + index.toString();
      const ingredient = drink[propertyIngredient];
      const measure = drink[propertyMeasure];

      if (!ingredient || !measure) return list;
      const newIngredient: Ingredient = {
        strIngredient: ingredient,
        strMeasure: measure,
      };
      list.push(newIngredient);
    }
    return list;
  } catch (error) {
    console.error({ error });
  }
};

// #region NAME LIST

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
