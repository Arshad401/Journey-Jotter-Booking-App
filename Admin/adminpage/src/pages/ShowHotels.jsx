import { useContext, useEffect, useState } from "react";
import "./showhotels.css";
import axios from "axios";
import CreateRoom from "./CreateRoom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { toast } from "react-toastify";
import PaginationRounded from "./PaginationRounded";
import {useNavigate} from 'react-router-dom'
 
const ShowHotels = () => {
  const [showhotel, setShowHotel] = useState([]);
  const [dlt, setDlt] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  const itemsPerPage = 3; 

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
  }, [dlt]);

  const handleHotelDelete=async(id)=>{
    try {
      await axios.delete(`http://localhost:9900/api/hotels/${id}`, {
        withCredentials: true,
      });
      toast.success("Hotel deleted successfully");
      setDlt(!dlt);
    } catch (error) {
      console.error("Error deleting Hotel:", error);
    }
  }

  const totalPages = Math.ceil(showhotel.length / itemsPerPage);

  const paginateHotels = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return showhotel.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 style={{color:"#003580"}}>Hotels</h1>
      {showhotel.length > 0 && paginateHotels().map((item, index) => (
        <div key={item._id} className="searchItem">
          <img src={item.HotelImageUpload[0]} alt="" className="siImg" onClick={()=>navigate(`/hoteldetails/${item._id}`)}/>
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
            <div className="siDetailTexts">
              <span className="siPrice">{item.price}</span>
              <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={()=>handleHotelDelete(item._id)}>Delete Hotel</Button>
              </Stack>
            </div>
          </div>
        </div>
      ))}
      <PaginationRounded
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default ShowHotels;


