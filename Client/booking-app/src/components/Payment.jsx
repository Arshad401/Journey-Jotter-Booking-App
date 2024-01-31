import React, { useContext} from "react";
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


  const hotelName = bookedHotels?.hotelDetails?.name;
  const totalPrice = bookedHotels?.hotelDetails?.cheapestPrice + 450;

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

  //..................Reservation confirmation..................................

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

  //..................................Razor-Pay......................................
  const Razorpay = async (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_LarllNYjBbsQE5",
      key_secret: "uRYhTQETdBPllUGu5FcKBLyF",
      amount: (bookedHotels?.hotelDetails?.cheapestPrice + 450) * 100,
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
              Total Amount:{bookedHotels?.hotelDetails?.cheapestPrice + 450}
            </h3>
          </div>

          <button type="button" onClick={Razorpay} className="button-top">
            PAY NOW
          </button>
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
