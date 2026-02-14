import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import "./pos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryOptions } from "../../data/filterConfig/inventoryFilterConfigs";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import { useInventory } from "../../hooks/useInventory";
import axios from "axios";

const Pos = () => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentType, setPaymentType] = useState("cash");
  const [showModal, setShowModal] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const { items, loading } = useInventory({
    search,
    category: category === "all" ? "" : category,
    sort: "newest",
    stock: "",
  });

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exists = cart.find((x) => x._id === item._id);
    if (exists) {
      if (exists.qty < item.stock) {
        setCart(
          cart.map((x) => (x._id === item._id ? { ...x, qty: x.qty + 1 } : x)),
        );
      } else {
        setSnackbar({
          message: "Cannot add more than available stock!",
          type: "error",
        });
      }

      return;
    }
    if (item.stock > 0) setCart([...cart, { ...item, qty: 1 }]);
    else{
      setSnackbar({ message: "Item out of stock!", type: "error" });
    } 
    
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.qty < item.stock
          ? { ...item, qty: item.qty + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item,
      ),
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal - discount;

  const confirmCheckout = async () => {
    if (cart.length === 0) {
      setSnackbar({ message: "Your cart is empty", type: "error" });
      return;
    }
    try {
      const saleData = {
        items: cart.map((item) => ({ product: item._id, quantity: item.qty })),
        discount: Number(discount),
        paymentType,
        walkInCustomer: customerName || "Walk-in",
      };

      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/api/sales`, saleData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({
        message: "Sales completed successfully!",
        type: "success",
      });

      setCart([]);
      setCustomerName("");
      setDiscount(0);
      setPaymentType("cash");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setSnackbar({ message: "Sales failed...", type: "error" });;
    }
  };

  return (
    <Layout>
      <button
        className="go-to-cart-btn"
        onClick={() => window.scrollTo({ top: 99999, behavior: "smooth" })}
      >
        <FontAwesomeIcon icon="shopping-cart" />
        View Cart ({cart.length})
      </button>

      <div className="pos-wrapper">
        <Pageheader title="Point of Sale" showBtn={false} />

        <div className="pos-container">
          {/* PRODUCT SECTION */}
          <div className="product-section">
            <div className="product-header">
              <h3>Products</h3>
              <div className="pos-search">
                <FontAwesomeIcon icon="search" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="product-tabs">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="product-tab"
                style={{ width: "180px" }}
              >
                <option value="all">All Categories</option>
                {categoryOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="products-container">
              <div className="products-grid">
                {loading && <p>Loading...</p>}
                {!loading && items.length === 0 && (
                  <p className="no-products">No products found.</p>
                )}
                {items.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img
                      src={item.image}
                      className="product-image"
                      alt={item.itemName}
                    />
                    <div className="product-name">{item.itemName}</div>
                    <div className="product-category">{item.category}</div>
                    <div className="product-price">₹{item.price}</div>
                    <div
                      className={
                        item.stock === 0
                          ? "product-stock out"
                          : item.stock < 5
                            ? "product-stock low"
                            : "product-stock"
                      }
                    >
                      {item.stock === 0
                        ? "Out of Stock"
                        : `Stock: ${item.stock}`}
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: "10px", width: "100%" }}
                      onClick={() => addToCart(item)}
                      disabled={item.stock === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CART SECTION */}
          <div className="cart-section">
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              <span>{cart.length} items</span>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-state">
                  <FontAwesomeIcon icon="shopping-cart" />
                  <p>Your cart is empty</p>
                  <p>Add products to get started</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item._id}>
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.itemName}</span>
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQty(item._id)}
                      >
                        –
                      </button>
                      <span className="cart-qty">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => increaseQty(item._id)}
                      >
                        +
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          setCart(cart.filter((x) => x._id !== item._id))
                        }
                      >
                        <FontAwesomeIcon
                          icon="trash-can"
                          className="remove-btn"
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-totals">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {/* <div className="total-line final">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div> */}
              </div>

              <button
                className="btn btn-success checkout-btn"
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon="credit-card" /> Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================
          CHECKOUT MODAL
      ========================== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Checkout</h3>

            <label>Customer Name (optional)</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label>Discount</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
            />

            <label>Payment Method</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="online">Online</option>
            </select>
            <label>Discount: ₹{discount}</label>
            <label>Total: ₹{total.toFixed(2)}</label>

            <div className="modal-buttons">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button className="btn btn-success" onClick={confirmCheckout}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </Layout>
  );
};

export default Pos;
