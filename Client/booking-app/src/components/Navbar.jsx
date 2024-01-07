import { Link, Navigate, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";



function Navbar() {
  const navigate = useNavigate()
  const { user ,loading, dispatch} = useContext(AuthContext)

  const handleLogOut = ()=>{
    if(window.confirm("Are you sure to logout?")){
      dispatch({ type: "LOGOUT" })
      navigate('/')
      toast.success("logout successfully")
    }
  }

  

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{color:"inherit",textDecoration:"none"}}>
        <span className="logo">JourneyJotter</span>
        </Link>
     {user ? <div className="navuser">
      {user?.rest?.username|| user.username} 
     <button className="logoutBtn"  disabled={loading} onClick={handleLogOut}>Logout</button>
     <img className="new-avatar" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg" alt="Profile" />
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
