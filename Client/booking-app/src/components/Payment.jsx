import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { BookingContext } from "../context/BookingContext";
import { SearchContext } from "../context/SearchContext";
import Navbar from "./Navbar";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Payment = () => {
  const navigate = useNavigate();
  const { bookedHotels } = useContext(BookingContext);
  const { dates } = useContext(SearchContext);
  const { user} = useContext(AuthContext)
  console.log(dates);

  console.log(bookedHotels?.hotelDetails, "ha");

  const [reservation, setReservation] = useState();

    const hotelName =bookedHotels?.hotelDetails?.name;
    const totalPrice =bookedHotels?.hotelDetails?.cheapestPrice+450;

  //   const Reserve = async () => {
  //     const res = {
  //       listingId: currentBooking?.listingId?._id,
  //       totalPrice: currentBooking?.totalPrice,
  //       startDate: currentBooking?.startDate,
  //       endDate: currentBooking?.endDate,
  //       email: currentUser.email,
  //     };
  //     await Axios.post("/api/users/reservations", res, {
  //       headers: { Authorization: `Bearer ${cookies.access_token}` },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         navigate('/trips')
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const Razorpay = async (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_LarllNYjBbsQE5",
      key_secret: "uRYhTQETdBPllUGu5FcKBLyF",
      amount: (bookedHotels?.hotelDetails?.cheapestPrice + 450)* 100,
      currency: "INR",
      name: "Journey Jotter",
      description: "Just For The Text Purpose",
      handler: function async(response) {
        console.log(response, "response");
        const { razorpay_payment_id: payment_id } = response;
        console.log(payment_id, "payment ID");
        if (response) {
            const updateStatus = axios.post(
              "/api/payment/rpayment",
              {
                payment_id,
                hotelName,
                user,
                currentBooking:bookedHotels?.hotelDetails,
                totalPrice,
              },
            );
            navigate("/")
            toast.success("payment successfull")

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

  return (
    <div>
      <Navbar/>
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
              Total Amount:{bookedHotels?.hotelDetails?.cheapestPrice + 450}
            </h3>
          </div>

          <button type="button" onClick={Razorpay} className="button-top">
            PAY NOW
          </button>
        </div>

        <div style={{ paddingTop: "3rem" }}>
          <Card style={{objectFit:"cover",width:"40rem"}}>
            <img
              src={bookedHotels?.hotelDetails?.HotelImageUpload[0]}
              alt="card-image"
            />
          </Card>
        </div>
      </div>
      {/* <div style={{marginTop:"1rem"}}>
        <Footer/>
      </div>
      <div>
        <Socialmedia/>
      </div> */}
    </div>
  );
};

export default Payment;
