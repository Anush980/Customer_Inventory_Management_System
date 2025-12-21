import React from "react";
import "./salesView.css";

const SalesViewModal = ({ sale, onClose }) => {
  if (!sale) return null;

  const subtotal = sale.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
   <div className="modal-backdrop">
  <div className="modal-card">
    <div id="sale-printable">
      <h3>Order Details</h3>
      <p><b>Customer:</b> {sale.walkInCustomer || "Walk-in"}</p>
      <p><b>Payment Method:</b> {sale.paymentType.toUpperCase()}</p>
      <p><b>Date:</b> {new Date(sale.createdAt).toLocaleString()}</p>

      <hr />

      <table className="print-table">
        <thead>
          <tr className="bill-table">
            <th style={{ textAlign: "left" }}>Product</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sale.items.map((item, index) => (
            <tr key={index}>
              <td>{item.product.itemName}</td>
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
    </div>

    <div className="modal-buttons">
      <button className="close-btn" onClick={onClose}>Close</button>
      <button className="print-btn" onClick={() => window.print()}>Print</button>
    </div>
  </div>
</div>

  );
};

export default SalesViewModal;
