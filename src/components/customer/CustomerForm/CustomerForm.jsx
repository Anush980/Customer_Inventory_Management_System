import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import "../../ui/CrudTable/crudTable.css";
import Snackbar from "../../ui/Snackbar/Snackbar";

const CustomerForm = ({ editMode, closeWindow }) => {
  const [formData, setFormData] = useState( editMode || {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      creditBalance: "",
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error saving customer");
        
      }

      const result = await response.json();

       console.log("Success:", result);
      closeWindow();
      setTimeout(()=>{
        window.location.reload()
      },2000);
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
          <h3>{editMode ? "Edit Customer" : "Add Customer"}</h3>
          <button className="close-table" onClick={closeWindow}>
            &times;
          </button>
        </div>

        <div className="crud-table-body">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="customerName">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  onChange={onChange}
                  value={formData.customerName}
                  placeholder="Enter Customer Name"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number:</label>
                <input
                  type="number"
                  id="customerPhone"
                  name="customerPhone"
                  onChange={onChange}
                  value={formData.customerPhone}
                  placeholder="Enter Phone Number"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Customer Email:</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  onChange={onChange}
                  value={formData.customerEmail}
                  placeholder="Enter Customer Email"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerAddress">Customer Address:</label>
                <input
                  type="text"
                  id="customerAddress"
                  name="customerAddress"
                  onChange={onChange}
                  value={formData.customerAddress}
                  placeholder="Enter Customer Address"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="creditBalance">Customer Credit Balance:</label>
                <input
                  type="number"
                  id="creditBalance"
                  name="creditBalance"
                  onChange={onChange}
                  value={formData.creditBalance}
                  placeholder="Enter Credit Balance"
                  className="form-control"
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

export default CustomerForm;
