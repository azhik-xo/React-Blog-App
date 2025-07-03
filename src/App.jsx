import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import PrivateLayout from "./components/layout/PrivateLayout";

function App() {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
