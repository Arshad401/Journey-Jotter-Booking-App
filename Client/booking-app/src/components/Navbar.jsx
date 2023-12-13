import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{color:"inherit",textDecoration:"none"}}>
        <span className="logo">JourneyJotter</span>
        </Link>
     {user ? user.username : (  
        <div className="navItems"> 
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
        </div>
        ) }
      </div>
    </div>
  )
}

export default Navbar
