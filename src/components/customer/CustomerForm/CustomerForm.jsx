import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import "../../ui/CrudTable/crudTable.css";
import Snackbar from "../../ui/Snackbar/Snackbar";

const CustomerForm = ({ editMode, closeWindow }) => {
  const [snackbar, setSnackbar] = useState(null);
  const [formData, setFormData] = useState( editMode || {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      creditBalance: ""
    }
  );
  const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const onSubmit = async (e) => {
  e.preventDefault();
if (!validateForm()) return;
  try {
    setLoading(true);

    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `${process.env.REACT_APP_API_URL}/api/customers/${editMode._id}`
      : `${process.env.REACT_APP_API_URL}/api/customers`;

    const form = new FormData();

    // append text fields
    form.append("customerName", formData.customerName);
    form.append("customerPhone", formData.customerPhone);
    form.append("customerEmail", formData.customerEmail);
    form.append("customerAddress", formData.customerAddress);
    form.append("creditBalance", formData.creditBalance);

    // append image only if selected
    if (image) {
      form.append("image", image);
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error("Error saving customer");
    }

    const result = await response.json();
    console.log("Success:", result);

    closeWindow();
    setTimeout(() => window.location.reload(), 500);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};

const validateForm = () => {
  // Name
  if (!formData.customerName.trim()) {
    setSnackbar({ message: "Name is required", type: "error" });
    return false;
  }



  // Phone (numbers only, 10 digits)
  const phoneRegex = /^[0-9]{10}$/;
  if (formData.customerPhone && !phoneRegex.test(formData.customerPhone)) {
    setSnackbar({ message: "Phone must be 10 digits", type: "error" });
    return false;
  }

  return true; 
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
                <label htmlFor="customerName"><span style={{ color: "red" }}>*</span>Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  onChange={onChange}
                  value={formData.customerName}
                  placeholder="Enter Customer Name"
                  required
                  className="form-control"
                  maxLength="30"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerPhone"><span style={{ color: "red" }}>*</span>Phone Number:</label>
                <input
                  type="number"
                  id="customerPhone"
                  name="customerPhone"
                  onChange={onChange}
                  value={formData.customerPhone}
                  placeholder="Enter Phone Number"
                  required
                  className="form-control"
                   max="10"
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
                   maxLength="30"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerAddress"><span style={{ color: "red" }}>*</span>Customer Address:</label>
                <input
                  type="text"
                  id="customerAddress"
                  name="customerAddress"
                  onChange={onChange}
                  value={formData.customerAddress}
                  placeholder="Enter Customer Address"
                  className="form-control"
                   maxLength="20"
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
                   max="1000000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Profile Image:</label>
                <input
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  onChange={(e) => setImage(e.target.files[0])}
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

      {snackbar && (
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar(null)}
      />
    )}
    </div>
  );
};

export default CustomerForm;
