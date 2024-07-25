import { useEffect, useState } from "react";
import { OptionType } from "../types";

const randomInputEat = async () => {
  const random = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const randomMeal = await random.json();
  const data = randomMeal["meals"][0];
  console.log({ randomMeal: data });

  return data;
};

const randomInputDrink = async () => {
  const random = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  const randomDrink = await random.json();
  const data = randomDrink["drinks"][0];
  console.log({ randomDrink: data });

  return data;
};

const getMeal = async (mealName: string) => {
  const meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  const newMeal = await meal.json();
  console.log({ newMeal });
};

const getDrink = async (drinkName: string) => {
  const drink = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
  );
  const newDrink = await drink.json();
  console.log(newDrink);
};

function Home() {
  const [showSelect, setShowSelect] = useState(false);
  const [option, setOption] = useState<OptionType>("drink");
  const [randomInput, setRandomInput] = useState("");

  const onChageOption = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value;
    setOption(newOption);

    if (newOption === "drink") {
      const randomDrink = await randomInputDrink();
      console.log(randomDrink["strDrink"]);
      setRandomInput(randomDrink["strDrink"]);
    }
    if (newOption === "eat") {
      const randomMeal = await randomInputEat();
      console.log(randomMeal["strMeal"]);
      setRandomInput(randomMeal["strMeal"]);
    }
    setShowSelect(false);
  };

  const onSubmit = async () => {
    if (option === "drink") {
      const newDrink = getDrink(randomInput);
      console.log({ newDrink });
      //guardar la receta en el local storage
      return newDrink;
    }
    if (option === "eat") {
      const newMeal = getMeal(randomInput);
      console.log({ newMeal });
      return newMeal;
    }
  };

  const FIRST_OPTION = async () => {
    const data = await randomInputDrink();
    return setRandomInput(data["strDrink"]);
  };

  useEffect(() => {
    FIRST_OPTION();
  }, []);

  return (
    <>
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <form
          onSubmit={onSubmit} //poner la ruta con react router dom
          // action={`./${option}/${randomInput}`}
          className="flex flex-col gap-3 items-center justify-center"
        >
          <div className="text-xl">
            I want to{" "}
            {!showSelect && (
              <button
                type="button"
                onClick={() => setShowSelect(!showSelect)}
                className="font-bold"
              >
                {option ? `${option}` : "drink"}
              </button>
            )}
            {showSelect && (
              <select
                name="options"
                id="option-select"
                autoFocus
                title="select an option"
                onChange={onChageOption}
                className="focus-within:outline-none py-2 px-2 rounded-md mr-4 text-gray-400 focus:font-bold focus:text-black"
              >
                <option value="select option">select option</option>
                <option value="eat"> eat</option>
                <option value="drink"> drink</option>
              </select>
            )}
          </div>
          {!showSelect && (
            <input
              value={randomInput}
              //poner el random input en el placeholder
              onChange={(e) => setRandomInput(e.target.value)}
              className="py-2 px-4 rounded-md text-xl bg-[#E7D000] text-zinc-400 text-center focus-within:outline-none focus:text-start focus:text-black focus:bg-zinc-100"
            />
          )}
        </form>
        {/* // agregar un boton de random recipe */}
      </main>
    </>
  );
}

export default Home;
