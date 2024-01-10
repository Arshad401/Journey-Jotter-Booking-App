import "./featuredProperties.css";
import useFetch from "../components/hooks/UseFetch";
import {useNavigate} from 'react-router-dom'

const FeaturedProperties = () => {
  const navigate = useNavigate()
     
    const {data, loading, error} = useFetch("/api/hotels?featured=true&limit=4");
  return (
    <div className="fp">
        { loading ? ("loading") : <>
       { data?.map(item=>(

        <div className="fpItem" key={item._id} onClick={()=>navigate(`/hotels/${item._id}`)}>
        <img src={item.HotelImageUpload[0]} alt="" className="fpImg" />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from  ₹{item.cheapestPrice}</span>
        { item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
            </div>}
        </div>
        ))}
         </> }
      
        
      
    </div>
    
  )
}

export default FeaturedProperties
