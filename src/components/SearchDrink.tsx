import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  getDrinkByFirstLetter,
  getNameDrinkList,
  getRandomDrink,
} from "../utils";
import { DrinkData, DrinkType } from "../types";

export const SearchDrink = () => {
  const [proposedDrink, setProposedDrink] = useState<DrinkType | null>(null);
  const [querySearch, setQuerySearch] = useState("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<string[]>(drinks);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const randomDrink = async () => {
    const data = await getRandomDrink();
    setProposedDrink(data);
  };

  const onSearchDrink = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const queryCurrent = e.target.value;
      setQuerySearch(queryCurrent);
      if (queryCurrent.length === 0) {
        setDrinks([]);
        setFilteredDrinks([]);
        setIsLoading(false);
        return;
      }
      if (queryCurrent.length === 1) {
        const data: DrinkData = await getDrinkByFirstLetter(queryCurrent);
        const dataList = getNameDrinkList(data.drinks) ?? [];
        setFilteredDrinks(dataList);
        setDrinks(dataList);
        setIsLoading(false);
        return;
      }
      const newList = drinks.filter((c) =>
        c.toLowerCase().includes(queryCurrent.toLowerCase())
      );
      setFilteredDrinks(newList);
      setIsLoading(false);
    } catch (error) {
      console.error({ error });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    randomDrink();
  }, []);

  return (
    <div className="w-full h-full min-w-[310px] max-w-[500px] p-4 flex flex-col gap-8 items-center justify-center">
      <div className="w-full flex gap-2 items-center justify-center relative">
        <input
          type="text"
          value={querySearch}
          onChange={onSearchDrink}
          placeholder={`${
            proposedDrink ? proposedDrink.strDrink : "Write a drink name"
          }`}
          className="input"
        />
        <button className="size-6" onClick={() => navigate(`${querySearch}`)}>
          <MagnifyingGlassIcon />
        </button>
        {querySearch && (
          <ul className="max-h-[480px] w-[88%] sm:w-[90%] md:w-[91%] absolute top-[100%] left-[6px] rounded-b-xl overflow-auto bg-blank/80 dark:bg-obscure/80 text-lg">
            {filteredDrinks.length === 0 && !isLoading && <p>Not found</p>}
            {!filteredDrinks && isLoading && <p>Loading...</p>}
            {filteredDrinks &&
              !isLoading &&
              filteredDrinks.map((c, i) => (
                <li
                  key={i}
                  className="last:rounded-b-xl hover:bg-grayBlank dark:hover:bg-gray line-clamp-1"
                >
                  <button
                    className="w-full p-4 text-justify  overflow-hidden"
                    onClick={() => navigate(c)}
                  >
                    {c}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
      {!proposedDrink && <p>I'm forgot the recipe</p>}
      {proposedDrink && (
        <section className="w-full flex flex-col items-center justify-center gap-8">
          <div className="size-full rounded-lg overflow-hidden">
            <img
              src={`${proposedDrink.strDrinkThumb}`}
              alt={`${proposedDrink.strDrinkThumb}`}
            />
          </div>
          <button
            onClick={() => navigate(`${proposedDrink.strDrink}`)}
            className="btn-drink"
          >
            Get recipe
          </button>
        </section>
      )}
    </div>
  );
};
