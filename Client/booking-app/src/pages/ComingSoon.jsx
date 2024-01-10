
import React, { useEffect } from "react";
import cominsoon from "../assets/Animation - 1704887866581.json";
import { useRef } from "react";
import lottie from "lottie-web";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function ComingSoon() {
  
  const lottieContainer = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current, 
      animationData: cominsoon, 
      loop: true, 
      autoplay: true, 
    });

    animation.setSpeed(0.9); 

   
    return () => {
      animation.destroy();
    };
  }, []);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div style={{ width: "500px", margin: "auto" }}>
        <div className="text-center ">
          <div ref={lottieContainer}></div>
          <h1
            style={{
              color: "#003580",
              fontSize: "3rem",
              textShadow: "inherit",
              marginTop:"-15px"
            }}
          >
            ComingSoon
          </h1>
          <p style={{ color: "green" ,fontSize: "1.2rem",}} >
            Oops! It seems like the page you are looking for future update.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
