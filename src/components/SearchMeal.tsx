import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getMealByFirstLetter, getNameList, getRandomMeal } from "../utils";
import { MealData, MealType } from "../types";

export const SearchMeal = () => {
  const [proposedMeal, setProposedMeal] = useState<MealType | null>(null);
  const [querySearch, setQuerySearch] = useState("");
  const [listAutocomplete, setListAutocomplete] = useState<string[] | null>(
    null
  );
  const [renderListAutocomplete, setRenderListAutocomplete] = useState<
    string[] | null | "Loading"
  >(listAutocomplete);

  const navigate = useNavigate();

  const randomMeal = async () => {
    const data = await getRandomMeal();
    setProposedMeal(data);
  };

  const listMealByLetter = async (value: string) => {
    if (!value) return;
    if (value.length === 1) {
      setRenderListAutocomplete("Loading");
      const data: MealData = await getMealByFirstLetter(value.charAt(0));
      const dataList: string[] | null =
        getNameList({
          objectList: data.meals,
          entryName: "strMeal",
        }) ?? null;
      if (!dataList) return;
      setRenderListAutocomplete(dataList);
      setListAutocomplete(dataList);
      console.log({ data, dataList, value });
    }

    // if (!listAutocomplete) return;
    // console.log({ listAutocomplete, renderListAutocomplete });
    // const updateList: string[] = listAutocomplete.filter((c) =>
    //   c.startsWith(value)
    // );
    // setRenderListAutocomplete(updateList);
    // console.log({ value, listAutocomplete, renderListAutocomplete });

    // return dataList
  };

  const onSearchMeal = async (e: ChangeEvent<HTMLInputElement>) => {
    const queryCurrent = e.target.value;
    setQuerySearch(queryCurrent);
    if (queryCurrent.length <= 1) {
      await listMealByLetter(queryCurrent);
      return;
    }
    // #region TO-DO
    // const queryAutocomplete = queryCurrent
    // const firstWord = getCapitalizeString({ string: queryCurrent });
    // console.log({ firstWord, listAutocomplete });
    // const updateList = listAutocomplete?.filter((c) =>
    //   c.startsWith(getCapitalizeString({ string: queryCurrent }))
    // );
    // console.log({ updateList });
    // setRenderListAutocomplete(updateList ?? null);
  };

  useEffect(() => {
    randomMeal();
  }, []);

  return (
    <div className="w-full h-full min-w-[310px] max-w-[500px] p-4 flex flex-col gap-8 items-center justify-center">
      <div className="w-full flex gap-2 items-center justify-center relative">
        <input
          type="text"
          value={querySearch}
          onChange={onSearchMeal}
          placeholder={`${
            proposedMeal ? proposedMeal.strMeal : "Write a meal name"
          }`}
          // # TO-DO
          // add event to key for select a option in renderListAutocomplete
          // onKeyDown={e=>}
          className="input"
        />
        <button className="size-6" onClick={() => navigate(`${querySearch}`)}>
          <MagnifyingGlassIcon />
        </button>
        {querySearch && (
          <ul className="max-h-[480px] w-[88%] sm:w-[90%] md:w-[91%] absolute top-[100%] left-[6px] rounded-b-xl overflow-auto truncate line-clamp-1 bg-blank/80 dark:bg-obscure/80 text-lg">
            {!renderListAutocomplete && <p>Not found</p>}
            {renderListAutocomplete === "Loading" && <p>Loading...</p>}
            {renderListAutocomplete &&
              typeof renderListAutocomplete !== "string" &&
              renderListAutocomplete.map((c, i) => (
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
      {!proposedMeal && <p>I'm forgot the recipe</p>}
      {proposedMeal && (
        <section className="w-full flex flex-col items-center justify-center gap-8">
          <div className="size-full rounded-lg overflow-hidden">
            <img
              src={`${proposedMeal.strMealThumb}`}
              alt={`${proposedMeal.strMealThumb}`}
            />
          </div>
          <button
            onClick={() => navigate(`${proposedMeal.strMeal}`)}
            className="btn-meal"
          >
            Get recipe
          </button>
        </section>
      )}
    </div>
  );
};
