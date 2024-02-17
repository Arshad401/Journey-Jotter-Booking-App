import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { BookingContext } from "../context/BookingContext";
import { SearchContext } from "../context/SearchContext";
import Navbar from "./Navbar";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ReserveContext } from "../context/ReserveContext";

const Payment = () => {
  const navigate = useNavigate();
  const { bookedHotels } = useContext(BookingContext);
  console.log(bookedHotels);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { selectedRooms, setSelectedRooms } = useContext(ReserveContext);

  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const hotelName = bookedHotels?.hotelDetails?.name;
  

  const [totalPrice, setTotalAmount] = useState(bookedHotels?.hotelDetails?.cheapestPrice + 450);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const reservIt = async () => {
    try {
      console.log("reservit");
      const promises = selectedRooms.map(async (roomId) => {
        const res = await axios.put(`/api/rooms/availability/${roomId}`, {
          dates: alldates,
          hotelName,
          selectedRooms,
        });
        return res.data;
      });
      const results = await Promise.all(promises);
      toast.success("Your room has been reserved successfully.");
      setSelectedRooms([]);
    } catch (error) {
      console.error(error, "error");
    }
  };

  const Razorpay = async (e) => {
    e.preventDefault();
    var options = {
      key: "rzp_test_LarllNYjBbsQE5",
      key_secret: "uRYhTQETdBPllUGu5FcKBLyF",
      amount: (totalPrice) * 100,
      currency: "INR",
      name: "Journey Jotter",
      description: "Just For The Text Purpose",
      handler: function async(response) {
        console.log(response, "response");
        const { razorpay_payment_id: payment_id } = response;
        console.log(payment_id, "payment ID");
        reservIt();
        if (response) {
          const updateStatus = axios.post("/api/payment/rpayment", {
            payment_id,
            hotelName,
            user,
            currentBooking: bookedHotels?.hotelDetails,
            totalPrice,
          });
          toast.success("payment successfull");
          navigate("/");
        }
      },
      prefill: {
        name: "Arshaquu",
        email: "Muhammedarshaque@gmail.com",
        contact: "9561478543",
      },
      notes: {
        address: "Razorpay Coperative Office",
      },
      theme: {
        color: "#FCE22A",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  const applyCoupon = async () => {
    try {
      const response = await axios.post("/api/coupen/applycoupon", {
        propertyId: bookedHotels?.hotelDetails?._id, 
        couponCode: couponCode
      });
  
      if (response.data.success) {
        const discountedPrice = response.data.discountedPrice;
        setTotalAmount(discountedPrice + 450);
        toast.success("Coupon applied successfully");
  
      
        const couponData = JSON.parse(localStorage.getItem("couponData")) || {};
        
     
        const hotelCouponData = couponData[bookedHotels?.hotelDetails?._id] || {};
  
        if (hotelCouponData[couponCode]) {
          toast.warning("Coupon is already applied by the current user");
        } else {
      
          hotelCouponData[couponCode] = discountedPrice;
          couponData[bookedHotels?.hotelDetails?._id] = hotelCouponData;
          
          
          localStorage.setItem("couponData", JSON.stringify(couponData));
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon");
    }
  };
  

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "2px solid black",
            padding: "2rem",
            borderRadius: "2rem",
            marginTop: "2rem",
          }}
        >
          <h4
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {bookedHotels?.hotelDetails?.description}
          </h4>
          {dates.map((date, index) => (
            <div key={index}>
              <h4
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Checkin: {moment(date.startDate).format("DD/MM/YY")}
              </h4>
              <h4
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Checkout: {moment(date.endDate).format("DD/MM/YY")}
              </h4>
            </div>
          ))}

          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "10px",
            }}
          >
            <h4 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Amount Price: {bookedHotels?.hotelDetails?.cheapestPrice}
            </h4>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Insurance Amount: ₹0.00
            </h4>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>TAX:₹450</h4>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Total Amount:{totalPrice}
            </h3>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {showCouponInput ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px",
                  }}
                  onClick={()=>applyCoupon()}
                >
                  Apply Coupon
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCouponInput(true)}
                className="button-top"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "5px",
                }}
              >
                Redeem Coupon
              </button>
            )}
            <button
              type="button"
              onClick={Razorpay}
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "5px",
              }}
            >
              PAY NOW
            </button>
          </div>
        </div>

        <div style={{ paddingTop: "3rem" }}>
          <Card style={{ objectFit: "cover", width: "40rem" }}>
            <img
              src={bookedHotels?.hotelDetails?.HotelImageUpload[0]}
              alt="card-image"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
