// import { SetStateAction } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

// type HomeProps = {
//   option?: "meal" | "drink" | null;
//   setOption?: (_param: "meal" | "drink" | null) => void;
// };

export const Home = () => {
  const [withOption, setWithOption] = useState(false);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-yellow-50">
      {!withOption && (
        <>
          <h3>I want a ...</h3>
          <div className="flex items-center justify-center gap-10">
            <Link
              // onClick={() => setOption("meal")}
              onClick={() => setWithOption(true)}
              // replace={true}
              to={`/meal`}
              className="px-4 py-2 rounded-lg border border-amber-200 hover:border-yellow-200 hover:text-yellow-700 hover:bg-yellow-500"
            >
              meal
            </Link>
            <Link
              // onClick={() => setOption("drink")}
              onClick={() => setWithOption(true)}
              replace={false}
              to={`/drink`}
              className="px-4 py-2 rounded-lg border border-amber-200 hover:border-yellow-200 hover:text-yellow-700 hover:bg-yellow-500"
            >
              drink
            </Link>
          </div>
        </>
      )}
      {withOption && <Outlet />}
    </div>
  );
};
