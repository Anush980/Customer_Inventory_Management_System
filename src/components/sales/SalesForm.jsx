import React, { useState } from "react";
import Button from "../ui/Button/Button";
import "../ui/CrudTable/crudTable.css";
import Snackbar from "../ui/Snackbar/Snackbar";

const SalesForm = ({ editMode, closeWindow }) => {
  const [formData, setFormData] = useState( editMode || {
      customer: "",
      item: "",
      price: "",
      sku: "",
      stock: "1",
      restock:"5",
    }
  );
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <h3>{editMode ? "Edit Item" : "Add Item"}</h3>
          <button className="close-table" onClick={closeWindow}>
            &times;
          </button>
        </div>

        <div className="crud-table-body">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="productName"><span style={{ color: "red" }}>*</span> Product Name:</label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  onChange={onChange}
                  value={formData.itemName}
                  placeholder="Enter item Name"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
               
                <label htmlFor="category"><span style={{ color: "red" }}>*</span> Category: </label>
                <select id="category" name="category" onChange={onChange} value={formData.category} className="form-control" required>
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="home-goods">Home Goods</option>
                    <option value="kitchen-appliances">kitchen appliances</option>
                    <option value="others">others</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sku">SKU</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  onChange={onChange}
                  value={formData.sku}
                  placeholder="Enter Model name or SKU"
                  className="form-control"
                />
              </div>

             

              <div className="form-group">
                <label htmlFor="stock">Total Stock:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  onChange={onChange}
                  value={formData.stock }
                  placeholder="Enter Total stock"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="restock">Reorder stock level:</label>
                <input
                  type="number"
                  id="restock"
                  name="restock"
                  onChange={onChange}
                  value={formData.restock}
                  placeholder="Enter Reorder stock level"
                  className="form-control"
                />
              </div>
               <div className="form-group">
                <label htmlFor="price"><span style={{ color: "red" }}>*</span> Item Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={onChange}
                  value={formData.price}
                  placeholder="Enter price"
                  className="form-control"
                  required
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
