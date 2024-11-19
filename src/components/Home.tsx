import { SparklesIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-7 max-w-[600px] flex flex-col gap-10">
      <p className="font-[900] text-3xl text-center md:text-4xl">
        Do you need to prepare a{" "}
        <span className="uppercase text-orange">meal</span> or prepare a{" "}
        <span className="uppercase text-aquamarine">drink</span> and you don't
        know what or how to{" "}
        <span className="uppercase text-yellow relative ">
          surprise
          <SparklesIcon className="absolute -top-[30%] left-[99%] size-4" />
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
