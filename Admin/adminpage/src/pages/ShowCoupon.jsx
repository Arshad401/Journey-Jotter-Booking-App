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
import moment from "moment"

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ShowCoupon() {
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
//   console.log(coupen)
  return (
    <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:"2rem"}}>
      {coupen.map((item) => (
        <div key={item._id} >
          <Box sx={{ maxWidth: 260 }}>
            <Card variant="outlined" style={{boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.2)"}}>
              <React.Fragment>
                <CardContent>
                  {/* <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography> */}
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
                  <Button variant="contained" endIcon={<EditIcon />}>
                    Edit
                  </Button>
                  <Button variant="contained" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </CardActions>
              </React.Fragment>
            </Card>
          </Box>
        </div>
      ))}
    </div>
  );
}
