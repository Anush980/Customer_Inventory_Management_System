import React, { useState, useEffect } from "react";
import Button from "../ui/Button/Button";
import "../ui/CrudTable/crudTable.css";
import Snackbar from "../ui/Snackbar/Snackbar";

const SalesForm = ({ editMode, closeWindow }) => {
  const [formData, setFormData] = useState(
    editMode || {
      customer: "",
      item: [
        {
          product: "",
          quantity: 1,
          price: 0,
        },
      ],
      discount: 0,
      total: 0,
      paymentType: "cash",
    }
  );
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  // Automatically update total whenever quantity, price, or discount changes
  useEffect(() => {
    const total =
      formData.item[0].price * formData.item[0].quantity -
      Number(formData.discount || 0);
    setFormData((prev) => ({ ...prev, total: total >= 0 ? total : 0 }));
  }, [formData.item[0].price, formData.item[0].quantity, formData.discount]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "product" || name === "quantity" || name === "price") {
      setFormData((prev) => ({
        ...prev,
        item: [
          {
            ...prev.item[0],
            [name]:
              name === "quantity" || name === "price"
                ? Number(value)
                : value,
          },
        ],
      }));
    } else if (name === "discount") {
      setFormData((prev) => ({
        ...prev,
        discount: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { quantity, price } = formData.item[0];
    const { discount } = formData;

    if (!formData.item[0].product) {
      setSnackbar({ message: "Product is required", type: "error" });
      return false;
    }
    if (quantity <= 0) {
      setSnackbar({ message: "Quantity must be at least 1", type: "error" });
      return false;
    }
    if (quantity > 100000) {
      setSnackbar({
        message: "Quantity cannot exceed 100,000",
        type: "error",
      });
      return false;
    }
    if (price < 0) {
      setSnackbar({ message: "Price cannot be negative", type: "error" });
      return false;
    }
    if (discount < 0) {
      setSnackbar({ message: "Discount cannot be negative", type: "error" });
      return false;
    }
    if (discount > price * quantity) {
      setSnackbar({
        message: "Discount cannot be greater than total price",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if validation fails

    try {
      setLoading(true);
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `${process.env.REACT_APP_API_URL}/api/sales/${editMode._id}`
        : `${process.env.REACT_APP_API_URL}/api/sales`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error saving sales");

      const result = await response.json();
      console.log("Success:", result);
      setSnackbar({ message: "Sale saved successfully!", type: "success" });
      closeWindow();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ message: error.message, type: "error" });
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
                <label htmlFor="customer">Customer Name:</label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  onChange={onChange}
                  value={formData.customer}
                  placeholder="Enter Customer Name"
                  required
                  className="form-control"
                  maxLength="30"
                />
              </div>

              <div className="form-group">
                <label htmlFor="product">
                  <span style={{ color: "red" }}>*</span> Search Item:
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  onChange={onChange}
                  value={formData.item[0].product}
                  placeholder="Enter keywords"
                  className="form-control"
                  maxLength="30"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={onChange}
                  value={formData.item[0].quantity}
                  placeholder="Enter No. of items"
                  className="form-control"
                  min="1"
                  max="100000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price:</label>
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
                <label htmlFor="discount">Discount:</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  onChange={onChange}
                  value={formData.discount}
                  className="form-control"
                  min="0"
                  max={formData.item[0].price * formData.item[0].quantity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="total">Total Amount:</label>
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
              <Button variant="text" onClick={closeWindow} disabled={loading}>
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

export default SalesForm;
