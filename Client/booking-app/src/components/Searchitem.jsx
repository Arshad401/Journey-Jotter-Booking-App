import { Link } from "react-router-dom";
import "./searchitem.css";

const Searchitem = ({item}) => {
  return (
    <div className="searchItem">
      <img src={item.HotelImageUpload[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle"> Nilgiris offers accommodation with a garden</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle"> you can cancel later, so lock in this great price</span>
      </div>
      <div className="siDetails">
        { item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
            <span className="siPrice"> ₹{item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Searchitem
