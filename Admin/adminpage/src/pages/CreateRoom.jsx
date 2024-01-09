
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";
import {toast} from "react-toastify"

export default function CreateRoom({ hotelId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`http://localhost:9900/api/rooms/${hotelId}/createroom`, { ...info,roomNumbers},
      {withCredentials:true}
      );
      toast.success("Room Created SuccessFully")
      handleClose();
      
    } catch (err) {
      toast.error("cant create Rooms")
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Rooms
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ textAlign: "center" }}>Add Rooms</h1>

              <TextField
                onChange={handleChange}
                id="title"
                label="Title"
                multiline
                maxRows={4}
                value={info.title}
              />
              <TextField
                onChange={handleChange}
                id="price"
                label="Price"
                placeholder="price"
                multiline
                value={info.price}
              />
              <TextField
                onChange={handleChange}
                id="description"
                label="Description"
                multiline
                rows={4}
                value={info.description}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                onChange={(e) => setRooms(e.target.value)}
                id="roomNumbers"
                label="RoomNumber"
                multiline
                maxRows={4}
                variant="filled"
                value={info.roomNumbers}
              />
              <TextField
                onChange={handleChange}
                id="maxPeople"
                label="Max People"
                placeholder="max no of people"
                multiline
                variant="filled"
                value={info.maxPeople}
              />
            </div>
            <Button
              variant="contained"
              disableElevation
              style={{ marginTop: "20px", position: "relative", left: "415px" }}
              type="button"
              onClick={handleSubmit} 
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
