import { useEffect, useState } from "react";
import { OptionType } from "../types";
import { Form } from "react-router-dom";
import { getDrink, getMeal, randomInputDrink, randomInputEat } from "../utils";

function Home() {
  const [showSelect, setShowSelect] = useState(false);
  const [option, setOption] = useState<OptionType>("drink");
  const [randomInput, setRandomInput] = useState("");

  const onChageOption = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption: OptionType = e.target.value;
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log({ e });
    e.preventDefault();
    if (option === "drink") {
      const newDrink = await getDrink(randomInput);
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
    FIRST_OPTION();
  }, []);

  return (
    <>
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <Form
          onSubmit={onSubmit} //poner la ruta con react router dom
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
              placeholder={randomInput}
              onChange={(e) => setRandomInput(e.target.value)}
              className="py-2 px-4 rounded-md text-xl bg-[#E7D000] text-zinc-400 text-center focus-within:outline-none focus:text-start focus:text-black focus:bg-zinc-100"
            />
          )}
        </Form>
        {/* // agregar un boton de random recipe */}
      </main>
    </>
  );
}

export default Home;
