// sum.test.js
import { expect, test } from "vitest";
import { getIngredientsFromDrink, getIngredientsFromMeal } from "./utils";
import {
  DRINK_INGREDIENTS_LIST,
  MEAL_INGREDIENTS_LIST,
  RESPONSE_DRINK,
  RESPONSE_MEAL,
} from "../inner/constants";

test("get ingredient list from a MEAL", () => {
  expect(getIngredientsFromMeal(RESPONSE_MEAL)).toEqual(MEAL_INGREDIENTS_LIST);
});

test("get ingredient list from a DRINK", () => {
  expect(getIngredientsFromDrink(RESPONSE_DRINK)).toEqual(
    DRINK_INGREDIENTS_LIST
  );
});
