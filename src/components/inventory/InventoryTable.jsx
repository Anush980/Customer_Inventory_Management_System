import React from "react";
import "../ui/table/table.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InventoryTable = ({ data = [], loading = false, editable = false, editMode, onDelete }) => {
  const displayData = data;


  if (loading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No inventory items found.</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Inventory</h3>
        <Link to={`/inventory`} className="viewbtn">
          View All
        </Link>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>SKU</th>
              <th>Stock</th>
              <th>Price</th>
              {editable && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {displayData.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.itemName}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.sku || "-"}</td>
                <td>{item.stock || "0"}</td>
                <td>{item.price}</td>

                {editable && (
                  <td>
                    <div className="action-btns">
                      <button
                        className="action-btn edit"
                        onClick={() => editMode && editMode(item)}
                      >
                        <FontAwesomeIcon icon="pen-to-square" />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDelete && onDelete(item)}
                      >
                        <FontAwesomeIcon icon="trash-can" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
