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
    // console.log({ randomMeal: data });

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
    // console.log({ randomDrink: data });

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
    // console.log({ mealByName: data });
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
    // console.log(data);
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
// get array with list name from meal or drink
type GetNamesList = {
  objectList: MealType[] | DrinkType[];
  entryName: "strMeal" | "strDrink";
};

export const getNameList = ({
  objectList,
  entryName,
}: GetNamesList): string[] | undefined => {
  try {
    const newList: string[] = [];
    objectList.forEach((c) => {
      const name = c[entryName];
      console.log({ name });
      newList.push(name);
    });
    console.log({ newList });
    return newList;
  } catch (error) {
    // #region TO-DO: review with "q", "z","x"
    console.error({ error });
  }
};

// type GetCapitalizeStringInput = { string: string };

// export const getCapitalizeString = ({ string }: GetCapitalizeStringInput) => {
//   const arrayString = string.split("");
//   console.log({ arrayString });
//   const array = arrayString.map((c) => {
//     if (connectors.map((article) => article === c)) return c;
//     const firstLetter = c.slice(0, 1);
//     const restOfTheWord = c.slice(1);
//     const word = firstLetter.toLocaleUpperCase() + restOfTheWord;
//     console.log({ word });
//     return word;
//   });
//   return array[0];
// };
