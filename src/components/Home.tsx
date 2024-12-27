import { SparklesIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-dvh p-7 max-w-[600px] flex flex-col gap-10 items-center justify-center">
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
        <button
          onClick={() => {
            navigate("search-meal");
          }}
          className="btn-meal"
        >
          Meal
        </button>
        <button
          onClick={() => {
            navigate("search-drink");
          }}
          className="btn-drink"
        >
          Drink
        </button>
      </div>
    </div>
  );
};
