import React, { useState } from "react";
import Button from "../ui/Button/Button";
import "../ui/CrudTable/crudTable.css";
import Snackbar from "../ui/Snackbar/Snackbar";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

const SalesForm = ({ editMode, closeWindow }) => {

  const [formData, setFormData] = useState( editMode || {
      customer: "",
      item:[
        {
            product:"",
            quantity:1,
            price:0
        }
      ],
      discount:"",
      total:"",
      paymentType:"cash",
    }
  );
  const [loading, setLoading] = useState(false);

const onChange = (e) => {
  const { name, value } = e.target;

  if (name === "product" || name === "quantity" || name === "price") {
    
    setFormData((prev) => ({
      ...prev,
      item: [
        {
          ...prev.item[0],
          [name]: value,
        },
      ],
    }));
  } else {
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const method =editMode ? "PUT" : "POST";
      const url =editMode ? `${process.env.REACT_APP_API_URL}/api/inventory/${editMode._id}` : `${process.env.REACT_APP_API_URL}/api/inventory`
      const response = await fetch(
        url,
        {
        method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error saving item");
        
      }

      const result = await response.json();
       console.log("Success:", result);
      closeWindow();
      setTimeout(()=>{
        window.location.reload()
      },1000);
    } catch (error) {
      console.error("Error:", error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-table-wrapper">
      <div className="crud-table-content">
        <div className="crud-table-header">
          <h3>{editMode ? "Edit Sales" : "Add Sales"}</h3>
          <button className="close-table" onClick={closeWindow}>
            &times;
          </button>
        </div>

        <div className="crud-table-body">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="productName"> Customer Name:</label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  onChange={onChange}
                  value={formData.customer}
                  placeholder="Enter Customer Name"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price"><span style={{ color: "red" }}>*</span> Search Item:</label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  onChange={onChange}
                  value={formData.item[0].product}
                  placeholder="Enter keywords"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={onChange}
                  value={formData.item[0].quantity}
                  placeholder="Enter No. of items"
                  className="form-control"
                />
              </div>

               <div className="form-group">
                <label htmlFor="price"> Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={onChange}
                  value={formData.item[0].price}
            
                  className="form-control"
                readOnly
                />
              </div>
             
             <div className="form-group">
                <label htmlFor="discount"> Discount:</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  onChange={onChange}
                  value={formData.discount}
            
                  className="form-control"
                
                />
              </div>
              
               <div className="form-group">
                <label htmlFor="total"> Total Amount:</label>
                <input
                  type="number"
                  id="total"
                  name="total"
                  onChange={onChange}
                  value={formData.total}
            
                  className="form-control"
                  readOnly
                
                />
              </div>

            </div>

            <div className="crud-table-footer">
              <Button variant="text" onClick={closeWindow}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" isLoading={loading}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default SalesForm;
