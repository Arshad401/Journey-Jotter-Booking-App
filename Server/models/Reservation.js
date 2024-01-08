import mongoose from 'mongoose';


const ReservationSchema = new mongoose.Schema ({
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
     },
    hotelName:{
        type: String,
        required:true
     },
     roomId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Room'
     },
},{timestamps:true}
);


export default mongoose.model("Reservation", ReservationSchema)