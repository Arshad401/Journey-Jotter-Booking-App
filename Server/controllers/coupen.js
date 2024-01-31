import Coupons from "../models/Coupons.js";
import Hotel from "../models/Hotel.js";

export const createCoupen = async (req, res, next) => {
    try {
      const {
        code,
        discountType,
        discountAmount,
        minimumPurchase,
        expirationDate,
      } = req.body;
  
    const newCoupon = await Coupons.create({
      code,
      discountType,
      discountAmount,
      minimumPurchase,
      expirationDate,
    });

    return res.status(201).json({ success: true, coupon: newCoupon });
  } catch (err) {
    next(err);
  }
};

export const getAllCoupons = async (req, res) => {
  const coupons = await Coupons.find();
  if (!coupons) {
    return res.status(404).json({ messege: "no coupons found" });
  }
  return res.status(200).json({ success: true, coupons });
};

export const editCoupon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCoupon = await Coupons.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCoupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    return res.status(200).json({ success: true, coupon: updatedCoupon });
  } catch (error) {
    next(err);
  }
};

export const deleteCoupon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCoupon = await Coupons.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    next(err);
  }
};

export const applyCouponToProperty = async (req, res, next) => {
  const { propertyId, couponCode } = req.body;
  try {
    const property = await Hotel.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    const coupon = await Coupons.findOne({ code: couponCode });
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    if (coupon.expirationDate < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon has expired" });
    }

    if (property.cheapestPrice < coupon.minimumPurchase) {
      return res
        .status(400)
        .json({ success: false, message: "Minimum purchase amount not met" });
    }

    let discountedPrice = property.cheapestPrice;
    if (coupon.discountType === "percentage") {
      discountedPrice *= 1 - coupon.discountAmount / 100;
    } else if (coupon.discountType === "fixed") {
      discountedPrice -= coupon.discountAmount;
    }

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      discountedPrice,
    });
  } catch (err) {
    next(err);
  }
};
