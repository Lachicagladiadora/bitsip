import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ErrorPage } from "./ErrorPage.tsx";
import { Drinks } from "./components/Drinks.tsx";
import { Meals } from "./components/Meals.tsx";
import { Home } from "./components/Home.tsx";
import { Drink } from "./components/Drink.tsx";
import { Meal } from "./components/Meal.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Home />} />
      <Route path="/search-drink" element={<Drinks />}>
        {/* <Route path="/:drink" element={<Drink />} /> */}
      </Route>
      <Route path="/search-meal" element={<Meals />}>
        {/* <Route path="/:meal" element={<Meal />} /> */}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <App /> */}
    <RouterProvider router={router} />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
