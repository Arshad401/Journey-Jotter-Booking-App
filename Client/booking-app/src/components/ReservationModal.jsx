import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReservationModal = () => {
  const [open, setOpen] = useState(false);
  const [reservedHotels, setReservedHotels] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/api/rooms/getreservation");
        setReservedHotels(response.data.reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);
  console.log(reservedHotels);

  const handleCancelReservation = async (reservation) => {
    try {
      const data = {
        roomId: reservation.roomId._id,
        reservationId: reservation._id,
        userId: reservation.userId,
      };
      const response = await axios.put("/api/rooms/cancelreservation", data);
      toast.success("Reservation cancelled");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button style={{ color: "#003580" }} onClick={handleOpen}>
        <h2>View Reservation</h2>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {reservedHotels.map((reservation, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Hotel: {reservation.hotelName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Room Type: {reservation.roomId.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Room Numbers:{" "}
                  {reservation.roomId.roomNumbers
                    .filter((element) => element.unavailableDates.length > 0)
                    .map((element, i) => (
                      <h6 key={i}>{element.number}</h6>
                    ))}
                </Typography>
              </CardContent>
              <Button onClick={() => {handleCancelReservation(reservation);
              handleClose()}}>
                cancelReservation
              </Button>
            </Card>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default ReservationModal;
