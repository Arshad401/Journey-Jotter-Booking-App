import express from "express";
import { cancelReservation, createRoom, deleteRoom, getRoom, getRooms, getUserReservations, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();



//CREATE

router.post("/:id/createroom",verifyAdmin, createRoom);

//UPDATE

// router.put("/:id", verifyAdmin, updateRoom );
router.put("/availability/:id", verifyToken, updateRoomAvailability );
router.get("/getreservation", verifyToken, getUserReservations );
router.put("/cancelreservation", verifyToken, cancelReservation );

//DELETE

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom );

//GET

router.get("/:id", getRoom);

//GET ALL

router.get("/", getRooms );



export default router