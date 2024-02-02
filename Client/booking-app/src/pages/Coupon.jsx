import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import moment from "moment";
import couponpic from "../assets/cpn.png";
import CouponModal from "./CouponModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Coupon() {
  const [coupons, setCoupons] = useState([]);

  async function fetchCoupons() {
    try {
      const response = await axios.get(
        "http://localhost:9900/api/coupen/getallcoupon"
      );
      setCoupons(response.data.coupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  console.log(coupons);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "2rem",
      }}>

       {/* <Slider
        {...settings}
     >  */}
        {coupons.map((item) => (
          <div key={item._id}>
            <div style={{ position: "relative" }} >
              <img
                src={couponpic}
                style={{ width: "25rem", height: "13rem" }}
                alt="image"
              />
              <p
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "41%",
                  transform: " translate(-50%, -50%)",
                  color: "black",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Discount amount: {item.discountAmount}/- <br />
                Expiration date:{" "}
                {moment(item.expirationDate).format("DD/MM/YY")} <br />
                Minimum purchase: {item.minimumPurchase}/-
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "70%",
                  transform: " translate(-50%, -50%)",
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <CouponModal code={item.code}/>
              </p>
            </div>
          </div>
        ))}
        
      {/* </Slider> */}
      </div>
  );
}
