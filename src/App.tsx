import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home";
import { ErrorPage } from "./ErrorPage";
import { WantMealOrDrink } from "./components/WantMealOrDrink";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:option",
        element: <WantMealOrDrink option="meal" />,
      },
      {
        path: "/:option",
        element: <WantMealOrDrink option="drink" />,
      },
    ],
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
