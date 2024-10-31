import { useState } from "react";
import { Link } from "react-router-dom";

export const Drinks = () => {
  const [drink, setDrink] = useState("");

  return (
    <div>
      Drinks
      <input
        type="text"
        value={drink}
        onChange={(e) => setDrink(e.target.value)}
      />
      <Link to={"/search-drink/margarita"}>Margarita</Link>
    </div>
  );
};
