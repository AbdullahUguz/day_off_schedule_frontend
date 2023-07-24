import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/Navbar/NavbarComp";
import Register from "./pages/Register/Register";
import Employee from "./pages/Employee/Employee";
import { useState } from "react";

function App() {

  const [activeBtn ,setActiveBtn] = useState(0);
  return (
    <BrowserRouter>
      <NavbarComp activeBtn={activeBtn}/>

      <Routes>
        <Route path="/" element={<Register  setActiveBtn={setActiveBtn}/>} />
        <Route path="/employees" element={<Employee setActiveBtn={setActiveBtn} />} />

        {/* <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Content />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      */}
        
      </Routes>

      {/* Footer */}
    </BrowserRouter>
  );
}

export default App;
