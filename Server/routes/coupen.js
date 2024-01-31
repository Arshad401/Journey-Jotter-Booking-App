import express from "express";
import { applyCouponToProperty, createCoupen, deleteCoupon, editCoupon, getAllCoupons } from "../controllers/coupen.js";



const router = express.Router()

router.post("/addCoupon", createCoupen)
router.get("/getallcoupon",getAllCoupons)
router.put("/editcoupon/:id",editCoupon)
router.delete("/deletecoupon/:id",deleteCoupon)
router.post("/applycoupon",applyCouponToProperty)

export default router