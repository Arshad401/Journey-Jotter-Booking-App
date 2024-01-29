import mongoose from "mongoose";


const paymentSchema= new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
   HotelName: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    },
    history: {
        type:String,
        required:true,
       
    }
})

export default mongoose.model("Payment", paymentSchema);