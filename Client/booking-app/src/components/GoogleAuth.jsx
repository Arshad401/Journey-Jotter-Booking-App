import { useContext } from "react";
import { app } from "../firebase";
import "./googleauth.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const GoogleAuth = () => {
    
    const {  dispatch } = useContext(AuthContext);
    const navigate=useNavigate()
  const handleGoogleClick = async () => {
    
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:9900/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
    if(data.success==="loginsucess"){
      dispatch({ type: "LOGIN_SUCCESS", payload:data });
    
      toast.success("login succesfull")
      navigate('/')
    }else{
  toast.success("registration succesfull")
 navigate('/login') 
    }
    } catch (error) {
    //   dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      console.log("could not sign with google", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleClick} className="googleBtn" type="button">
        Continue With Google
      </button>
    </div>
  );
};

export default GoogleAuth;
