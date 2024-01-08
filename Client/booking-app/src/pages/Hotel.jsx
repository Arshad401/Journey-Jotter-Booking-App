import "./hotel.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../components/hooks/UseFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";

function Hotel() {
  const location = useLocation()
 const id = location.pathname.split("/")[2];
  

const [slideNumber, setSlideNumber] = useState(0);
const [open, setOpen] = useState(false);
const [openmodel, setOpenModel ] = useState(false)

const { data, loading, error } = useFetch(`/api/hotels/find/${id}`);
const { user } = useContext(AuthContext)
const navigate = useNavigate()

const { dates, options } = useContext(SearchContext);

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function dayDifference(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}


const days = dayDifference(dates[0].endDate, dates[0].startDate);

  

  const handleOpen = (i)=>{
    setSlideNumber(i);
    setOpen(true);
  }
    const handleMove = (direction) => {
      let  newSlideNumber;

      if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? 5 : slideNumber -1;
       } else {
        newSlideNumber = slideNumber === 5 ? 0 : slideNumber +1;
       }
       setSlideNumber(newSlideNumber)
    
    
  };

    const handleClick = () => {
       if (user) {
        setOpenModel(true)
       }else {
        navigate("/login")
       }
    }
  return (
    <div>
      <Navbar />
      <Header type="list" />
     { loading ?( "loading") :
       <div className="hotelContiner">
      { open && <div className="slider">
        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}  />
        <div className="sliderWrapper">
          <img src={data.HotelImageUpload[slideNumber]} alt="" className="sliderImg" />
        </div>
        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}  />

        </div> }
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">

            <FontAwesomeIcon icon={faLocationDot} />
            <span> {data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent Location{data.distance}mtr from center
          </span>
          <span className="hotelPriceHighlight">
           
            Book stay over ${data.cheapestPrice} at this property and get free airport taxi
          </span>
          <div className="hotelImages">
            {data.HotelImageUpload?.map((photo,i) => (
              <div className="hotelImageWrapper" key={i}>
                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
              {data.title}
              </h1>45l
              <p className="hotelDesc">
               {data.description}
              </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay</h1>
                <span>Couples particularly like the location they rated it 8.5 for a two-person trip while Mattupetty Dam is 32
                km away</span>
                <h2><b> ₹{days * data.cheapestPrice * options.room}</b> ( {days}nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>}

      {openmodel && <Reserve setOpen={setOpenModel} hotelId={id} hotelName={data.name}/>}
    </div>
  );
}

export default Hotel;
