import payment from "../models/Payment.js";
import Users from "../models/Users.js";


 export const order = async (req, res) => {
    try {
      console.log(req.body);
      const userId = req.body?.user?._id;
      const user = await Users.findById(userId);
    //   console.log(user);
  
      const orderDetails = new payment({
        userId: user._id,
        userName: user.username,
        paymentId: req.body.payment_id,
        HotelName: req.body.hotelName,
        totalAmount: req.body.totalPrice,
        date: new Date(),
        status: 'success',
        history: 'pending',
      });
  
      const orderAdded = await orderDetails.save();
      console.log(orderAdded);
    } catch (error) {
      console.error('Error saving order:', error.message);
    }
  };
  
