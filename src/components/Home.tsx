export const Home = () => {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita enim
        dolores perferendis sequi officia iusto, consequatur quis at corporis,
        eius fugiat quibusdam veritatis reiciendis quo dolorum, reprehenderit
        nostrum asperiores ducimus!
      </p>
      <div>
        <button className="w-[130px] h-[50px] border-[1px] rounded-lg border-neutral-500 text-neutral-500 font-bold bg-neutral-300 hover:border-orange-500 hover:text-white hover:bg-orange-500">
          Meal
        </button>
        <button className="w-[130px] h-[50px] border-[1px] rounded-lg border-neutral-500 text-neutral-500 font-bold bg-neutral-300 hover:border-cyan-500 hover:text-white hover:bg-cyan-500">
          Drink
        </button>
      </div>
    </div>
  );
};
