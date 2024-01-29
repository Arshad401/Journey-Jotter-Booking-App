
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import List from "./pages/List";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";
import ComingSoonPage from "./pages/ComingSoon";
import Payment from "./components/Payment";

function App() {
  

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/hotels" element={<List/>} />
      <Route path="/hotels/:id" element={<Hotel/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/flights" element={<ComingSoonPage/>}/>
      <Route path="/carrentals" element={<ComingSoonPage/>}/>
      <Route path="/airporttaxi" element={<ComingSoonPage/>}/>
      <Route path="/payment" element={<Payment/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>

  )
}

export default App
