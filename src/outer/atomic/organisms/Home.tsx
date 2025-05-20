import { SparklesIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-7 max-w-[900px] flex flex-col gap-10 items-center justify-center">
      <p className="font-[900] text-3xl text-center md:text-4xl">
        Do you need to prepare a{" "}
        <span className="uppercase text-orange">meal</span> or prepare a{" "}
        <span className="uppercase text-aquamarine">drink</span> and you don't
        know what or how to{" "}
        <span className="relative uppercase text-yellow">
          surprise
          <SparklesIcon className="absolute -top-[30%] left-[100%] size-4" />
        </span>{" "}
        your palate?
      </p>
      <div className="w-full flex items-center justify-evenly gap-10">
        <Button
          onClick={() => {
            navigate("search-meal");
          }}
          _variant="meal"
        >
          Meal
        </Button>
        <Button
          onClick={() => {
            navigate("search-drink");
          }}
          _variant="drink"
        >
          Drink
        </Button>
      </div>
    </div>
  );
};
