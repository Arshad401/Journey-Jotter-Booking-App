import { useState } from "react";
import "./signup.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
const navigate=useNavigate()
  
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9900/api/auth/register",
        formdata
      );
    
      toast.success(`Registration successful: ${res.data}`);
      navigate("/login")
    } catch (error) {
      alert(`Registration failed: ${error.res.data}`);
    }
  };

  return (
    <div className="mainSignUp">
      <div className="signUp">
        <h2 className="signupheader"> SignUp</h2>

        <input
          type="text"
          placeholder="Username..."
          className="SInput"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email..."
          className="SInput"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="SInput"
          id="password"
          onChange={handleChange}
        />
        <button className="Sbutton" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
}

export default SignUp;
