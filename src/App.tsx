import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Header />
      <div className="w-full h-full flex-1">content</div>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
