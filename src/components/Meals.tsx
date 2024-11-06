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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      Meals
      <input
        type="text"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
      />
      <button
        onClick={() => {
          navigate("cake");
        }}
      >
        cake
      </button>
    </div>
  );
};
