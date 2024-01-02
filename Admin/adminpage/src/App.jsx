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
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import "./App.css";

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
            <Route path="/users" element={<Users />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/Showhotels" element={<ShowHotels />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
