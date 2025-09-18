import React, { useEffect, useState } from "react";
import "../ui/table/table.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InventoryTable = ({ limit, editable = false, editMode, onDelete }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayData = limit ? data.slice(0, limit) : data;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/inventory`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((items) => {
        setData(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (data.length === 0) return <p>No inventory items found.</p>;

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
              <th key="">Image</th>
              <th key="">Item Name</th>
              <th key="">Category</th>
              <th key="">SKU</th>
              <th key="">Stock</th>
              <th key="">Price</th>
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
                <td>{item.stock || "1"}</td>
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
