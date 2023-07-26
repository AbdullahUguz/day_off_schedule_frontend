import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/Navbar/NavbarComp";
import Register from "./pages/Register/Register";
import Employee from "./pages/Employee/Employee";
import { useState } from "react";

function App() {
  const [activeBtn, setActiveBtn] = useState(0);
  return (
    <BrowserRouter>
      <NavbarComp activeBtn={activeBtn} />
      <Routes>
        <Route path="/" element={<Register setActiveBtn={setActiveBtn} />} />
        <Route
          path="/employees"
          element={<Employee setActiveBtn={setActiveBtn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
