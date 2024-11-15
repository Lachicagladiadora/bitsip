import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { responseMeal } from "../constants";
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
    string[] | null
  >(listAutocomplete);

  const navigate = useNavigate();

  // const randomMeal = responseMeal.meals[0];

  const randomMeal = async () => {
    const data = await getRandomMeal();
    setProposedMeal(data);
  };

  // type GetNameMealListInput = {firstLetter: string, object:MealType, entry: string}
  // const getNameMealList = async({firstLetter, object, entry}:GetNameMealListInput)=>{
  // }

  const listMealByLetter = async (value: string) => {
    if (!value) return;
    if (value.length === 1) {
      const data: MealData = await getMealByFirstLetter(value.charAt(0));
      const dataList: string[] = getNameList({
        objectList: data.meals,
        entryName: "strMeal",
      }) ?? [proposedMeal["meals"][0][""]];
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
    setQuerySearch(e.target.value);
    await listMealByLetter(e.target.value);
  };

  // console.log(listAutocomplete?.filter((c) => c.startsWith(querySearch)));
  // UseEffects
  // randomMeal();
  useEffect(() => {
    randomMeal();
  }, []);

  // #region TO-DO
  // useEffect(() => {
  //   if (!listAutocomplete) return;
  //   console.log("uwu");
  //   const updateList = listAutocomplete?.filter((c) => c.includes(querySearch));
  //   console.log("owo");
  //   // console.log({
  //   //   querySearch,
  //   //   listAutocomplete,
  //   //   updateList,
  //   //   renderListAutocomplete,
  //   // });
  //   setRenderListAutocomplete(updateList);
  //   console.log("iwi");
  // }, [listAutocomplete, querySearch]);

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
          className="w-full h-10 px-4 py-2 outline-none border border-gray rounded-lg bg-blank dark:bg-obscure flex items-center justify-center placeholder:font-WindSong placeholder:text-xl placeholder:font-bold placeholder:align-text-bottom placeholder:line-clamp-1"
        />
        <button className="size-6" onClick={() => navigate(`${querySearch}`)}>
          <MagnifyingGlassIcon />
        </button>
        {querySearch && (
          <div className="w-[88%] sm:w-[90%] md:w-[91%] absolute top-[100%] left-[6px] rounded-b-xl bg-blank/80 dark:bg-obscure/80">
            <ul className="w-full text-lg">
              {!renderListAutocomplete && <p>Not found</p>}
              {renderListAutocomplete &&
                renderListAutocomplete.map((c, i) => (
                  <li
                    key={i}
                    className="last:rounded-b-xl hover:bg-grayBlank dark:hover:bg-gray"
                  >
                    <button
                      className="w-full p-4 text-justify line-clamp-1 overflow-hidden"
                      onClick={() => navigate(c)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {!proposedMeal && <p></p>}
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
            className="w-full h-[50px] flex items-center justify-center rounded-lg uppercase font-[600] text-2xl md:text-3xl  border-[1px] border-gray bg-grayBlank text-gray hover:bg-orange hover:border-orangeBlank hover:text-orangeBlank"
          >
            Get recipe
          </button>
        </section>
      )}
    </div>
  );
};
