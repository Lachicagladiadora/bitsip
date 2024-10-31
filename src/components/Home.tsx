import { Link, Navigate } from "react-router-dom";

export const Home = () => (
  <div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita enim
      dolores perferendis sequi officia iusto, consequatur quis at corporis,
      eius fugiat quibusdam veritatis reiciendis quo dolorum, reprehenderit
      nostrum asperiores ducimus!
    </p>
    <div>
      <Link
        to="search-meal"
        // replace={true}
        className="w-[130px] h-[50px] border-[1px] rounded-lg border-neutral-500 text-neutral-500 font-bold bg-neutral-300 hover:border-orange-500 hover:text-white hover:bg-orange-500"
      >
        Meal
      </Link>
      <Link
        to={"search-drink"}
        // replace={true}
        className="w-[130px] h-[50px] border-[1px] rounded-lg border-neutral-500 text-neutral-500 font-bold bg-neutral-300 hover:border-cyan-500 hover:text-white hover:bg-cyan-500"
      >
        Drink
      </Link>
    </div>
  </div>
);
