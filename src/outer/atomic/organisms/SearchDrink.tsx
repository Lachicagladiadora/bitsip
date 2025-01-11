import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

import { DrinkType } from "../../../inner/types";
import { RESPONSE_DRINK } from "../../../inner/constants";
import {
  getDrinksByFirstLetter,
  getRandomDrink,
} from "../../repository/drinks.repository";
import { getNameDrinkList } from "../../utils";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export const SearchDrink = () => {
  const [proposedDrink, setProposedDrink] = useState<DrinkType | null>(null);
  const [querySearch, setQuerySearch] = useState("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<string[]>(drinks);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
        const data = (await getDrinksByFirstLetter(queryCurrent)) ?? [];
        const dataList = getNameDrinkList(data) ?? [];
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
    try {
      const randomDrink = async () => {
        const data = (await getRandomDrink()) ?? RESPONSE_DRINK;
        setProposedDrink(data);
      };
      randomDrink();
    } catch (error) {
      console.error({ error });
    }
  }, []);

  return (
    <>
      <button
        className="absolute top-8 left-8 size-6 sm:size-7 md:size-8 lg:size-9"
        onClick={() => navigate("/")}
      >
        <ChevronLeftIcon />
      </button>
      <div className="relative w-full h-full min-w-[310px] max-w-[500px] p-4 flex flex-col gap-8 items-center justify-center">
        <div className="relative w-full flex gap-2 items-center justify-center">
          <Input
            type="text"
            value={querySearch}
            onChange={onSearchDrink}
            placeholder={`${
              proposedDrink ? proposedDrink.strDrink : "Write a drink name"
            }`}
          />
          <button className="size-6" onClick={() => navigate(querySearch)}>
            <MagnifyingGlassIcon />
          </button>
          {querySearch && (
            <ul className="absolute top-[100%] left-[6px] max-h-[480px] w-[88%] sm:w-[90%] md:w-[91%] rounded-b-xl overflow-auto bg-blank/80 dark:bg-obscure/80 text-lg">
              {filteredDrinks.length === 0 && !isLoading && <p>Not found</p>}
              {isLoading && (
                <p className="last:rounded-b-xl hover:bg-grayBlank dark:hover:bg-gray">
                  Loading...
                </p>
              )}
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
              {proposedDrink.strDrinkThumb && (
                <img
                  src={proposedDrink.strDrinkThumb}
                  alt={proposedDrink.strDrink ?? "Drink image"}
                />
              )}
              {!proposedDrink.strDrinkThumb && <PhotoIcon />}
            </div>
            <Button
              onClick={() => navigate(`${proposedDrink.strDrink}`)}
              _variant="drink"
            >
              Get recipe
            </Button>
          </section>
        )}
      </div>
    </>
  );
};
