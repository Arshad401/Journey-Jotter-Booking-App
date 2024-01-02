import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios"

export default function CreateRoom({hotelId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formdata, setFormData] = React.useState({
    title: "",
    price: "",
    maxPeople: "",
    description: "",
    roomNumbers: {},
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formdata, [id]: value });
  };


  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:9900/api/rooms/creatroom/${hotelId}`,
        formdata
      );
    //   handleClose();
      console.log(res);
    } catch (error) {
      console.log(error);
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
          component="form"
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
          onSubmit={handleSubmit}
        >
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
              value={formdata.title}
            />
            <TextField
              onChange={handleChange}
              id="price"
              label="Price"
              placeholder="price"
              multiline
              value={formdata.price}
            />
            <TextField
              onChange={handleChange}
              id="description"
              label="Description"
              multiline
              rows={4}
              value={formdata.description}
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
              onChange={handleChange}
              id="roomNumbers"
              label="Rooms"
              multiline
              maxRows={4}
              variant="filled"
              value={formdata.roomNumbers}
            />
            <TextField
              onChange={handleChange}
              id="maxPeople"
              label="Max People"
              placeholder="max no of people"
              multiline
              variant="filled"
              value={formdata.maxPeople}
            />
          </div>
          <Button
            variant="contained"
            disableElevation
            style={{ marginTop: "20px", position: "relative", left: "415px" }}
            type="submit"
          >
            Create
          </Button>
          
        </Box>
      </Modal>
    </div>
  );
}
