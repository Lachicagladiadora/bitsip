import { useEffect, useState } from "react";

type OptionType = "eat" | "drink" | null;

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

function App() {
  const [showSelect, setShowSelect] = useState(false);
  const [option, setOption] = useState<OptionType>(null);
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
    // setOption("drink");
    FIRST_OPTION();
    // onChageOption();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center">
        <form onSubmit={onSubmit} action={`./${randomInput}`}>
          <div>
            I want to{" "}
            {!showSelect && (
              <button type="button" onClick={() => setShowSelect(!showSelect)}>
                {option ? `${option}` : "drink"}
              </button>
            )}
            {showSelect && (
              <select
                name="options"
                id="option-select"
                autoFocus
                title="select an option"
                onChange={(e) => onChageOption(e)}
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
              onChange={(e) => setRandomInput(e.target.value)}
            />
          )}
        </form>
      </main>
      <footer className="h-8 text-center">by Lachicagladiadora</footer>
    </>
  );
}

export default App;
