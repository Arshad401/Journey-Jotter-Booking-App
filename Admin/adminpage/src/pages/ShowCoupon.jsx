import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

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

export default function ShowCoupon() {
  const [coupen, setCoupen] = useState([]);
  // const [editing,setEditing] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formdata, setFormdata] = useState({});
  const [select, setSelect] = useState();

  async function Coupens() {
    const list = await axios.get(
      "http://localhost:9900/api/coupen/getallcoupon"
    );
    setCoupen(list.data.coupons);
  }
  useEffect(() => {
    Coupens();
  }, []);

  
  const handleSelect = (couponId) => {
    setSelect(couponId);
    const selectedCoupon = coupen.find((coupon) => coupon._id === couponId);
    setFormdata({
      code: selectedCoupon.code,
      discountAmount: selectedCoupon.discountAmount,
      expirationDate: moment(selectedCoupon.expirationDate).format(
        "YYYY-MM-DD"
      ),
    });
  };

  // console.log(select);
  const updateCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/coupen/editcoupon/${select}`, formdata);
      toast.success("updated succesfully");
      handleClose();
      // location.reload()
      Coupens()
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {coupen.map((item) => (
        <div key={item._id}>
          <Box sx={{ maxWidth: 260 }}>
            <Card
              variant="outlined"
              style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)" }}
            >
              <React.Fragment>
                <CardContent>
                  <Typography variant="h5" component="div">
                    code:
                    {item.code}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <b> Discount:</b>
                    {item.discountAmount}
                  </Typography>
                  <Typography variant="body2">
                    Expires in:
                    {moment(item.expirationDate).format("DD/MM/YY")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    endIcon={<EditIcon />}
                    onClick={() => {
                      handleOpen();
                      handleSelect(item._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </CardActions>
              </React.Fragment>
            </Card>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={updateCoupon}>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Coupon Details
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="edit-container">
                    <label for="">Edit Coupon code</label>
                    <input
                      type="text"
                      value={formdata.code}
                      // defaultValue={item.code}
                      id="code"
                      onChange={handleChange}
                    />
                    <label for="">Edit Discount Price</label>
                    <input
                      type="text"
                      value={formdata.discountAmount}
                      id="discountAmount"
                      onChange={handleChange}
                    />
                    <label for="">Edit Expiration Date</label>
                    <input
                      type="date"
                      value={formdata.expirationDate}
                      id="expirationDate"
                      onChange={handleChange}
                    />
                  </div>

                  <button class="edit-btn" type="submit">
                    Save
                  </button>
                </Typography>
              </Box>
            </form>
          </Modal>
        </div>
      ))}
    </div>
  );
}
