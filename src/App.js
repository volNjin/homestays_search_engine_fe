import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/homepage/Home";
import Homestay from "./pages/homestay/Homestay";
import List from "./pages/list/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/homes" element={<List/>}/>
        <Route path="/homes/:id" element={<Homestay/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
