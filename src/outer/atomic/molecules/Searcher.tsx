import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { DrinkType, MealType } from "../../../inner/types";
import { useNavigate } from "react-router-dom";
import { Input } from "../atoms/Input";

type SearcherProps = {
  querySearch: string;
  proposal: MealType | DrinkType;
  isLoading: boolean;
  filteredMeals: MealType[] | DrinkType[];
  onSearch: () => void;
};

export const Searcher = ({
  querySearch,
  proposal,
  isLoading,
  filteredMeals,
  onSearch,
}: SearcherProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full flex gap-2 items-center justify-center">
      <Input
        type="text"
        value={querySearch}
        onChange={onSearch}
        placeholder={`${
          proposal
            ? proposal?.strMeal ?? "Write a name"
            : proposal?.strDrink ?? "Write a name"
        }`}
      />
      <button className="size-6" onClick={() => navigate(querySearch)}>
        <MagnifyingGlassIcon />
      </button>
      {querySearch && (
        <ul className="absolute top-[100%] left-[6px] max-h-[480px] w-[88%] sm:w-[90%] md:w-[91%] rounded-b-xl overflow-auto truncate line-clamp-1 bg-blank/80 dark:bg-obscure/80 text-lg">
          {filteredMeals.length === 0 && !isLoading && <p>Not found</p>}
          {isLoading && (
            <p className="last:rounded-b-xl hover:bg-grayBlank dark:hover:bg-gray">
              Loading...
            </p>
          )}
          {filteredMeals &&
            !isLoading &&
            filteredMeals.map((c, i) => (
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
  );
};
