import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { Drink } from "./components/Drink.tsx";
// import { Meal } from "./components/Meal.tsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />} errorElement={<ErrorPage />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/search-drink" element={<Drinks />}>
//         {/* <Route path="/margarita" element={<Drink />} /> */}
//       </Route>
//       <Route path="/search-meal" element={<Meals />}>
//         {/* <Route path="/:meal" element={<Meal />} /> */}
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <RouterProvider router={router} /> */}
    </BrowserRouter>
  </React.StrictMode>
);
