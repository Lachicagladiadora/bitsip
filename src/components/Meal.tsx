import React from "react";
import { useParams } from "react-router-dom";

export const Meal = () => {
  const { meal } = useParams();

  return (
    <div className="h-[400px] bg-red-500">
      Meal
      <p className="bg-white">{meal}</p>
    </div>
  );
};
