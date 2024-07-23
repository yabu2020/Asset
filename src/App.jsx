import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Admin from "./Admin";

function App() {
  const [cUSer, setCuser] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login setCuser={setCuser} />} />
        <Route path="/home" element={<Home cUSer={cUSer} />} />
        <Route path="/dashboard" element={<Admin cUSer={cUSer} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
