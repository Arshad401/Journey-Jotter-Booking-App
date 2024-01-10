import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Hotels from "./pages/Hotels";
import ShowHotels from "./pages/ShowHotels";
import { useContext, } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import "./App.css";
import CreateRoom from "./pages/CreateRoom";
import ShowRooms from "./pages/ShowRooms";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hotel from "./pages/HotelDetails";
import Chart from "./components/Chart";


function App() {
   const ProtectRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };


  return (
    <div>
     <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />

          <Route element={<Home />}>
            <Route path="/users" element={<ProtectRoute><Users /></ProtectRoute>} />
            <Route path="/hotels" element={<ProtectRoute><Hotels /></ProtectRoute>} />
            <Route path="/Showhotels" element={<ProtectRoute><ShowHotels /></ProtectRoute>} />
            <Route path="/createroom" element={<ProtectRoute><CreateRoom /></ProtectRoute>} />
            <Route path="/showrooms" element={<ProtectRoute><ShowRooms/></ProtectRoute>} />
            <Route path="/hoteldetails/:id" element={<ProtectRoute><Hotel/></ProtectRoute>} />
            <Route path="/dash" element={<ProtectRoute><Chart/></ProtectRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
