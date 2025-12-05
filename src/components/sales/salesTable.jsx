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
  if (!displayData || displayData.length === 0)
    return <p>No sales found.</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Sales</h3>
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
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              {editable && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {displayData.map((sale) => (
              <tr key={sale._id}>
                {/* Order ID */}
                <td>#{sale._id.slice(-6).toUpperCase()}</td>

                {/* Customer */}
                <td>{sale.walkInCustomer || "Unknown"}</td>

                {/* Date */}
                <td>
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>

                {/* Items Count */}
                <td>
                  {sale.items.length} item
                  {sale.items.length > 1 ? "s" : ""}
                </td>

                {/* Amount */}
                <td>₹{sale.total}</td>

                {/* Status = Payment Type */}
                <td>
                  {sale.paymentType
                    ? sale.paymentType.charAt(0).toUpperCase() +
                      sale.paymentType.slice(1)
                    : "-"}
                </td>

                {/* Actions */}
                {editable && (
                  <td>
                    <div className="action-btns">
                      {onView && (
                        <button
                          className="action-btn view"
                          onClick={() => onView(sale)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      )}

                      {onEdit && (
                        <button
                          className="action-btn edit"
                          onClick={() => onEdit(sale)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          className="action-btn delete"
                          onClick={() => onDelete(sale)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      )}
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

export default SalesTable;
