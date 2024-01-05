import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleAuth from "../components/GoogleAuth";



const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const {  loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      toast.success("Login Successfully")
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      toast.error("invalid user",error.response.data )
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
      <h2 className="logHead">Login</h2>
  
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <GoogleAuth />
        <p>Doesn't have an account? <span className="signup-btn" onClick={()=>navigate("/signup")}>Signup</span></p>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
