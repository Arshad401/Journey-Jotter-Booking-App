import "./hotelDetails.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../hooks/UseFetch";
import { useLocation} from "react-router-dom";
import CreateRoom from "./CreateRoom";




function Hotel() {
  const location = useLocation()
 const id = location.pathname.split("/")[2];
  

const [slideNumber, setSlideNumber] = useState(0);
const [open, setOpen] = useState(false);
const [openmodel, setOpenModel ] = useState(false)

const { data, loading, error } = useFetch(`/api/hotels/find/${id}`);





  

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


  return (
    <div>
   
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
              </h1>
              <p className="hotelDesc">
               {data.description}
              </p>
              </div>
          </div>
      <CreateRoom hotelId={id}/>
        </div>
       
      </div>}


    </div>
  );
}

export default Hotel;
