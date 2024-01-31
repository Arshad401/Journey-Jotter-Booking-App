import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'], 
        required: true
    },
    discountAmount: Number,
    minimumPurchase: Number,
    expirationDate: Date,
});

export default mongoose.model("Coupon",CouponSchema)