import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-yellow-50">
      <>
        <h3>I want a ...</h3>
        <div className="flex items-center justify-center gap-10">
          <Link
            to={`/meal`}
            className="px-4 py-2 rounded-lg border border-amber-200 hover:border-yellow-200 hover:text-yellow-700 hover:bg-yellow-500"
          >
            meal
          </Link>
          <Link
            to={`/drink`}
            className="px-4 py-2 rounded-lg border border-amber-200 hover:border-yellow-200 hover:text-yellow-700 hover:bg-yellow-500"
          >
            drink
          </Link>
        </div>
      </>
    </div>
  );
};
