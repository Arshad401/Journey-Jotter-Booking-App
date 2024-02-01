import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import couponpic from "../assets/cpn.png";
import CouponModal from "./CouponModal";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Coupon() {
  const [coupen, setCoupen] = useState([]);

  async function Coupens() {
    const list = await axios.get(
      "http://localhost:9900/api/coupen/getallcoupon"
    );
    // console.log(list.data.coupons)
    setCoupen(list.data.coupons);
  }
  useEffect(() => {
    Coupens();
  }, []);
//   console.log(coupen)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {coupen.map((item) => (
        <div key={item._id}>
          {/* <Box sx={{ maxWidth: 260 }}>
            <Card variant="outlined" style={{boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.2)"}}>
              <React.Fragment>
                <CardContent>
                  <Typography variant="h5" component="div">
                    code:
                    {item.code}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   <b> Discount:</b>
                    {item.discountAmount}
                  </Typography>
                  <Typography variant="body2">
                    Expires in:
                    {moment(item.expirationDate).format("DD/MM/YY")}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box> */}
          <div style={{position: "relative"}}>
            <img
              src={couponpic}
              style={{width: "30rem", height: "15rem"}}
              alt="image"
            />
            <p style={{position: "absolute", top: "20%", left: "41%", transform:" translate(-50%, -50%)",color: "black", fontSize: "1.5rem", fontWeight: "bold"}}>
                Discount amount: {item.discountAmount}/- <br />
                Expiration date: {moment(item.expirationDate).format("DD/MM/YY")} <br />
                Minimum purchase: {item.minimumPurchase}/-
            </p>
            <p style={{position: "absolute", top: "60%", left: "70%", transform:" translate(-50%, -50%)",color: "black", fontSize: "1.5rem", fontWeight: "bold",cursor:"pointer"}}>
                <CouponModal/>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
