import React from "react";
import "./salesView.css";

const SalesViewModal = ({ sale, onClose }) => {
  if (!sale) return null;

  // Calculate subtotal
  const subtotal = sale.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Order Details</h3>
<br></br>
        <p><b>Customer:</b> {sale.walkInCustomer || "Walk-in"}</p>
        <p><b>Payment Method:</b> {sale.paymentType.toUpperCase()}</p>
        <p><b>Date:</b> {new Date(sale.createdAt).toLocaleString()}</p>

        <hr />

        <h4>Items:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Product</th>
              <th>SKU</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{item.product.itemName || "Product Name"}</td>
                <td>{item.product.sku || "-"}</td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "right" }}>₹{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <p><b>Subtotal:</b> ₹{subtotal}</p>
        <p><b>Discount:</b> ₹{sale.discount || 0}</p>
        <h3>Grand Total: ₹{sale.total}</h3>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SalesViewModal;
