import { Link, Navigate, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";



function Navbar() {
  const navigate =useNavigate()
  const { user ,loading, dispatch} = useContext(AuthContext)

  const handleLogOut = ()=>{
  dispatch({ type: "LOGOUT" })
  navigate('/signup')
  toast.success("logout successfully")
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{color:"inherit",textDecoration:"none"}}>
        <span className="logo">JourneyJotter</span>
        </Link>
     {user ? <div className="navuser">{user.username} 
     
      <button className="logoutBtn"  disabled={loading} onClick={handleLogOut}>Logout</button>
     </div>: (  
        <div className="navItems"> 
        <Link to={"/signup"}> 
            <button className="navButton">Register</button>
            </Link>
         <Link to={"/login"}> 
           <button className="navButton">Login</button>
           </Link>
        </div>
        ) }
      </div>
    </div>
  )
}

export default Navbar
