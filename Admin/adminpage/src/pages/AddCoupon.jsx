import React, { useState } from 'react';
import axios from "axios";

const CouponForm = () => {
    const [couponData, setCouponData] = useState({
        code: "",
        discountType: "",
        discountAmount: 0,
        minimumPurchase: 0,
        expirationDate: "",
      });

      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCouponData({ ...couponData, [id]: value });
      };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
          "http://localhost:9900/api/coupen/addcoupon",
          couponData
        );
        console.log(response);
       alert("coupon added successfully")
      
      } catch (error) {
     alert(error);
      }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="couponCode">
        Coupon Code:
        <input
          type="text"
          id="code"
          value={couponData.code}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="discountType">
        Discount Type:
        <select
          id="discountType"
          value={couponData.discountType}
          onChange={handleInputChange}
        >
          <option value="">Select Discount Type</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
      </label>
      <label htmlFor="discountAmount">
        Discount Amount:
        <input
          type="number"
          id="discountAmount"
          value={couponData.discountAmount}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="minimumPurchase">
        Minimum Purchase:
        <input
          type="number"
          id="minimumPurchase"
          value={couponData.minimumPurchase}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="expirationDate">
        Expiration Date:
        <input
          type="date"
          id="expirationDate"
          value={couponData.expirationDate}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Coupon</button>
    </form>
  );
};

export default CouponForm;