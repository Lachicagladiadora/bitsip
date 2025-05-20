import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./outer/atomic/molecules/Header";
import { Home } from "./outer/atomic/organisms/Home";
import { SearchMeal } from "./outer/atomic/organisms/SearchMeal";
import { SearchDrink } from "./outer/atomic/organisms/SearchDrink";
import { Meal } from "./outer/atomic/organisms/Meal";
import { Drink } from "./outer/atomic/organisms/Drink";

function App() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-between">
      <Header />
      <Outlet />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search-meal" element={<SearchMeal />} />
        <Route path="/search-meal/:meal" element={<Meal />} />

        <Route path="/search-drink" element={<SearchDrink />} />
        <Route path="/search-drink/:drink" element={<Drink />} />
      </Routes>

      <p className="p-2">by Lachicagladiadora</p>
    </div>
  );
}

export default App;
