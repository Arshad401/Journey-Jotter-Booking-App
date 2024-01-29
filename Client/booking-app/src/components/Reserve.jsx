import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import {
  faCircleXmark,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../components/hooks/UseFetch.js";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BookingContext } from "../context/BookingContext.jsx";

const Reserve = ({ setOpen, hotelId, hotelName, hotelDetails }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:9900/api/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);
  const { dispatch } = useContext(BookingContext);

  console.log(hotelDetails, "hai");
  // const currentHotel = hotelDetails;
  // console.log(currentHotel);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date)?.getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();
  // console.log(selectedRooms);

  const handleClick = async () => {
    try {
      const promises = selectedRooms.map(async (roomId) => {
        const res = await axios.put(`/api/rooms/availability/${roomId}`, {
          dates: alldates,
          hotelName,
          selectedRooms,
        });
        return res.data;
      });

      const results = await Promise.all(promises);

      setOpen(false);
      navigate("/payment");
      toast.success(
        "Your room has been reserved successfully. Please complete the payment to confirm the booking."
      );

      dispatch({ type: "BOOKING_SUCCESS", payload:{hotelDetails} });
    } catch (error) {
      console.error(error, "error");
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={() => handleClick()} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
