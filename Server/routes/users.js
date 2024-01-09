import express from "express";
import { deleteUser, editAvatar, getUsers, updateUser } from "../controllers/user.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();



//UPDATE

router.put("/:id", verifyUser, updateUser );

//DELETE

router.delete("/:id", verifyUser, deleteUser );

//GET

// router.get("/:id", getUser);

//GET ALL

router.get("/getalluser", getUsers );


router.put("/:id/editavatar",verifyUser, editAvatar );






export default router