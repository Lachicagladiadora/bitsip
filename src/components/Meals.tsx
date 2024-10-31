import { useState } from "react";
import { Link } from "react-router-dom";

export const Meals = () => {
  const [meal, setMeal] = useState("");
  return (
    <div>
      Meals
      <input
        type="text"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
      />
      <Link to={"/search-meal/lasagna"}>Lasagna</Link>
    </div>
  );
};
