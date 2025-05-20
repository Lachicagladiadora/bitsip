import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { Input } from "../atoms/Input";
import { ChangeEvent, ReactNode } from "react";

type SearcherProps = {
  querySearch: string;
  proposal?: string;
  children: ReactNode;
  onChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Searcher = ({
  querySearch,
  proposal,
  children,
  onChangeQuery,
}: SearcherProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full flex gap-2 items-center justify-center">
      <Input
        type="text"
        value={querySearch}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeQuery(e)}
        placeholder={`${proposal ?? "Write a name"}`}
      />
      <button className="size-6" onClick={() => navigate(querySearch)}>
        <MagnifyingGlassIcon />
      </button>
      {children}
    </div>
  );
};
