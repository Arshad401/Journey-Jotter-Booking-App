import express from "express";

import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";



const router = express.Router();

//CREATE

router.post("/addhotel", createHotel);

//UPDATE

router.put("/:id", verifyAdmin, updateHotel );

//DELETE

router.delete("/:id", verifyAdmin, deleteHotel );

//GET

router.get("/find/:id", getHotel);

//GET ALL
router.get("/getfullhotels", getAllHotel );
router.get("/", getHotels );
router.get("/countByCity", countByCity );
router.get("/countByType", countByType );
router.get("/room/:id", getHotelRooms );

export default router;
