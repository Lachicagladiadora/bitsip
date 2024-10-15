// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
// import { WantMealOrDrink } from "./components/WantMealOrDrink";
// import { useState } from "react";
import { Home } from "./components/Home";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/:option",
//         element: <WantMealOrDrink option={`${option}`} />,
//         // action: optionAction,
//       },
//       {
//         path: "/:option",
//         element: <WantMealOrDrink option="drink" />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(createRoutesFromElements());

function App() {
  // const [option, setOption] = useState<"meal" | "drink" | null>(null);
  return (
    <>
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        {/* <RouterProvider router={router} /> */}
        {/* <Routes>
          <Route path="/" element={<Home />} errorElement={<ErrorPage />}> */}
        {/* <Route
              path={`/${option}`}
              element={<WantMealOrDrink option={option} />}
            /> */}
        {/* </Route>
        </Routes> */}
        {/* <Route path="/:mealOrDrink"></Route> */}
        {/* </Route> */}
        {/* <Outlet /> */}
      </main>
      <footer className="h-8 text-center">by Lachicagladiadora</footer>
    </>
  );
}

// option={option} setOption={setOption}
export default App;
