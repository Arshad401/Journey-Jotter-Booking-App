import express from "express";
const router = express.Router();
import { verifyUser } from "../utils/verifyToken.js";
import { order } from "../controllers/payment.js";


router.post("/rpayment",verifyUser,order);

export default router