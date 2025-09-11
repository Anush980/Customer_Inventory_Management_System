import React, { useState } from "react";

const DummyTable = () => {
  const [data, setData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    creditBalance:""
  });
  const handleChange=(e)=>{
    setData({    ...data,
        [e.target.name]:e.target.value}
    
    )};
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
        const response= await fetch("http://localhost:5000/api/customer",{
method:"POST",
headers:{
    "Content-type":"application/json"
},
body:JSON.stringify(data)
        });
        if(!response){
            throw new Error("Failed to send data");
        }
        const result = await response.json();
        console.log("Success:",result);
        alert("data submitted successfully");
    }
     catch(error){
console.error("Error:",error)
        }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Customer Name:</label>
      <input type="text" name="customerName" value={data.customerName} onChange={handleChange} placeholder="Enter your customer name:" />
      <br></br>
      <label htmlFor="number">Customer Number:</label>
      <input type="number" name="customerPhone" value={data.customerPhone} onChange={handleChange} placeholder="Enter your customer phone number:" />
      <br></br>
      <label htmlFor="email">Customer Email:</label>
      <input type="email" name="customerEmail" value={data.customerEmail} onChange={handleChange} placeholder="Enter your customer Email:" />
      <br></br>
      <label htmlFor="address">Customer Address:</label>
      <input type="text" name="customerAddress" value={data.customerAddress} onChange={handleChange} placeholder="Enter your customer adress:" />
      <br></br>
      <label htmlFor="number">Customer Balance:</label>
      <input type="number" name="creditBalance" value={data.creditBalance} onChange={handleChange} placeholder="Enter your customer balance:" />
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DummyTable;
