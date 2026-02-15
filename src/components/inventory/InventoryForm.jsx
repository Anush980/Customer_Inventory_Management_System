import React, { useState } from "react";
import Button from "../ui/Button/Button";
import "../ui/CrudTable/crudTable.css";
import Snackbar from "../ui/Snackbar/Snackbar";

import { categoryOptions } from "../../data/filterConfig/inventoryFilterConfigs";

const InventoryForm = ({ editMode, closeWindow }) => {
  const [snackbar, setSnackbar] = useState(null);
  const [formData, setFormData] = useState(
    editMode || {
      itemName: "",
      category: "",
      price: "",
      sku: "",
      stock: "1",
      restock: "5",
    },
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
        ? `${process.env.REACT_APP_API_URL}/api/inventory/${editMode._id}`
        : `${process.env.REACT_APP_API_URL}/api/inventory`;

      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      if (image) {
        data.append("image", image);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("Error saving item");
      }

      await response.json();

      closeWindow();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const validateForm = () => {
    const MAX_PRICE = 1000000;
    if (!formData.itemName.trim()) {
      setSnackbar({ message: "Product name is required", type: "error" });
      return false;
    }

    if (!formData.category) {
      setSnackbar({ message: "Category is required", type: "error" });
      return false;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setSnackbar({ message: "Price must be greater than 0", type: "error" });
      return false;
    }
    if (Number(formData.price) > MAX_PRICE) {
      setSnackbar({
        message: `Price cannot exceed ₹${MAX_PRICE}`,
        type: "error",
      });
      return false;
    }

    if (formData.stock && Number(formData.stock) < 0) {
      setSnackbar({ message: "Stock cannot be negative", type: "error" });
      return false;
    }

    if (formData.restock && Number(formData.restock) < 0) {
      setSnackbar({
        message: "Reorder level cannot be negative",
        type: "error",
      });
      return false;
    }

    return true; // all validations passed
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
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="form-column">
              {/* ITEM NAME */}
              <div className="form-group">
                <label htmlFor="itemName">
                  <span style={{ color: "red" }}>*</span> Product Name:
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  onChange={onChange}
                  value={formData.itemName}
                  placeholder="Enter item name"
                  required
                  className="form-control"
                  maxLength="20"
                />
              </div>

              {/* CATEGORY */}
              <div className="form-group">
                <label htmlFor="category">
                  <span style={{ color: "red" }}>*</span> Category:
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={onChange}
                  value={formData.category}
                  className="form-control"
                  required
                >
                  <option value="">Select Category</option>

                  {categoryOptions.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* SKU */}
              <div className="form-group">
                <label htmlFor="sku"><span style={{ color: "red" }}>*</span> SKU:</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  onChange={onChange}
                  value={formData.sku}
                  placeholder="Enter SKU"
                  className="form-control"
                  maxLength="20"
                />
              </div>

              {/* STOCK */}
              <div className="form-group">
                <label htmlFor="stock">Total Stock:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  onChange={onChange}
                  value={formData.stock}
                  placeholder="Enter total stock"
                  className="form-control"
                  max="100000"
                />
              </div>

              {/* RESTOCK LEVEL */}
              <div className="form-group">
                <label htmlFor="restock">Reorder Stock Level:</label>
                <input
                  type="number"
                  id="restock"
                  name="restock"
                  onChange={onChange}
                  value={formData.restock}
                  placeholder="Enter reorder level"
                  className="form-control"
                  max="100000"
                />
              </div>

              {/* PRICE */}
              <div className="form-group">
                <label htmlFor="price">
                  <span style={{ color: "red" }}>*</span> Item Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={onChange}
                  value={formData.price}
                  placeholder="Enter price"
                  className="form-control"
                  min="0.01" // minimum price
                  max="1000000" // maximum price = 10 lakh
                  step="0.01"
                  required
                />
              </div>

              {/* IMAGE */}
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="form-control"
                />
              </div>
            </div>

            {/* FOOTER BUTTONS */}
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

export default InventoryForm;
