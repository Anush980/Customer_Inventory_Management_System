import React, { useState } from "react";
import Button from "../ui/Button/Button";
import "../ui/CrudTable/crudTable.css";


import { categoryOptions } from "../../data/filterConfig/inventoryFilterConfigs";

const InventoryForm = ({ editMode, closeWindow }) => {
  const [formData, setFormData] = useState(
    editMode || {
      itemName: "",
      category: "",
      price: "",
      sku: "",
      stock: "1",
      restock: "5",
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
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
                <label htmlFor="sku">SKU:</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  onChange={onChange}
                  value={formData.sku}
                  placeholder="Enter SKU"
                  className="form-control"
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
    </div>
  );
};

export default InventoryForm;
