import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Meal } from "./Meal";
// import App from "../App";
// import { Drinks } from "./Drinks";
// import { Home } from "./Home";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/search-meal" element={<Meals />} errorElement={<ErrorPage />}>
//       <Route path="/:meal" element={<Meal />} />
//       {/* <Route path="/search-meal/" element={<Meals />}></Route> */}
//     </Route>
//   )
// );

export const Meals = () => {
  const [meal, setMeal] = useState("");

  // const { mealParam } = useParams();
  const navigate = useNavigate();

  console.log({ meal });

  return (
    <div className="flex flex-col gap-8">
      Meals
      {/* <Meal /> */}
      <input
        type="text"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
      />
      {/* <Link to={"/search-meal/lasagna"}>Lasagna</Link> */}
      <Link
        to={`/search-meal/${meal}`}
        onClick={() => {
          setMeal("lasagna");
        }}
      >
        Lasagna
      </Link>
      <button
        onClick={() => {
          // setMeal("Pasta");
          navigate(`${meal}`);
        }}
      >
        Pasta
      </button>
      <button
        onClick={() => {
          // setMeal("Pasta");
          navigate("cake");
        }}
      >
        cake
      </button>
      <Link to={`/search-meal/${meal}`} onClick={() => setMeal("Saltado")}>
        Saltado
      </Link>
      {/* <RouterProvider router={router} /> */}
      {/* <Routes>
        <Route path="/:meal" element={<Meal />} loader action />
      </Routes> */}
    </div>
  );
};
