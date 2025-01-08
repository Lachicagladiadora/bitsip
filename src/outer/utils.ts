import {
  KeyMealTypeIngredient,
  Ingredient,
  KeyDrinkTypeIngredient,
  MealType,
  DrinkType,
} from "../inner/types";

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
