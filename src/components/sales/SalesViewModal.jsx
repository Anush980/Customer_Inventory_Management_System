import React, { useRef } from "react";
import "./salesView.css";

const SalesViewModal = ({ sale, onClose }) => {
  const printRef = useRef();

  if (!sale) return null;

  const subtotal = sale.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handlePrint = () => {
    // Only print the content inside printRef
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // restore the React app
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card" ref={printRef}>
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
          <button className="print-btn" onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default SalesViewModal;
