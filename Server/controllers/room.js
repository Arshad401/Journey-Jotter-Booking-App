import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Users from "../models/Users.js";
import Reservation from "../models/Reservation.js";


export const createRoom = async (req, res, next) => {
  const hotelId = req.params.id;
  const newRoom = await Room.create(req.body);

  try {
    const savedRoom = await newRoom.save();

    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// export const updateRoom = async (req, res, next) => {
//   try {
//     const updatedRoom = await Room.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedRoom);
//   } catch (err) {
//     next(err);
//   }
// };

export const updateRoomAvailability = async (req, res, next) => {
  const { id: roomId } = req.params;
  const { dates, hotelName,selectedRooms } = req.body;
  try {
    const room = await Room.findOne({ "roomNumbers._id":selectedRooms });
    // console.log(room);
    await Room.updateOne(
      { "roomNumbers._id": selectedRooms },    //roomId changed
      {
        $push: {
        
          "roomNumbers.$.unavailableDates": dates,
        },
      }
    );


    const reservation = await Reservation.create({
      userId: req.user.id,
      hotelName,
      roomId: room._id,
      selectedRooms    //added
    });

    const user = await Users.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          reservedHotels: reservation,
        },
      }
    );

    res.status(200).json({ message: "Room status has been updated." });
  } catch (err) {
    next(err);
  }
};
export const getUserReservations = async (req, res, next) => {
  try {
    const userReservations = await Reservation.find({
      userId: req.user.id,
    }).populate("roomId")
    res.status(200).json({ reservations: userReservations });
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const cancelReservation = async (req, res, next) => {
  const data = req.body;

  try {
    const room = await Room.findById(data.roomId);
    
    const updatedRoomNumbers = room.roomNumbers.map((item) => {
      item.unavailableDates = [];
      return item;
    });

    await Room.findByIdAndUpdate(data.roomId, {
      $set: {
        roomNumbers: updatedRoomNumbers,
      },
    });

   

    const user = await Users.findByIdAndUpdate(data.userId, {
      $pull: {
        reservedHotels: data.reservationId,
      },
    });

    await Reservation.findByIdAndDelete(data.reservationId);

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
