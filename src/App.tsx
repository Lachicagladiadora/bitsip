import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
// import { Home } from "./components/Home";

// const mainRoute = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
//       <Route path="/drinks" element={<h1>Drinks</h1>} />
//       <Route path="/meals" element={<h1>Meals</h1>} />
//     </Route>
//   )
// );

function App() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Header />
      <div className="w-full h-full flex-1 border-2 border-cyan-600">
        <h1 className="font-bold text-4xl text-center text-red-600">Home</h1>
        {/* <React.StrictMode> */}
        {/* <RouterProvider router={mainRoute} fallbackElement="... Loading" /> */}
        {/* </React.StrictMode> */}
      </div>
      <Outlet />
      {/* <Home /> */}
      <Footer />
    </div>
  );
}

export default App;
