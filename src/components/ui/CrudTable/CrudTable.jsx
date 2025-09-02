import React from "react";
import "./crudTable.css";

const CrudTable = () => {
  const handleSumbit = async (e) => {};
  return (
    <div className="crud-table-wrapper">
      <div className="crud-table-content">
        <div className="crud-table-header">
          <h3>Add New Inventory Item</h3>
          <button className="close-table">&times;</button>
        </div>
        <div className="crud-table-body">
          <form onSubmit={handleSumbit}>
            

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="product-name">Product Name</label>
                <input type="text" class="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="product-sku">SKU</label>
                <input type="text" class="form-control" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="product-category">Category</label>
                <select class="form-control" required>
                  <option value="Null">Select Category</option>
                  <option value="computer">Computers & Accessories</option>
                  <option value="mobile">Mobile & Tablets</option>
                  <option value="home-goods">Home Goods</option>
                  <option value="office-supplies">Office Supplies</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="product-stock">Stock</label>
                <input type="number" class="form-control" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="product-cost">Cost</label>
                <input type="number" class="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="product-price">Price</label>
                <input type="number" class="form-control" required />
              </div>
            </div>
            
          </form>
        </div>
        <div className="crud-table-footer">
          <button class="btn-outline">Cancel</button>
          <button class="btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default CrudTable;
