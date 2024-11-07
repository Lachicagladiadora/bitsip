import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { SearchMeal } from "./components/SearchMeal";
import { SearchDrink } from "./components/SearchDrink";
import { Meal } from "./components/Meal";
import { Drink } from "./components/Drink";

function App() {
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-between">
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
