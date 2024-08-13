import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import { ErrorPage } from "./ErrorPage";
import { Drink } from "./components/Drink";
import { Meal } from "./components/Meal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:eat/:strMeal",
    element: <Meal />,
  },
  {
    path: "/:drink/:strDrink",
    element: <Drink />,
  },
]);

function App() {
  return (
    <>
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <RouterProvider router={router} />
      </main>
      <footer className="h-8 text-center">by Lachicagladiadora</footer>
    </>
  );
}

export default App;
