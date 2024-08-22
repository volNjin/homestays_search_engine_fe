import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
import Homestay from "./pages/homestay/Homestay";
import List from "./pages/list/List";
import  Login  from "./pages/login/Login";
import Register from "./pages/register/Register"
import Favhome from "./pages/favhome/Favhome";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homes" element={<List />} />
        <Route path="/home/:id" element={<Homestay />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register/>}/>
        <Route path="/favhomes/" element={<Favhome />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
