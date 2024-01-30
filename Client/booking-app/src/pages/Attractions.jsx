import React from "react";
import useFetch from "../components/hooks/UseFetch";
import "../components/featured.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Attractions() {
  const { data, loading, error } = useFetch(
    "/api/hotels?featured=true&limit=4"
  );

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="featured">
        {loading ? (
          "Loading please wait"
        ) : (
          <>
            {data?.map((item) => (
              <div key={item._id} className="featuredItem">
                <img
                  src={item.HotelImageUpload[0]}
                  alt=""
                  width={250}
                  height={250}
                //   className="featuredimg"
                />
                {/* <div className="featuredTitles">
             <h1>Mumbai</h1>
             <h2>{data[0]} Properties </h2>
         </div> */}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Attractions;
