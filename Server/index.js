import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import paymentRoute from "./routes/payment.js";
import coupenRoute from "./routes/coupen.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";


const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


//middlewares
app.use (cors({ origin: ['http://localhost:5173','http://localhost:5174'],credentials: true}));
app.use (cookieParser())
app.use(express.json())
app.use(morgan("dev"))

app.use ("/api/auth", authRoute);
app.use ("/api/users", usersRoute);
app.use ("/api/hotels", hotelsRoute);
app.use ("/api/rooms", roomsRoute);
app.use("/api/payment",paymentRoute);
app.use("/api/coupen",coupenRoute);


app.use ((err, req, res, next)=> {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    mesage: errorMessage,
    stack: err.stack,
  });
});


app.listen(9900, () => {
  connect();
  console.log("connected to back end");
});
