export type OptionType = "eat" | "drink" | null;

export type DrinkTypeKey =
  | "idDrink"
  | "strDrink"
  | "strDrinkAlternate"
  | "strTags"
  | "strVideo"
  | "strCategory"
  | "strIBA"
  | "strAlcoholic"
  | "strGlass"
  | "strInstructions"
  | "strInstructionsES"
  | "strInstructionsDE"
  | "strInstructionsFR"
  | "strInstructionsIT"
  | "strInstructionsZH-HANS"
  | "strInstructionsZH-HANT"
  | "strDrinkThumb"
  | "strIngredient1"
  | "strIngredient2"
  | "strIngredient3"
  | "strIngredient4"
  | "strIngredient5"
  | "strIngredient6"
  | "strIngredient7"
  | "strIngredient8"
  | "strIngredient9"
  | "strIngredient10"
  | "strIngredient11"
  | "strIngredient12"
  | "strIngredient13"
  | "strIngredient14"
  | "strIngredient15"
  | "strMeasure1"
  | "strMeasure2"
  | "strMeasure3"
  | "strMeasure4"
  | "strMeasure5"
  | "strMeasure6"
  | "strMeasure7"
  | "strMeasure8"
  | "strMeasure9"
  | "strMeasure10"
  | "strMeasure11"
  | "strMeasure12"
  | "strMeasure13"
  | "strMeasure14"
  | "strMeasure15"
  | "strImageSource"
  | "strImageAttribution"
  | "strCreativeCommonsConfirmed"
  | "dateModified";

export type DrinkType = {
  [key in DrinkTypeKey]: string | null;
};

export type MealTypeKey =
  | "idMeal"
  | "strMeal"
  | "strDrinkAlternate"
  | "strCategory"
  | "strArea"
  | "strInstructions"
  | "strMealThumb"
  | "strTags"
  | "strYoutube"
  | "strIngredient1"
  | "strIngredient2"
  | "strIngredient3"
  | "strIngredient4"
  | "strIngredient5"
  | "strIngredient6"
  | "strIngredient7"
  | "strIngredient8"
  | "strIngredient9"
  | "strIngredient10"
  | "strIngredient11"
  | "strIngredient12"
  | "strIngredient13"
  | "strIngredient14"
  | "strIngredient15"
  | "strIngredient16"
  | "strIngredient17"
  | "strIngredient18"
  | "strIngredient19"
  | "strIngredient20"
  | "strMeasure1"
  | "strMeasure2"
  | "strMeasure3"
  | "strMeasure4"
  | "strMeasure5"
  | "strMeasure6"
  | "strMeasure7"
  | "strMeasure8"
  | "strMeasure9"
  | "strMeasure10"
  | "strMeasure11"
  | "strMeasure12"
  | "strMeasure13"
  | "strMeasure14"
  | "strMeasure15"
  | "strMeasure16"
  | "strMeasure17"
  | "strMeasure18"
  | "strMeasure19"
  | "strMeasure20"
  | "strSource"
  | "strImageSource"
  | "strCreativeCommonsConfirmed"
  | "dateModified";

export type MealType = {
  [key in MealTypeKey]: string | null;
};

export type DrinkData = {
  drinks: DrinkType[];
};

export type MealData = {
  meals: MealType[];
};

export type Ingredient = { strIngredient: string; strMeasure: string };

export type KeyMealTypeIngredient =
  | "strIngredient1"
  | "strIngredient2"
  | "strIngredient3"
  | "strIngredient4"
  | "strIngredient5"
  | "strIngredient6"
  | "strIngredient7"
  | "strIngredient8"
  | "strIngredient9"
  | "strIngredient10"
  | "strIngredient11"
  | "strIngredient12"
  | "strIngredient13"
  | "strIngredient14"
  | "strIngredient15"
  | "strIngredient16"
  | "strIngredient17"
  | "strIngredient18"
  | "strIngredient19"
  | "strIngredient20"
  | "strMeasure2"
  | "strMeasure3"
  | "strMeasure4"
  | "strMeasure5"
  | "strMeasure6"
  | "strMeasure7"
  | "strMeasure8"
  | "strMeasure9"
  | "strMeasure10"
  | "strMeasure11"
  | "strMeasure12"
  | "strMeasure13"
  | "strMeasure14"
  | "strMeasure15"
  | "strMeasure16"
  | "strMeasure17"
  | "strMeasure18"
  | "strMeasure19"
  | "strMeasure20";

export type KeyDrinkTypeIngredient =
  | "strIngredient1"
  | "strIngredient2"
  | "strIngredient3"
  | "strIngredient4"
  | "strIngredient5"
  | "strIngredient6"
  | "strIngredient7"
  | "strIngredient8"
  | "strIngredient9"
  | "strIngredient10"
  | "strIngredient11"
  | "strIngredient12"
  | "strIngredient13"
  | "strIngredient14"
  | "strIngredient15"
  | "strMeasure2"
  | "strMeasure3"
  | "strMeasure4"
  | "strMeasure5"
  | "strMeasure6"
  | "strMeasure7"
  | "strMeasure8"
  | "strMeasure9"
  | "strMeasure10"
  | "strMeasure11"
  | "strMeasure12"
  | "strMeasure13"
  | "strMeasure14"
  | "strMeasure15";

export type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
export type Category = {
  label: string;
  img: string;
  description: string;
};
