import "./searchitem.css";

const Searchitem = () => {
  return (
    <div className="searchItem">
      <img src="https://cf.bstatic.com/xdata/images/hotel/square600/482213165.webp?k=65421217654251aaeddb20cbfe3d9a1091867254aca6400e84cdbe4cd74258ca&o=" alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">Olives Pleasant Stays</h1>
        <span className="siDistance"> 4 km from Ooty Lake</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle"> Nilgiris offers accommodation with a garden</span>
        <span className="siFeatures">free private parking and a shared lounge</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle"> you can cancel later, so lock in this great price</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
            <span>Excellent</span>
            <button>8.5</button>
        </div>
        <div className="siDetailTexts">
            <span className="siPrice">$150</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  )
}

export default Searchitem
