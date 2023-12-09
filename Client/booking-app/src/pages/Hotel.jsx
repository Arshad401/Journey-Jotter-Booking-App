import "./hotel.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Hotel() {
const [slideNumber, setSlideNumber] = useState(0);
const [open, setOpen] = useState(false);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/240600930.jpg?k=37e701822a97285c20a93d867757b3aed471953cb16d4fde8c2a3c125611c529&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/167360533.jpg?k=3ecd23c7b75c39e77cd98b43c6fbf030ec57c0d0c9c79fa97c9c09a4b21c105a&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/167358452.jpg?k=47a7885254dd96ac3070a7271ccbd53680d781a64709b8be113f510e211e7851&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/167360533.jpg?k=3ecd23c7b75c39e77cd98b43c6fbf030ec57c0d0c9c79fa97c9c09a4b21c105a&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/167358931.jpg?k=6ef1cbf083a6c1c3e7dd141d94182658374a6ec607e7eeaeae4d75ed3faa4107&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/240600930.jpg?k=37e701822a97285c20a93d867757b3aed471953cb16d4fde8c2a3c125611c529&o=&hp=1",
    },
  ];

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
    
    
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContiner">
      { open && <div className="slider">
        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}  />
        <div className="sliderWrapper">
          <img src={photos[slideNumber].src} alt="" className="sliderImg" />
        </div>
        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}  />

        </div> }
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book No</button>
          <h1 className="hotelTitle">Moonnar Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span> Agra st 135 Mumbai</span>
          </div>
          <span className="hotelDistance">
            Excellent Location 500m from center
          </span>
          <span className="hotelPriceHighlight">
           
            Book stay over $115 at this property and get free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo,i) => (
              <div className="hotelImageWrapper">
                <img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
                world-class service at Elephant Passage
              </h1>
              <p className="hotelDesc">
                You're eligible for a Genius discount at Elephant Passage! To
                save at this property, all you have to do is sign in. Set in
                Munnar, 24 km from Munnar Tea Museum, Elephant Passage offers
                accommodation with an outdoor swimming pool, free private
                parking, a garden and a restaurant. This 5-star hotel offers a
                tour desk. The accommodation features a 24-hour front desk,
                airport transfers, room service and free WiFi. Cheeyappara
                Waterfalls is 32 km from the hotel, while Mattupetty Dam is 32
                km away. The nearest airport is Cochin International Airport, 87
                km from Elephant Passage. Couples particularly like the location
                — they rated it 8.7 for a two-person trip.
              </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 8-night stay</h1>
                <span>Couples particularly like the location they rated it 8.5 for a two-person trip while Mattupetty Dam is 32
                km away</span>
                <h2><b>$999</b> ( 8nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Hotel;
