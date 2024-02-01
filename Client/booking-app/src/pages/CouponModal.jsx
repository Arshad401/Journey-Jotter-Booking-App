import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CouponModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [coupen, setCoupen] = useState([]);


  async function Coupens() {
    const list = await axios.get(
      "http://localhost:9900/api/coupen/getallcoupon"
    );
    // console.log(list.data.coupons)
    setCoupen(list.data.coupons);
  }
  useEffect(() => {
    Coupens();
  }, []);
  console.log(coupen)

  return (
    <div>
        <button style={{background:"none",border:"none",fontSize:"1.3rem",fontWeight:"bold",cursor:"pointer"}} onClick={handleOpen}>View More</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Coupon code
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}