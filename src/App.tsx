import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { WantMealOrDrink } from "./components/WantMealOrDrink";
// import { useState } from "react";
import { Home } from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:option",
        element: <WantMealOrDrink option="meal" />,
        // action: optionAction,
      },
      {
        path: "/:option",
        element: <WantMealOrDrink option="drink" />,
      },
    ],
  },
]);

// const router = createBrowserRouter(createRoutesFromElements());

function App() {
  // const [option, setOption] = useState<"meal" | "drink" | null>(null);
  return (
    <>
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <RouterProvider router={router} />
        {/* <Routes>
          <Route
            path="/"
            element={<Home option={option} setOption={setOption} />}
            errorElement={<ErrorPage />}
          >
            <Route
              path={`/${option}`}
              element={<WantMealOrDrink option={option} />}
            />
          </Route>
        </Routes> */}
        {/* <Route path="/:mealOrDrink"></Route> */}
        {/* </Route> */}
        {/* <Outlet /> */}
      </main>
      <footer className="h-8 text-center">by Lachicagladiadora</footer>
    </>
  );
}

export default App;
