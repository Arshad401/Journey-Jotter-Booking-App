import React, { useState } from 'react';
import "./hotels.css";
import HotelImageUpload from '../components/HotelImageUpload';
import axios from 'axios';


const Hotels = () => {
    const[files,setFiles]=useState([])
  const [formData, setFormData] = useState({
    HotelImageUpload:[],
    type: '',
    address: '',
    title: '',
    cheapestPrice: '',
    city: '',
    distance: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value,  } = e.target;
  
    setFormData({
      ...formData,
      [name]: value
    });
  };
console.log(formData);

  const handleSubmit = async(e) => {
    e.preventDefault();
   try{
     const res=await axios.post("http://localhost:9900/api/hotels/addhotel",formData);
     console.log(res)
     alert("hotel created sucessfully")
   }
   catch(error){
  console.log("error creating hotel",error);
  alert("hotel created sucessfully")
   }
  };

  const handleImageUpload = () => {
   
    const promises = [];
  
   
    for (let i = 0; i < files.length; i++) {
      promises.push(HotelImageUpload(files[i]));
    }
  
    Promise.all(promises)
      .then((urls) => {
        setFormData({
          ...formData,
          HotelImageUpload: (formData.HotelImageUpload || []).concat(urls),
        });
        alert("Images uploaded successfully");
      })
      .catch((err) => {
        console.error("Error uploading images:", err);
      });
  };
  
  
  return (
    <>
      <label>
        Image:
        <input type="file" name="image" onChange={(e)=>{setFiles(e.target.files)}} />
      </label>
      <button onClick={()=>{handleImageUpload()}}>Upload</button>

      <br />
    <form onSubmit={handleSubmit}>

      {/* Type field */}
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Address field */}
      <label>
        Address:
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Title field */}
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Price field */}
      <label>
        Price:
        <input
          type="text"
          name="cheapestPrice"
          value={formData.cheapestPrice}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Name field */}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* City field */}
      <label>
        city:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Distance from city center field */}
      <label>
        Distance from City Center:
        <input
          type="text"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Description field */}
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <br />

      {/* Submit button */}
      <button type="submit">Send</button>
    </form>
    </>
  );
};

export default Hotels;

