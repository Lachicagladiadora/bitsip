import { useEffect, useState } from "react";
import { StrCategory } from "../../../inner/types";
import { Link } from "react-router-dom";
import { getCategoriesMeal } from "../../repository/meals.repository";

export const Categories = () => {
  const [categories, setCategories] = useState<StrCategory[] | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      const data = await getCategoriesMeal();
      setCategories(data);
    };
    getCategories();
  }, []);
  return (
    <div className="w-full h-full">
      <ul>
        {categories?.map((c, i) => (
          <li key={i}>
            <Link to={"/categories/:category"}>{c.strCategory}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
