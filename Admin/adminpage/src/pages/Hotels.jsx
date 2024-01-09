
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./hotels.css";
import HotelImageUpload from '../components/HotelImageUpload';
import axios from 'axios';
import {toast} from "react-toastify"

const Hotels = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    HotelImageUpload: [],
    type: '',
    address: '',
    title: '',
    cheapestPrice: '',
    city: '',
    distance: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9900/api/hotels/addhotel", formData);
      
      toast.success("hotel created successfully")
    } catch (error) {
     toast.error("cannot create hotel")
    }
  };

  const handleImageUpload = () => {

    if (!files || files.length === 0) {
     toast.error("Please choose at least one image");
      return;
    }
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
        toast.success("Images uploaded successfully")
        
      })
      .catch((err) => {
       
        toast.error("images not uploaded")
      });
     
  };

  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
    >
      <label>
      <h1 style={{color:"#003580"}}>Create a Hotel</h1>
        Image:
        <input type="file" name="image" onChange={(e) => { setFiles(e.target.files) }} />
      </label>
  
     < button onClick={() => { handleImageUpload() }}>Upload</button>

      <br />

      <form onSubmit={handleSubmit}>

        <TextField
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          multiline
          fullWidth
        />

        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Price"
          name="cheapestPrice"
          value={formData.cheapestPrice}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Distance from City Center"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          fullWidth
        />

        <button type="submit" style={{ margin: "15px"}}>Create Hotel</button>
      </form>
    </Box>
  );
};

export default Hotels;
