import React from "react";
import "../ui/table/table.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const SalesTable = ({
  data = [],
  loading = false,
  editable = false,
  onView,
  onEdit,
  onDelete,
  showViewAll = false,
}) => {
  const displayData = data;

  if (loading) return <p>Loading sales...</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Recent Sales</h3>
        {showViewAll && (
          <Link to="/sales" className="viewbtn">
            View All
          </Link>
        )}
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              {editable && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
  {displayData.length === 0 ? (
    <tr>
      <td colSpan={editable ? 7 : 6} style={{ textAlign: "center", padding: "1rem" }}>
        No sales found.
      </td>
    </tr>
  ) : (
    displayData.map((sale) => (
      <tr key={sale._id}>
        <td>#{sale._id.slice(-6).toUpperCase()}</td>
        <td>{sale.walkInCustomer || "Unknown"}</td>
        <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
        <td>
          {sale.items.length} item{sale.items.length > 1 ? "s" : ""}
        </td>
        <td>₹{sale.total}</td>
        <td>
          {sale.paymentType
            ? sale.paymentType.charAt(0).toUpperCase() +
              sale.paymentType.slice(1)
            : "-"}
        </td>
        {editable && (
          <td>
            <div className="action-btns">
              {onView && (
                <button className="action-btn view" onClick={() => onView(sale)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              )}
              {onEdit && (
                <button className="action-btn edit" onClick={() => onEdit(sale)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              )}
              {onDelete && (
                <button className="action-btn delete" onClick={() => onDelete(sale)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default SalesTable;
