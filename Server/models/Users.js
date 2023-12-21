import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema ({
     username:{
        type: String,
        required: true,
        unique: true,
     },
     email:{
        type: String,
        required: true,
        unique: true,
     },
     password:{
        type: String,
        required: true,
     },
     isAdmin:{
        type: Boolean,
        default: false,
     },
     avatar:{
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
     },

},{timestamps:true}
);


export default mongoose.model("User", UserSchema)