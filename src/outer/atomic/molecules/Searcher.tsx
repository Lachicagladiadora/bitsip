import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { Input } from "../atoms/Input";
import { ChangeEvent } from "react";

type SearcherProps = {
  querySearch: string;
  proposal?: string;
  type: "meal" | "drink";
  isLoading: boolean;
  autocompleteList: string[];
  onChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Searcher = ({
  querySearch,
  proposal,
  type,
  isLoading,
  autocompleteList,
  onChangeQuery,
}: SearcherProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full grid gap-2 items-center grid-cols-[1fr_auto]">
      <Input
        type="text"
        value={querySearch}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeQuery(e)}
        placeholder={`${proposal ?? "Write a name"}`}
      />
      <button
        className="size-6 md:size-10"
        onClick={() => navigate(querySearch)}
      >
        <MagnifyingGlassIcon />
      </button>
      {querySearch && (
        <ul className="scroll-ul absolute top-[100%]  w-full max-h-[480px] col-span-2 rounded-xl overflow-auto truncate line-clamp-1 bg-blank/80 dark:bg-obscure/80 text-lg">
          {isLoading && (
            <p className="last:rounded-b-xl hover:bg-grayBlank dark:hover:bg-gray">
              Loading...
            </p>
          )}
          {!isLoading && autocompleteList.length === 0 && <p>Not found</p>}
          {autocompleteList &&
            !isLoading &&
            autocompleteList.map((c, i) => (
              <li
                key={i}
                className={`last:rounded-b-xl line-clamp-1 ${
                  type === "meal" ? "hover:bg-orange" : "hover:bg-aquamarine"
                }`}
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
