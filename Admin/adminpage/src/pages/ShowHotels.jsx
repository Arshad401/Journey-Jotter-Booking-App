import { useContext, useEffect, useState } from "react";
import "./showhotels.css";
import axios from "axios";
import CreateRoom from "./CreateRoom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ShowHotels = () => {
  const [showhotel, setShowHotel] = useState([]);
  useEffect(() => {
    const fetchShowHotel = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9900/api/hotels/getfullhotels"
        );
        setShowHotel(res.data.hotels);
      } catch (error) {}
    };
    fetchShowHotel();
  }, []);

  return (
    <div>
      {showhotel.map((item, index) => (
        <div key={index} className="searchItem">
          <img src={item.HotelImageUpload} alt="" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">{item.desc}</span>
            <span className="siFeatures">{item.desc}</span>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price
            </span>
          </div>
          <div className="siDetails">
            {item.rating && (
              <div className="siRating">
                <span>Excellent</span>
                {item.rating}
              </div>
            )}
            <div className="siDetailTexts">
              <span className="siPrice">{item.price}</span>
              <span className="siTaxOp">Includes taxes and fees</span>

              <CreateRoom hotelId={item._id} />
              {/* <button className="siCheckButton">Delete Hotel</button> */}
              <Stack spacing={2} direction="row">
              <Button variant="contained">Delete Hotel</Button>
              </Stack>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ShowHotels;
