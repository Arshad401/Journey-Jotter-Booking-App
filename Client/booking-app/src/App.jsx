
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import List from "./pages/List";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/hotels" element={<List/>} />
      <Route path="/hotels/:id" element={<Hotel/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
